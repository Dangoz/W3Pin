import type { Identities } from './rss3'

export type User = {
  avatar: string
} & Identities

export type UserContext = {
  userStore: User
  setUserStore: (user: Partial<User>) => void
}
