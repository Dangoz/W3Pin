import React from 'react'
import Modal from '../ui/Modal'
import useCard from '@/hooks/useCard'

interface EditBannerImageProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const EditBannerImage: React.FC<EditBannerImageProps> = ({ open, setOpen }) => {
  const { cardStore, setCardStore } = useCard()

  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close>
        <div>description</div>
      </Modal>
    </>
  )
}

export default EditBannerImage
