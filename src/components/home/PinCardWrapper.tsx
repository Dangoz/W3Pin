import useUser from '@/hooks/useUser'
import useCard from '@/hooks/useCard'
import React, { useState, useRef } from 'react'
import PinCard from '../pin/PinCard'
import OptionBarWrapper from '../option/OptionBarWrapper'

const PinCardWrapper: React.FC = () => {
  const { userStore } = useUser()
  const { cardStore } = useCard()

  const [editMode, setEditMode] = useState<boolean>(false)
  const pinRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col mt-16 mb-10 gap-3">
        <PinCard ref={pinRef} />
        <OptionBarWrapper
          editMode={editMode}
          toggleEditMode={() => setEditMode((prevState) => !prevState)}
          pinRef={pinRef}
        />
      </div>
    </>
  )
}

export default PinCardWrapper
