import axios from 'axios'
import { RSS3_API_URL } from './endpoints'

const rss3API = axios.create({
  baseURL: RSS3_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const rss3 = {}

export default rss3
