<script setup>
import { ref, provide, onMounted, watch, inject, onUnmounted, nextTick } from 'vue'
import 'driver.js/dist/driver.css'
import { useCountUsers } from '@/hooks/home/admin/useCountUsers'
import { useLastPrograms } from '@/hooks/home/admin/useLastPrograms'
import { useLastDonations } from '@/hooks/home/admin/useLastDonations'
import { useLastBills } from '@/hooks/home/admin/useLastBills'
import { useLastActivities } from '@/hooks/home/coord/useLastActivities'
import { useLastProgramsAsigned } from '@/hooks/home/coord/useLastProgramsAsigned'
import { useLastProgramsUnasigned } from '@/hooks/home/coord/useLastProgramsUnasigned'
import { useRoles } from '@/hooks/roles/useRoles'
import { useUserRequest, useUsers } from '@/hooks/users/'
import { usePrograms } from '@/hooks/programs/'
import { useAreas, useAreasInSubs } from '@/hooks/areas/'
import { useActividades, useProgramsActividades } from '@/hooks/actividades/'
import { useDonations } from '@/hooks/donations/'
import { useBills } from '@/hooks/bills'
import { usePerformance } from '@/hooks/performance/'
import { useGrades } from '@/hooks/programs/addProgram/'
import LoadingIcon from '@/components/base/LoadingIcon'
import getIdByToken from '@/logic/getIdByToken'
import { useActividadesSubscribed } from '@/hooks/subscriptions/'
import { useChildrens } from '@/hooks/childrens/'

const { rol: role, status } = getIdByToken(localStorage.getItem('access_token'))
const isLoading = ref(true)
const animate = ref(false)
const endLoad = ref(false)
// Declaración de los estados de carga
let loadings = []

if (role === 1 && status != 3) {
  const showToast = inject('showToast')

  const { countUsers, loadingCountUsers, loadCountUsers } = useCountUsers()
  loadings.push(loadingCountUsers)
  provide('countUsers', { countUsers, loadingCountUsers, loadCountUsers })
  onMounted(() => loadCountUsers())

  const { lastDonations, loadingLastDonations, loadLastDonations } = useLastDonations()
  loadings.push(loadingLastDonations)
  provide('lastDonations', { lastDonations, loadingLastDonations, loadLastDonations })
  onMounted(() => loadLastDonations())

  const { lastBills, loadingLastBills, loadLastBills } = useLastBills()
  loadings.push(loadingLastBills)
  provide('lastBills', { lastBills, loadingLastBills, loadLastBills })
  onMounted(() => loadLastBills())

  const { lastPrograms, loadingLastPrograms, loadLastPrograms } = useLastPrograms()
  loadings.push(loadingLastPrograms)
  provide('lastPrograms', { lastPrograms, loadingLastPrograms, loadLastPrograms })
  onMounted(() => loadLastPrograms())

  const { roles, loadingRoles, loadRoles } = useRoles()
  provide('roles', { roles, loadingRoles, loadRoles })
  onMounted(() => loadRoles())

  const { bills, loadingBills, loadBills } = useBills()
  provide('bills', { bills, loadingBills, loadBills })
  onMounted(() => loadBills())

  // Observa cuando se cargue la cantidad de usuarios pendientes

  watch(isLoading, () => {
    if (!loadingCountUsers.value) {
      if (countUsers.value.pendientes) {
        showToast({
          message: 'Tienes nuevas solicitudes de registro',
          type: 'info',
          persistente: true
        })
      }
    }
  })
}

if (role === 2 && status != 3) {
  const { lastActivities, loadingLastActivities, loadLastActivities, errorLastActivities } = useLastActivities()
  loadings.push(loadingLastActivities)
  provide('lastActivities', { lastActivities, loadingLastActivities, loadLastActivities, errorLastActivities })
  onMounted(() => loadLastActivities())

  const { lastProgramsAsigned, loadingLastProgramsAsigned, loadLastProgramsAsigned, errorLastProgramsAsigned } = useLastProgramsAsigned()
  loadings.push(loadingLastProgramsAsigned)
  provide('lastProgramsAsigned', { lastProgramsAsigned, loadingLastProgramsAsigned, loadLastProgramsAsigned, errorLastProgramsAsigned })
  onMounted(() => loadLastProgramsAsigned())

  const { lastProgramsUnasigned, loadingLastProgramsUnasigned, loadLastProgramsUnasigned, errorLastProgramsUnasigned } = useLastProgramsUnasigned()
  loadings.push(loadingLastProgramsUnasigned)
  provide('lastProgramsUnasigned', { lastProgramsUnasigned, loadingLastProgramsUnasigned, loadLastProgramsUnasigned, errorLastProgramsUnasigned })
  onMounted(() => loadLastProgramsUnasigned())
}

if ((role === 1 || role === 2) && status != 3) {
  const { usersRequest, loadingUsersRequest, loadUsersRequest } = useUserRequest()
  provide('usersRequest', { usersRequest, loadingUsersRequest, loadUsersRequest })
  onMounted(() => loadUsersRequest())
}

