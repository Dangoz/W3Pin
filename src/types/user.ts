export type User = {}

export type UserContext = {
  userStore: User
  setUserStore: (user: Partial<User>) => void
}
