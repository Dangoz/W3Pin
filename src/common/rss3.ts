import axios from 'axios'
import { RSS3_API_URL } from './endpoints'
import type { Identities, Tags, Profile } from '@/types/rss3'

const rss3API = axios.create({
  baseURL: RSS3_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const rss3 = {
  async getIdentities(addressOrHandle: string): Promise<Identities> {
    const response = await rss3API.get(`/ns/${addressOrHandle}`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data as Identities
  },

  async getNotesCount(addressOrHandle: string, tag: Tags[] = [], type: string[] = []): Promise<number> {
    const response = await rss3API.post('notes', {
      address: [addressOrHandle],
      tag,
      type,
      count_only: true,
    })
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.total
  },

  async getProfiles(addressOrHandle: string): Promise<Profile[]> {
    const response = await rss3API.get(`/profiles/${addressOrHandle}`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.result as Profile[]
  },

  async getAssetsCount(addressOrHandle: string): Promise<number> {
    const response = await rss3API.get(`/assets/${addressOrHandle}?timestamp=2022-00-00T00:00:00Z`)
    if (response.data.error) {
      throw new Error(response.data.error)
    }
    return response.data.total
  },
}

export default rss3
