import React, { createContext, useContext } from 'react'
import type { User, UserContext } from '@/types/user'

const userInitialStates: UserContext = {
  userStore: {
    address: '',
    avatar: '/logo.svg',
  },
  setUserStore: () => {},
}

export const userContext = createContext<UserContext>(userInitialStates)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userStore, setUserStore] = React.useState<User>(userInitialStates.userStore)

  return (
    <userContext.Provider
      value={{
        userStore,
        setUserStore: (stateChange: Partial<User>) => {
          setUserStore((prevState) => ({ ...prevState, ...stateChange }))
        },
      }}
    >
      {children}
    </userContext.Provider>
  )
}
