'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { api } from '@services/api';

type SessionContextType = {
  loading: boolean
}

const SessionContext = createContext<SessionContextType>({
  loading: true
})

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const verify = await api.session.create();
      if (verify.success) {
        setLoading(false);
      };
    };

    init();
  }, []);

  return (
    <SessionContext.Provider value={{ loading }}>
      {children}
    </SessionContext.Provider>
  )
};

export const useSession = () => useContext(SessionContext);
export default SessionProvider;