export default function getAlertLevel(
  porcentageOfBudget: number,
  acceptablePorcentage: number = 0.7,
): { alert: 'red' | 'yellow' | 'green' } {
  if (porcentageOfBudget >= 1) {
    return { alert: 'red' }
  }

  if (porcentageOfBudget >= acceptablePorcentage) {
    return { alert: 'yellow' }
  }

  return { alert: 'green' }
}
