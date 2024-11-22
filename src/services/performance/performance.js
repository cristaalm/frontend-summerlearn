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

  // Ordenar por id DESC
  performances.sort((a, b) => b.performance_beneficiaries_id - a.performance_beneficiaries_id)

  const performanceList = performances?.map((performance) => ({
    id: performance.performance_beneficiaries_id,
    value: performance.performance_beneficiaries_value,
    activity: {
      id: performance.performance_beneficiaries_subscription.subscriptions_children_activity
        .activities_id,
      name: performance.performance_beneficiaries_subscription.subscriptions_children_activity
        .activities_name
    },
    child: {
      id: performance.performance_beneficiaries_subscription.subscriptions_children_child
        .children_id,
      name: performance.performance_beneficiaries_subscription.subscriptions_children_child
        .children_name
    }
  }))

  return performanceList
}
