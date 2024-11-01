<script setup>
import { provide, onMounted, watch, inject, onUnmounted } from 'vue'
import { useCountUsers } from "@/hooks/home/admin/useCountUsers";
import { useLastPrograms } from "@/hooks/home/admin/useLastPrograms";
import { useLastDonations } from '@/hooks/home/admin/useLastDonations';
import { useLastBills } from '@/hooks/home/admin/useLastBills';
import { useRoles } from '@/hooks/roles/useRoles'
import { useUserRequest } from '@/hooks/users/'
import { useUsers } from '@/hooks/users/'
import { usePrograms } from '@/hooks/programs/'


import getIdByToken from '@/logic/getIdByToken'

// Obtener el rol del usuario a partir del token
const { rol: role } = getIdByToken(localStorage.getItem('access_token'))
const showToast = inject('showToast')



if (role === 1) {
    // ? ############################ COUNT USERS ############################

    const { countUsers, loadingCountUsers, loadCountUsers } = useCountUsers();
    provide('countUsers', { countUsers, loadingCountUsers, loadCountUsers });
    onMounted(() => {
        loadCountUsers();
    });

    // ? ############################ LAST PROGRAMS ############################


    const { lastPrograms, loadingLastPrograms, loadLastPrograms, errorLastPrograms } = useLastPrograms();
    provide('lastPrograms', { lastPrograms, loadingLastPrograms, loadLastPrograms, errorLastPrograms });
    onMounted(() => {
        loadLastPrograms();
    });

    // ? ############################ LAST DONATIONS ############################

    const { lastDonations, loadingLastDonations, loadLastDonations, errorLastDonations } = useLastDonations();
    provide('lastDonations', { lastDonations, loadingLastDonations, loadLastDonations, errorLastDonations });
    onMounted(() => {
        loadLastDonations();
    });

    // ? ############################ LAST BILLS ############################

    const { lastBills, loadingLastBills, loadLastBills, errorLastBills } = useLastBills();
    provide('lastBills', { lastBills, loadingLastBills, loadLastBills, errorLastBills });
    onMounted(() => {
        loadLastBills();
    });

    // ? ############################ VIEW UsersView ############################

    const { users, loadingUsers, errorUsers, loadUsers } = useUsers()
    provide('users', { users, loadingUsers, errorUsers, loadUsers })
    onMounted(() => {
        loadUsers()
    })

    const { roles, loadingRoles, errorRoles, loadRoles } = useRoles()
    provide('roles', { roles, loadingRoles, errorRoles, loadRoles })
    onMounted(() => {
        loadRoles()
    })

    // ? ############################ VIEW UsersRequestsView ############################

    const { usersRequest, loadingUsersRequest, errorUsersRequest, loadUsersRequest } = useUserRequest()
    provide('usersRequest', { usersRequest, loadingUsersRequest, errorUsersRequest, loadUsersRequest })
    onMounted(() => {
        loadUsersRequest()
    })

}

if (role === 1 || role === 2) {
    // ? ############################ VIEW ProgramsView ############################

    const { programs, loadingPrograms, errorPrograms, loadPrograms } = usePrograms()
    provide('programs', { programs, loadingPrograms, errorPrograms, loadPrograms })
    onMounted(() => {
        loadPrograms()
    })
}


// ? ############################ USER INFO ############################

import { useUserPhoto, useUser } from '@/hooks/settings/'
const { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto } = useUserPhoto()
const { user, loadingUser, errorUser, loadUser } = useUser()

provide('userPhoto', { photoUser, loadingUserPhoto, errorUserPhoto, loadUserPhoto })
provide('user', { user, loadingUser, errorUser, loadUser })


onMounted(() => {
    loadUserPhoto()
    loadUser()
})


// ? ############################ SOCKET ############################

import { useWebSocket } from "@/hooks/chat";
const { mountedSocket, unmountedSocket, chats, messages, loadingChats, loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, contacts, loadingContacts, } = useWebSocket();

provide('socket', { chats, messages, loadingChats, loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, contacts, loadingContacts });

onMounted(() => {
    mountedSocket();
});

onUnmounted(() => {
    unmountedSocket();
});



</script>

<template>
    <slot></slot>
</template>