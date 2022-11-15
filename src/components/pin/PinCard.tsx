import React from 'react'
import useCard from '@/hooks/useCard'
import Banner from './Banner'
import Profile from './Profile'
import Achievements from './Achievements'
import Description from './Description'
import Stats from './Stats'
import clsx from 'clsx'

interface PinCardProps {}

const PinCard = React.forwardRef<HTMLDivElement, PinCardProps>(function PinCard(props, ref) {
  const { cardStore } = useCard()

  return (
    <div ref={ref} className=" w-[24.125rem] min-h-[50rem] gradientBG flex justify-center items-center rounded-md">
      <div
        className={clsx(
          'w-[24rem] min-h-[50rem] bg-bgBlue/75 rounded-md pb-10 backdrop-blur-md my-0.5 shadow-lg shadow-cyan-300/25',
          'flex flex-col',
          'cardBG',
        )}
      >
        <Banner />
        <Profile />
        <Stats />
        <Achievements />
        <Description />
      </div>
    </div>
  )
})

export default PinCard
