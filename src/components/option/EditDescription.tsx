import React, { useState } from 'react'
import Modal from '../ui/Modal'
import useCard from '@/hooks/useCard'
import Button from '../ui/Button'

interface EditDescriptionProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const EditDescription: React.FC<EditDescriptionProps> = ({ open, setOpen }) => {
  const { cardStore, setCardStore } = useCard()
  const [description, setDescription] = useState<string>(cardStore?.description || '')

  return (
    <>
      <Modal open={open} setOpen={setOpen} blur="sm" close>
        <div className="w-80 h-60 bg-bgBlue/75 backdrop-blur-sm flex flex-col p-2 gap-2">
          <div className="font-tomorrow font-bold text-lg">Description</div>

          <textarea
            className="w-full h-full bg-bgBlue/75 rounded-md p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (cardStore) {
                  setCardStore({ ...cardStore, description })
                }
                setOpen(false)
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EditDescription
