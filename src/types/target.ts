import type { Identities } from './rss3'

export type Target = {
  avatar: string
  transaction: number
  exchange: number
  collectible: number
  social: number
  donation: number
  governance: number
  assets: number
  poap?: number
} & Identities

export type TargetContext = {
  targetStore: Target | null
  setTargetStore: (target: Target) => void
}
