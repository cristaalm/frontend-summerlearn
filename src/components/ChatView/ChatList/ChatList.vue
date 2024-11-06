<script setup>
import { inject, ref, watch } from "vue";
import { Baseurl } from "@/utils/global";
import { formatMessageDate } from "@/utils/formatDate";
import LoadingIcon from '@/components/base/LoadingIcon';
import Lucide from "@/components/base/Lucide";

// Inyectar los datos de los chats
const { chats, loadingChats, changeSeen } = inject("socket");
const { filteredChats } = inject("filteredChats");
const { selectChat, selectedChatIndex } = inject("selectChat");

watch(selectedChatIndex, (newValue) => {
    if (newValue !== null) {
        const chatIndex = chats.value.findIndex((chat) => chat.id === newValue);
        if (chatIndex !== -1) {
            changeSeen(chats.value[chatIndex].user.id, chats.value[chatIndex].id);
        }
    }
});


</script>

<template>
    <template v-if="!loadingChats && chats.length > 0">
        <div class="h-[530px] gap-1 flex flex-col">
            <template v-if="filteredChats.length > 0" v-for="chat in filteredChats" :key="chat.id">
                <div @click="selectChat(chat.id)" :class="{
                    'bg-blue-100 dark:bg-slate-700': selectedChatIndex === chat.id,
                    'hover:bg-slate-200 dark:hover:bg-slate-600': selectedChatIndex !== chat.id
                }"
                    class="flex items-center gap-4 px-2 py-2.5 -mx-2 rounded-lg cursor-pointer transition-all duration-300">

                    <!-- Avatar del usuario (10%) -->
                    <div class="relative flex-[0.1]">
                        <div class="w-12 h-12 overflow-hidden border-2 rounded-full image-fit border-slate-200/70">
                            <img alt="Tailwise - Admin Dashboard Template" :src="`${Baseurl}${chat.user.userPhoto}`" />
                        </div>
                        <div v-if="chat.user.isOnline"
                            class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:bg-green-400 dark:border-slate-200">
                        </div>
                    </div>

                    <!-- Información del usuario (90%) -->
                    <div class="flex-[0.9] w-full">
                        <div class="flex items-center w-full">
                            <!-- Nombre del usuario (90%) -->
                            <div class="font-medium truncate text-black dark:text-slate-200 flex-[0.7]">
                                {{ chat.user.name }}
                            </div>

                            <!-- Fecha del último mensaje (10%) -->
                            <div class="flex items-center gap-2 text-xs text-slate-400/90 flex-[0.3] justify-end">
                                {{ chat?.lastMessage ? formatMessageDate(chat.lastMessage.date) : '' }}
                            </div>
                        </div>

                        <div class="flex items-center mt-1.5">
                            <div class="text-slate-500/90 max-w-[9rem] md:max-w-[12rem] truncate dark:text-slate-400">
                                {{ chat?.lastMessage ? chat.lastMessage?.typing ? 'Escribiendo...' :
                                    chat.lastMessage.content : '' }}
                            </div>
                            <div class="flex items-center gap-2 ml-auto">
                                <Lucide v-if="!chat.seenChat" icon="Circle"
                                    class="w-3 h-3 text-blue-500 fill-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>

            </template>

            <template v-else>
                <div class="flex items-center justify-center h-[530px]">
                    <div class="text-slate dark:text-slate-400">
                        No se encontraron chats
                    </div>
                </div>
            </template>
        </div>
    </template>
    <template v-if="!loadingChats && chats.length === 0">
        <div class="flex items-center justify-center h-[530px]">
            <div class="text-slate dark:text-slate-400">
                No hay chats, ¡empieza uno!
            </div>
        </div>
    </template>

    <template v-if="loadingChats">
        <div class="flex items-center justify-center h-[530px]">
            <LoadingIcon icon="tail-spin" class="h-8" color="black" />
        </div>
    </template>

</template>
