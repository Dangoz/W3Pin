import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

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
    res.status(200).json({ image_url, message: 'image generated' })
  } catch (error) {
    const message = (error as any)?.response?.data.error.message
    console.error(message)
    res.status(500).json({ error: message })
  }
}
