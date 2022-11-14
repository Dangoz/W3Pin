import React, { createContext, useEffect, useState } from 'react'
import type { Card, CardContext } from '@/types/card'

const cardInitialStates: CardContext = {
  cardStore: null,
  setCardStore: () => {},
}

export const cardContext = createContext<CardContext>(cardInitialStates)

export const CardContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cardStore, setCardStore] = useState<Card | null>(null)

  useEffect(() => {
    console.log('cardStore has been updated:', cardStore)
  }, [cardStore])

  return (
    <cardContext.Provider
      value={{
        cardStore,
        setCardStore,
      }}
    >
      {children}
    </cardContext.Provider>
  )
}
