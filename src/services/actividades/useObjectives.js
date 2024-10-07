import { ref } from 'vue'
import { getObjectivesById } from './getObjectivesById'

export function useObjectives() {
  const objectives = ref([])
  const loadingObjectives = ref(false)
  const errorObjectives = ref(null)

  const loadObjectives = async (id_activity) => {
    loadingObjectives.value = true
    try {
      objectives.value = await getObjectivesById(id_activity) // Pasa el id_activity
      // console.log(objectives)
    } catch (e) {
      errorObjectives.value = e
    } finally {
      loadingObjectives.value = false
    }
  }

  return { objectives, loadingObjectives, errorObjectives, loadObjectives }
}
