<script setup>
import { ref, provide, onMounted, watch, inject, onUnmounted, nextTick } from 'vue';
import "driver.js/dist/driver.css";
import { useCountUsers } from "@/hooks/home/admin/useCountUsers";
import { useLastPrograms } from "@/hooks/home/admin/useLastPrograms";
import { useLastDonations } from '@/hooks/home/admin/useLastDonations';
import { useLastBills } from '@/hooks/home/admin/useLastBills';
import { useLastActivities } from '@/hooks/home/coord/useLastActivities';
import { useLastProgramsAsigned } from '@/hooks/home/coord/useLastProgramsAsigned';
import { useLastProgramsUnasigned } from '@/hooks/home/coord/useLastProgramsUnasigned';
import { useRoles } from '@/hooks/roles/useRoles';
import { useUserRequest, useUsers } from '@/hooks/users/';
import { usePrograms } from '@/hooks/programs/';
import { useAreas, useAreasInSubs } from '@/hooks/areas/';
import { useActividades } from '@/hooks/actividades/';
import { useDonations } from '@/hooks/donations/';
import { useBills } from '@/hooks/bills';
import { usePerformance } from '@/hooks/performance/';
import { useGrades } from '@/hooks/programs/addProgram/'
import LoadingIcon from '@/components/base/LoadingIcon';
import getIdByToken from '@/logic/getIdByToken';
import { useRouter } from 'vue-router';
import { useActividadesSubscribed } from '@/hooks/subscriptions/'
import { useChildrens } from '@/hooks/childrens/'

// ? tour
import { getTour } from '@/utils/getTour';
import { startTourAdmin, startTourDonor } from '@/utils/tours/'

const { rol: role, user_id: id } = getIdByToken(localStorage.getItem('access_token'));
const isLoading = ref(true);
const animate = ref(false);
const router = useRouter();
const endLoad = ref(false);
// Declaración de los estados de carga
let loadings = [];

if (role === 1) {
    const showToast = inject("showToast");

    const { countUsers, loadingCountUsers, loadCountUsers } = useCountUsers();
    loadings.push(loadingCountUsers);
    provide('countUsers', { countUsers, loadingCountUsers, loadCountUsers });
    onMounted(() => loadCountUsers());

    const { lastDonations, loadingLastDonations, loadLastDonations } = useLastDonations();
    loadings.push(loadingLastDonations);
    provide('lastDonations', { lastDonations, loadingLastDonations, loadLastDonations });
    onMounted(() => loadLastDonations());

    const { lastBills, loadingLastBills, loadLastBills } = useLastBills();
    loadings.push(loadingLastBills);
    provide('lastBills', { lastBills, loadingLastBills, loadLastBills });
    onMounted(() => loadLastBills());

    const { lastPrograms, loadingLastPrograms, loadLastPrograms } = useLastPrograms();
    loadings.push(loadingLastPrograms);
    provide('lastPrograms', { lastPrograms, loadingLastPrograms, loadLastPrograms });
    onMounted(() => loadLastPrograms());

    const { roles, loadingRoles, loadRoles } = useRoles();
    provide('roles', { roles, loadingRoles, loadRoles });
    onMounted(() => loadRoles());

    const { usersRequest, loadingUsersRequest, loadUsersRequest } = useUserRequest();
    provide('usersRequest', { usersRequest, loadingUsersRequest, loadUsersRequest });
    onMounted(() => loadUsersRequest());

    const { bills, loadingBills, loadBills } = useBills();
    provide('bills', { bills, loadingBills, loadBills });
    onMounted(() => loadBills());

    // Observa cuando se cargue la cantidad de usuarios pendientes

    watch(isLoading, () => {
        if (!loadingCountUsers.value) {
            if (countUsers.value.pendientes) {
                showToast({ message: 'Tienes nuevas solicitudes de registro', type: 'info', persistente: true });
            }
        }
    });
}

if (role === 2) {
    const { lastActivities, loadingLastActivities, loadLastActivities, errorLastActivities } = useLastActivities();
    loadings.push(loadingLastActivities);
    provide('lastActivities', { lastActivities, loadingLastActivities, loadLastActivities, errorLastActivities });
    onMounted(() => loadLastActivities());

    const { lastProgramsAsigned, loadingLastProgramsAsigned, loadLastProgramsAsigned, errorLastProgramsAsigned } = useLastProgramsAsigned();
    loadings.push(loadingLastProgramsAsigned);
    provide('lastProgramsAsigned', { lastProgramsAsigned, loadingLastProgramsAsigned, loadLastProgramsAsigned, errorLastProgramsAsigned });
    onMounted(() => loadLastProgramsAsigned());

    const { lastProgramsUnasigned, loadingLastProgramsUnasigned, loadLastProgramsUnasigned, errorLastProgramsUnasigned } = useLastProgramsUnasigned();
    loadings.push(loadingLastProgramsUnasigned);
    provide('lastProgramsUnasigned', { lastProgramsUnasigned, loadingLastProgramsUnasigned, loadLastProgramsUnasigned, errorLastProgramsUnasigned });
    onMounted(() => loadLastProgramsUnasigned());
}

