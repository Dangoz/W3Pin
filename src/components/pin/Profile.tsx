import React from 'react'
import useCard from '@/hooks/useCard'
import { Card } from '@/types/card'

const attributes = ['Assets', 'Social']

const Profile: React.FC = () => {
  const { cardStore } = useCard()

  return (
    <>
      {cardStore && (
        <div className="flex justify-center items-center w-full h-full gap-10 mt-5">
          {attributes.map((attribute) => (
            <div key={attribute} className="flex flex-col justify-center items-center gap-1">
              <div className="flex justify-center items-center gradientBG rounded-md p-[0.0625rem]">
                <div className="bg-[#161A42] rounded-md py-2 px-5 font-tomorrow">
                  {cardStore[attribute.toLowerCase() as keyof Card]}
                </div>
              </div>
              <div className="font-tomorrow">{attribute}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Profile
