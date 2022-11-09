import axios from 'axios'

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://w3pin.vercel.app' : 'http://localhost:3000'

const api = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
