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

export const convertBase64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1
  }
  return new File([u8arr], filename, { type: mime })
}

export const parseProfiles = (profiles: Profile[]): Identities & { avatar: string } => {
  const result: Identities & { avatar: string } = { address: profiles[0].address, avatar: '/logo.svg' }
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
