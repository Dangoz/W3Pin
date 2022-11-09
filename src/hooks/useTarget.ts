import { useContext } from 'react'
import { targetContext } from '@/store/targetContext'
import type { TargetContext as TargetContextType } from '@/types/target'

const useTarget = (): TargetContextType => {
  const context = useContext(targetContext)
  if (context === undefined) {
    throw new Error('useTarget must be used within userContextProvider')
  }
  return context
}

export default useTarget
