import React from 'react'
import useCard from '@/hooks/useCard'
import Image from 'next/image'

const Achievements = () => {
  const { cardStore } = useCard()

  return (
    <>
      {cardStore && (
        <div>
          <div className="flex justify-start items-center gap-2 mt-5 mb-1 ml-5 font-bold text-lg font-tomorrow">
            Achievements
          </div>
          <div className="px-5 grid grid-cols-3 gap-3">
            {cardStore.achievements.map((achievement) => (
              <div key={achievement} className="w-28 h-28 relative">
                <Image src={`/${achievement}.svg`} alt={achievement} fill sizes="100%" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Achievements
