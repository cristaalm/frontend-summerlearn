import { Baseurl } from '@/utils/global'

export const getPerformance = async () => {
  const response = await fetch(`${Baseurl}performance-beneficiaries/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const performances = json

  console.log(performances)

  // Ordenar por id DESC
  performances.sort((a, b) => b.performances_id - a.performances_id)

  return performances?.map((performance) => ({
    id: performance.performance_beneficiaries_id,
    value: performance.performance_beneficiaries_value,
    child: performance.performance_beneficiaries_subscription.child,
    activity: performance.performance_beneficiaries_subscription.activity,
  }))
}
