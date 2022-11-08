export type Identities = {
  address: string
  ens?: string
  crossbell?: string
  lens?: string
  spaceid?: string
  unstoppable?: string
  bit?: string
}

export enum Tags {
  Transaction = 'transaction',
  Exchange = 'exchange',
  Collectible = 'collectible',
  Social = 'social',
  Donation = 'donation',
  Governance = 'governance',
}
