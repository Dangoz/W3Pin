export enum Tags {
  Transaction = 'transaction',
  Exchange = 'exchange',
  Collectible = 'collectible',
  Social = 'social',
  Donation = 'donation',
  Governance = 'governance',
}

export type Identities = {
  address: string
  ens?: string
  crossbell?: string
  lens?: string
  spaceid?: string
  unstoppable?: string
  bit?: string
}

export type Profile = {
  address: string
  network: string
  platform: string
  source: string
  name: string
  handle: string
  bio: string
  expire_at?: Date
  profile_uri?: string[]
  social_uri?: string[]
}
