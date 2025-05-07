import { useState, useEffect } from 'react';

type WindowDimensions = {
  width: number;
  height: number;
};

export function useWindowDimensions(): WindowDimensions {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions(): WindowDimensions {
    return {
      width: hasWindow ? window.innerWidth : 0,
      height: hasWindow ? window.innerHeight : 0,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions);

  useEffect(() => {
    if (!hasWindow) return;

    let animationFrameId: number;

    function handleResize() {
      // Usa requestAnimationFrame para evitar múltiplos updates no mesmo frame
      animationFrameId = window.requestAnimationFrame(() => {
        setWindowDimensions(getWindowDimensions());
      });
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [hasWindow]);

  return windowDimensions;
}
