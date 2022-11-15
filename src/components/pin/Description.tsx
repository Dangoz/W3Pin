import React from 'react'
import useCard from '@/hooks/useCard'

const Description: React.FC = () => {
  const { cardStore } = useCard()
  return (
    <>
      {cardStore && (
        <div>
          <div className="flex justify-start items-center gap-2 mt-5 mb-1 ml-5 font-bold text-lg font-tomorrow">
            Description
          </div>
          <div className="px-5 mt-2">{cardStore.description}</div>
        </div>
      )}
    </>
  )
}

export default Description
