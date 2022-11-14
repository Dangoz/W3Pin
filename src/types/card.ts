import type { Identities } from './rss3'

export type Stats = {
  transaction: number
  exchange: number
  collectible: number
  social: number
  donation: number
  governance: number
  assets: number
  poap: number
}

export type Card = {
  avatar: string
  banner: string
  description: string
  achievements: string[]
} & Identities &
  Stats

export type CardContext = {
  cardStore: Card | null
  setCardStore: (card: Card) => void
}
