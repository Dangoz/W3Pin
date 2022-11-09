import React, { createContext, useState } from 'react'
import type { Target, TargetContext } from '@/types/target'

const targetInitialStates: TargetContext = {
  targetStore: null,
  setTargetStore: () => {},
}

export const targetContext = createContext<TargetContext>(targetInitialStates)

export const TargetContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [targetStore, setTargetStore] = useState<Target | null>(targetInitialStates.targetStore)

  return (
    <targetContext.Provider
      value={{
        targetStore,
        setTargetStore,
      }}
    >
      {children}
    </targetContext.Provider>
  )
}
