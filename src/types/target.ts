import type { Identities } from './rss3'

export type Target = {} & Identities

export type TargetContext = {
  targetStore: Target | null
  setTargetStore: (target: Partial<Target>) => void
}
