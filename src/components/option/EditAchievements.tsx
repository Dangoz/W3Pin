import React, { useState } from 'react'
import Modal from '../ui/Modal'
import useCard from '@/hooks/useCard'
import Button from '../ui/Button'

interface EditDescriptionProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const EditAchievements: React.FC<EditDescriptionProps> = ({ open, setOpen }) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close>
        achievements
      </Modal>
    </>
  )
}

export default EditAchievements
