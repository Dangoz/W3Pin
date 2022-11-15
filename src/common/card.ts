// util functions for working with card

// assign achievements based on profile stats
export const parseAchievements = (
  assets: number,
  collectible: number,
  social: number,
  transaction: number,
): string[] => {
  const result = []
  if (assets >= 50) {
    result.push('achiever')
  }
  if (collectible >= 50) {
    result.push('hatch')
  }
  if (social >= 100) {
    result.push('influencer')
  }
  if (transaction >= 30) {
    result.push('winner')
  }
  return result
}
