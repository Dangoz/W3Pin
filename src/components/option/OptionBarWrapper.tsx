import React, { useState } from 'react'
import OptionBar from './OptionBar'
import EditBar from './EditBar'

interface OptionBarWrapperProps {
  editMode: boolean
  toggleEditMode: () => void
  pinRef: React.RefObject<HTMLDivElement>
}

const OptionBarWrapper: React.FC<OptionBarWrapperProps> = ({ editMode, toggleEditMode, pinRef }) => {
  return (
    <>
      {!editMode ? (
        <OptionBar pinRef={pinRef} toggleEditMode={toggleEditMode} />
      ) : (
        <EditBar toggleEditMode={toggleEditMode} />
      )}
    </>
  )
}

export default OptionBarWrapper
