import React, { createContext, useState } from 'react'
import type { Card, CardContext } from '@/types/card'

const cardInitialStates: CardContext = {
  cardStore: null,
  setCardStore: () => {},
}

export const cardContext = createContext<CardContext>(cardInitialStates)

export const CardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardStore, setCardStore] = useState<Card | null>(null)

  return (
    <cardContext.Provider
      value={{
        cardStore,
        setCardStore: (stateChange: Partial<Card>) => {
          if (cardStore === null) {
            return stateChange
          }
          return { ...cardStore, ...stateChange }
        },
      }}
    >
      {children}
    </cardContext.Provider>
  )
}
