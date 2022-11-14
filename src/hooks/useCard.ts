import { useContext } from 'react'
import { cardContext } from '@/store/cardContext'
import type { CardContext as CardContextType } from '@/types/card'

const useCard = (): CardContextType => {
  const context = useContext(cardContext)
  if (context === undefined) {
    throw new Error('useTarget must be used within userContextProvider')
  }
  return context
}

export default useCard
