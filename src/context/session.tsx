// app/contexts/SessionContext.tsx
'use client'

// import { api } from '@services/api'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

// type Session = {
//   id: string
//   isGuest: boolean
// }

type SessionContextType = {
  // session: Session | null
  loading: boolean
}

const SessionContext = createContext<SessionContextType>({
  // session: null,
  loading: true,
})

const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('are you going through the session?');
    setLoading(false);
    // (async () => {
    //   const verify = await api.session.create();
    //   console.log(verify);
    // })
  }, []);

  return (
    <SessionContext.Provider value={{ loading }}>
      {children}
    </SessionContext.Provider>
  )
};

export const useSession = () => useContext(SessionContext);
export default SessionProvider;