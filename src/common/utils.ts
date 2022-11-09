import { IPFS_GATEWAY } from './endpoints'
import type { Profile, Identities } from '@/types/rss3'

// check for ipfs and return source url
export const parseIpfs = (str: string): string => {
  if (str.startsWith('ipfs://')) {
    return `${IPFS_GATEWAY}/${str.replace('ipfs://', '')}`
  }
  if (str.startsWith('ipfs:')) {
    return `${IPFS_GATEWAY}/${str}`
  }
  return str
}

export const parseAddress = (address: string): string => {
  return address.slice(0, 4) + '...' + address.slice(-4)
}

export const parseProfiles = (profiles: Profile[]): Identities & { avatar?: string } => {
  const result: Identities & { avatar?: string } = { address: profiles[0].address }
  profiles.forEach((profile) => {
    switch (profile.platform) {
      case 'Crossbell':
        result.crossbell = `${profile.handle}.csb`
        profile.profile_uri?.length && profile.profile_uri[0] && (result.avatar = parseIpfs(profile.profile_uri[0]))
        break
      case 'ENS Registrar':
        result.ens = `${profile.handle}`
        profile.profile_uri?.length && profile.profile_uri[0] && (result.avatar = parseIpfs(profile.profile_uri[0]))
        break
      case 'Lens':
        result.lens = `${profile.handle}`
        profile.profile_uri?.length && profile.profile_uri[0] && (result.avatar = parseIpfs(profile.profile_uri[0]))
        break
      default:
        break
    }
  })

  return result
}
