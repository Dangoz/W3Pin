import React, { useEffect } from 'react'
import { useConnectModal, ConnectButton } from '@rainbow-me/rainbowkit'
import useAddress from '@/hooks/useAddress'
import useUser from '@/hooks/useUser'
import Button from '../ui/Button'
import rss3 from '@/common/rss3'
import { handleError } from '@/common/notification'
import { parseProfiles } from '@/common/utils'
import ToolTip from '../ui/ToolTip'

const Connection = () => {
  const { address, isConnected } = useAddress()
  const { userStore, setUserStore } = useUser()
  const { openConnectModal } = useConnectModal()

  useEffect(() => {
    const syncUserProfiles = async () => {
      try {
        const profiles = await rss3.getProfiles(address)
        const result = parseProfiles(profiles)
        setUserStore(result)
      } catch (error) {
        handleError(error)
      }
    }

    if (address && userStore.address === '') {
      syncUserProfiles()
    }
  }, [address, setUserStore, userStore])

  return (
    <div className="flex justify-center items-center gap-1">
      {isConnected ? (
        <div className="flex justify-center items-center gap-1 h-full w-fit p-2">
          <ToolTip message={userStore.crossbell || userStore.ens || userStore.lens || address}>
            <div className="w-9 h-9 rounded-full gradientBG flex justify-center items-center primaryShadow cursor-pointer">
              <img alt="avatar" src={userStore.avatar} className="object-cover rounded-full w-8 h-8" />
            </div>
          </ToolTip>
        </div>
      ) : (
        <div className="h-9 w-[5.25rem] flex justify-center items-center gradientBG rounded-sm">
          <Button onClick={openConnectModal} size="sm" variant="ghost" className="h-8 w-20 bg-black hover:bg-black/80">
            Connect
          </Button>
        </div>
      )}
    </div>
  )
}

export default Connection
