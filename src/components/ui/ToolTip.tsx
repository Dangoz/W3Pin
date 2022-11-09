import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface ToolTipProps {
  children: React.ReactNode
  message: string
  delayDuration?: number
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const ToolTip: React.FC<ToolTipProps> = ({ children, message = 'Tooltip', delayDuration = 300, side = 'top' }) => {
  return (
    <Tooltip.Provider delayDuration={delayDuration}>
      <Tooltip.Root>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side={side} className="bg-white text-black rounded-md px-1.5">
            {message}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default ToolTip