if ((role === 4 || role == 5) && status != 3) {
  const { areasSub, loadingSub, errorSub, loadAreasSub } = useAreasInSubs()
  loadings.push(loadingSub)
  provide('areasInSubs', { areasSub, loadingSub, errorSub, loadAreasSub })
  onMounted(() => loadAreasSub())

  const { actividadesSubscribed, loadingActividadesSubscribed, errorActividadesSubscribed, loadActividadesSubscribed } = useActividadesSubscribed()
  loadings.push(loadingActividadesSubscribed)
  provide('actividadesSubscribed', { actividadesSubscribed, loadingActividadesSubscribed, errorActividadesSubscribed, loadActividadesSubscribed })
  onMounted(() => loadActividadesSubscribed())
}

if ((role === 1 || role === 2 || role === 5) && status != 3) {
  const { users, loadingUsers, loadUsers } = useUsers()
  provide('users', { users, loadingUsers, loadUsers })
  onMounted(() => loadUsers())

  const { grades, loadingGrades, errorGrades, loadGrades } = useGrades()
  provide('grades', { grades, loadingGrades, errorGrades, loadGrades })
  onMounted(() => loadGrades())

  const { actividades, loadingActivities, loadActivities } = useActividades()
  provide('actividades', { actividades, loadingActivities, loadActivities })
  onMounted(() => loadActivities())
}

if ((role === 3 || role === 1) && status != 3) {
  const { graphicDonations, barDonations, donations, loadingDonations, errorDonations, loadDonations, deleteDonation } = useDonations()
  if (role === 3) {
    loadings.push(loadingDonations)
  }
  provide('donations', { graphicDonations, barDonations, donations, loadingDonations, errorDonations, loadDonations, deleteDonation })
  onMounted(() => loadDonations())
}

if ((role === 1 || role === 2 || role === 4 || role === 5) && status != 3) {
  const { childrens, loadingChildrens, errorChildrens, loadChildrens } = useChildrens()
  if (role === 5) {
    loadings.push(loadingChildrens)
  }
  provide('childrens', { childrens, loadingChildrens, errorChildrens, loadChildrens })
  onMounted(() => loadChildrens())

  const { performance, loadingPerformance, loadPerformance, errorPerformance } = usePerformance()
  if (role === 4){ // si el rol es voluntario
    loadings.push(loadingPerformance) // va esperar a que termine de cargar los performance
  }
  provide('performance', { performance, loadingPerformance, loadPerformance, errorPerformance })
  onMounted(() => loadPerformance())

  const { programas, loadingProgram, loadProgram } = useProgramsActividades()
  provide('programasActivosActividades', { programas, loadingProgram, loadProgram })
  onMounted(() => loadProgram())

  const { areas, loadingAreas, loadAreas } = useAreas()
  provide('areas', { areas, loadingAreas, loadAreas })
  onMounted(() => loadAreas())

  const { programs, loadingPrograms, loadPrograms } = usePrograms()
  provide('programs', { programs, loadingPrograms, loadPrograms })
  onMounted(() => loadPrograms())

}

import { useUserPhoto, useUser } from '@/hooks/settings/'
const { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto } = useUserPhoto()
const { user, loadingUser, errorUser, loadUser } = useUser()
loadings.push(loadingUserPhoto, loadingUser)
provide('userPhoto', { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto })
provide('user', { user, loadingUser, errorUser, loadUser })

onMounted(() => {
  loadUserPhoto()
  loadUser()
})

// ? ############################ SOCKET ############################

import { useWebSocket } from '@/hooks/chat'
const { mountedSocket, unmountedSocket, chats, messages, loadingChats, loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, contacts, loadingContacts } = useWebSocket()
provide('socket', { chats, messages, loadingChats, loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, contacts, loadingContacts })

onMounted(() => {
  mountedSocket()
})
onUnmounted(() => {
  unmountedSocket()
})

// Observa cuando todos los estados de carga sean `false`
watch(
  loadings,
  () => {
    if (endLoad.value) return
    isLoading.value = loadings.some((loading) => loading.value)
  },
  { immediate: true }
)

watch(isLoading, () => {
  if (!isLoading.value) {
    animate.value = true
    endLoad.value = true
    setTimeout(() => {
      animate.value = false
    }, 3000000)
  }
})

provide('isLoading', { isLoading })
</script>

<template>
  <div v-if="isLoading || animate"
    :class="`min-w-[100vw] min-h-[100vh] fixed z-[999999999] flex justify-center items-center bg-gray-100 dark:bg-[#28334e] ${animate ? 'animate-provider-out' : ''}`">
    <div class="flex flex-col items-center gap-10">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white">
        Bienvenido a tu panel de control
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">Estamos preparando todo para ti</p>
      <LoadingIcon icon="tail-spin" color="gray" class="font-bold w-20" />
    </div>
  </div>
  <slot v-if="!isLoading"></slot>
</template>
