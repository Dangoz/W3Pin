import '@/styles/globals.css'
import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'experimental-edge',
}

export default function handler() {
  return new ImageResponse(
    (
      <div
        className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4 text-center rounded-lg shadow bg-purple-300"
        style={{
          fontSize: 128,
          background: 'red',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Hello world!...
      </div>
    ),
    {
      width: 500,
      height: 900,
    },
  )
}
