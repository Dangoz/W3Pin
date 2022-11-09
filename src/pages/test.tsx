import type { NextPage } from 'next'
import { useRef, useState } from 'react'
import * as htmlToImage from 'html-to-image'

const Test: NextPage = () => {
  const helloRef = useRef<HTMLDivElement>(null)
  const [helloImage, setHelloImage] = useState<string>('')

  // convert helloRef to a image
  const convert = () => {
    if (!helloRef.current) return
    htmlToImage.toPng(helloRef.current).then((dataUrl) => {
      setHelloImage(dataUrl)
    })
  }

  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="w-16 h-16 border border-purple-300 font-bold text-red-500 bg-black text-center" ref={helloRef}>
        HELLO
      </div>

      <button onClick={convert}>Convert</button>

      <img src={helloImage} alt={'hello image'} className="w-16 h-16" />
    </div>
  )
}

export default Test
