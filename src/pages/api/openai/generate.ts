import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { prompt } = req.body
    console.log('PROMPT', prompt)

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    })
    const image_url = response.data.data[0].url
    console.log('image_url', image_url)

    // fetch image and generate data url (server side)
    const imageResponse = await fetch(image_url || '')
    const imageBlob = await imageResponse.blob()
    const imageBuffer = await imageBlob.arrayBuffer()
    const data_url = `data:${imageBlob.type};base64,${Buffer.from(imageBuffer).toString('base64')}`
    console.log('imageDataUrl', data_url)
    return res.status(200).json({ data_url, message: 'image generated' })
  } catch (error) {
    const message = (error as any)?.response?.data.error.message
    console.error(message)
    console.error((error as Error).message)
    res.status(500).json({ error: message })
  }
}
