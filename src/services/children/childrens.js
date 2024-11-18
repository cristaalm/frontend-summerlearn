import { Baseurl } from '@/utils/global'

export const getChildrens = async () => {
  const response = await fetch(`${Baseurl}childrens/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  })
  const json = await response.json()
  const childrens = json

  // Ordenar por nombre
  childrens.sort((a, b) => {
    if (a.children_name > b.children_name) {
      return 1
    }
    if (a.children_name < b.children_name) {
      return -1
    }
    return 0
  })

  return childrens?.map((children) => ({
    id: children.children_id,
    name: children.children_name,
    photo: children.children_photo,
    birthdate: children.children_birthdate,
    curp: children.children_curp,
    user: children.children_user.name,
    grade: children.children_grade,
  }))
}
