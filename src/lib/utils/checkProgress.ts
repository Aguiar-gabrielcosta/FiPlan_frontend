export default function checkProgress(porcentage: number): number {
  if (porcentage >= 1) {
    return 1
  }

  return porcentage
}
