import React from 'react'
import useCard from '@/hooks/useCard'
import { Card } from '@/types/card'

const stats = ['POAP', 'Transaction', 'Exchange', 'Collectible', 'Donation', 'Governance']

const Stats: React.FC = () => {
  const { cardStore } = useCard()

  return (
    <>
      {cardStore && (
        <div>
          <div className="flex justify-start items-center gap-2 mt-3 mb-1 ml-5 font-bold text-lg font-tomorrow">
            Stats
          </div>
          <div className="grid grid-cols-2 gap-3 px-5">
            {stats.map((stat) => (
              <div key={stat} className="">
                <div className="gap-2 py-2 px-3 flex justify-center items-center statsBG rounded-md">
                  <div className="text-sm">{stat}</div>
                  <div className="font-bold">{cardStore[stat.toLowerCase() as keyof Card]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Stats