if (role === 4) {

    const { areasSub, loadingSub, errorSub, loadAreasSub } = useAreasInSubs();
    loadings.push(loadingSub);
    provide('areasInSubs', { areasSub, loadingSub, errorSub, loadAreasSub });
    onMounted(() => loadAreasSub());

    const { actividadesSubscribed, loadingActividadesSubscribed, errorActividadesSubscribed, loadActividadesSubscribed } = useActividadesSubscribed();
    loadings.push(loadingActividadesSubscribed);
    provide('actividadesSubscribed', { actividadesSubscribed, loadingActividadesSubscribed, errorActividadesSubscribed, loadActividadesSubscribed });
    onMounted(() => loadActividadesSubscribed());
}
if (role === 5) {
    const { childrens, loadingChildrens, errorChildrens, loadChildrens } = useChildrens();
    loadings.push(loadingChildrens);
    provide('childrens', { childrens, loadingChildrens, errorChildrens, loadChildrens });
    onMounted(() => loadChildrens());
}

if (role === 1 || role === 2) {
    const { users, loadingUsers, loadUsers } = useUsers();
    provide('users', { users, loadingUsers, loadUsers });
    onMounted(() => loadUsers());

    const { programs, loadingPrograms, loadPrograms } = usePrograms();
    provide('programs', { programs, loadingPrograms, loadPrograms });
    onMounted(() => loadPrograms());

    const { areas, loadingAreas, loadAreas } = useAreas();
    provide('areas', { areas, loadingAreas, loadAreas });
    onMounted(() => loadAreas());

    const { grades, loadingGrades, errorGrades, loadGrades } = useGrades();
    provide('grades', { grades, loadingGrades, errorGrades, loadGrades });
    onMounted(() => loadGrades());

    const { actividades, loadingActivities, loadActivities } = useActividades();
    provide('actividades', { actividades, loadingActivities, loadActivities });
    onMounted(() => loadActivities());
}

if (role === 3 || role === 1) {
    const { graphicDonations, barDonations, donations, loadingDonations, errorDonations, loadDonations, deleteDonation } = useDonations();
    if (role === 3) {
        loadings.push(loadingDonations);
    }
    provide('donations', { graphicDonations, barDonations, donations, loadingDonations, errorDonations, loadDonations, deleteDonation })
    onMounted(() => loadDonations());
}

if (role === 1 || role === 2 || role === 4) {
    const { performance, loadingPerformance, loadPerformance } = usePerformance();
    provide('performance', { performance, loadingPerformance, loadPerformance });
    onMounted(() => loadPerformance());
}

import { useUserPhoto, useUser } from '@/hooks/settings/';
const { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto } = useUserPhoto();
const { user, loadingUser, errorUser, loadUser } = useUser();
loadings.push(loadingUserPhoto, loadingUser);
provide('userPhoto', { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto });
provide('user', { user, loadingUser, errorUser, loadUser });

onMounted(() => {
    loadUserPhoto();
    loadUser();
});

// ? ############################ SOCKET ############################

import { useWebSocket } from "@/hooks/chat";
import { h } from 'vue';
const { mountedSocket, unmountedSocket, chats, messages, loadingChats, loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, contacts, loadingContacts } = useWebSocket();

provide('socket', { chats, messages, loadingChats, loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, contacts, loadingContacts });
onMounted(() => {
    mountedSocket();
});
onUnmounted(() => {
    unmountedSocket();
});

// Observa cuando todos los estados de carga sean `false`
watch(loadings, () => {
    if (endLoad.value) return
    isLoading.value = loadings.some(loading => loading.value);
}, { immediate: true });

watch(isLoading, () => {
    if (!isLoading.value) {
        animate.value = true;
        endLoad.value = true;
        setTimeout(() => {
            animate.value = false;
        }, 3000000);
    }
});


// ? ############################ Tour ############################
if (role === 3) {
    watch(isLoading, async (newValue) => {
        if (!newValue) {

            const tour = await getTour(id);

            if (tour.users_tour == false) {
                await startTourDonor(router, id)
            } else if (tour.users_tour == true) {
                return;

            }

        }
    });
}



</script>

<template>
    <div v-if="isLoading || animate"
        :class="`min-w-[100vw] min-h-[100vh] fixed z-[999999999] flex justify-center items-center bg-gray-100 dark:bg-[#28334e] ${animate ? 'animate-provider-out' : ''}`">
        <div class="flex flex-col items-center gap-10">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-white">Bienvenido a tu panel de control</h1>
            <p class="text-lg text-gray-600 dark:text-gray-300">Estamos preparando todo para ti</p>
            <LoadingIcon icon="tail-spin" color="gray" class="font-bold w-20" />
        </div>
    </div>
    <slot v-if="!isLoading"></slot>
</template>
