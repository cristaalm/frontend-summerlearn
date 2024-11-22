import { ref, watch } from 'vue'

export function useValidations({ status, name, duration, responsible, area }) {
  const valid = ref(false)

  //?  ########################## VALIDATIONS ##########################

  const validateName = () => {
    if (status.value.name.Regex.test(name.value)) {
      status.value.name.error = false
      status.value.name.success = true
      status.value.name.message = ''
    } else {
      status.value.name.error = true
      status.value.name.success = false
      status.value.name.message = 'El "nombre del programa" no es válido'
    }
  }

  const validateDuration = () => {
    // * Separamos las fechas
    const date = duration.value.split('-')
    let [date1, date2] = date

    // * Remplazamos "/" por "-"
    date1 = date1.replace(/\//g, '-')
    date2 = date2.replace(/\//g, '-')

    // * Formateamos las fechas a YYYY-MM-DD
    date1 = date1.split('-').reverse().join('-').replace(/\s+/g, '')
    date2 = date2.split('-').reverse().join('-').replace(/\s+/g, '')

    // * Validamos las fechas
    if (status.value.duration.Regex.test(date1) && status.value.duration.Regex.test(date2)) {
      status.value.duration.error = false
      status.value.duration.success = true
      status.value.duration.message = ''
    } else {
      status.value.duration.error = true
      status.value.duration.success = false
      status.value.duration.message = 'La "duración del programa" no es válida'
    }
  }

  const validateResponsible = () => {
    if (status.value.responsible.Regex.test(responsible.value)) {
      status.value.responsible.error = false
      status.value.responsible.success = true
      status.value.responsible.message = ''
    } else {
      status.value.responsible.error = true
      status.value.responsible.success = false
      status.value.responsible.message = 'El "responsable del programa" no es válido'
    }
  }

  const validateArea = () => {
    if (status.value.area.Regex.test(area.value)) {
      status.value.area.error = false
      status.value.area.success = true
      status.value.area.message = ''
    } else {
      status.value.area.error = true
      status.value.area.success = false
      status.value.area.message = 'El "area del programa" no es válida'
    }
  }

  const validateAll = () => {
    if (
      status.value.name.success &&
      status.value.duration.success &&
      status.value.responsible.success &&
      status.value.area.success
    ) {
      valid.value = true
    } else {
      valid.value = false
    }
  }

  //?  ########################## WATCHERS ##########################

  watch(name, validateName)

  watch(duration, validateDuration)

  watch(responsible, validateResponsible)

  watch(area, validateArea)

  watch(status.value, () => {
    validateAll()
  })

  return { valid }
}
