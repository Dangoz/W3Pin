import axios from 'axios'
import { RSS3_API_URL } from './endpoints'
import { Identities, Tags } from '@/types/rss3'

const rss3API = axios.create({
  baseURL: RSS3_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const rss3 = {
  // get identities
  async getIdentities(addressOrHandle: string): Promise<Identities> {
    const response = await rss3API.get(`/identities/${addressOrHandle}`)
    return response.data as Identities
  },

  // get notes count
  async getNotesCount(addressOrHandle: string, tags: Tags[] = [], types: string[] = []): Promise<number> {
    const response = await rss3API.post('notes', {
      address: [addressOrHandle],
      tags,
      types,
      count_only: true,
    })
    return response.data.total
  },
}

export default rss3
