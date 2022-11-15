import React from 'react'
import useCard from '@/hooks/useCard'

const Achievements = () => {
  const { cardStore } = useCard()

  return (
    <>
      {cardStore && (
        <div>
          <div className="flex justify-start items-center gap-2 mt-5 mb-1 ml-5 font-bold text-lg font-tomorrow">
            Achievements
          </div>
        </div>
      )}
    </>
  )
}

export default Achievements
