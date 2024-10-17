<script setup>
import { inject, watch } from "vue";
import { Baseurl } from "@/utils/global";
import { formatMessageDate } from "@/utils/formatDate";
import LoadingIcon from '@/components/base/LoadingIcon';

const { chats, loadingChats, errorChats, loadChats } = inject("chats");

</script>

<template>
    <template v-if="!loadingChats && chats.length > 0">
        <div class="h-[530px]">
            <template v-for="(chat, index) in chats" :key="index">
                <div
                    class="flex items-center gap-4 px-2 py-2.5 -mx-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600 transition-all">
                    <div class="relative">
                        <div class="w-12 h-12 overflow-hidden border-2 rounded-full image-fit border-slate-200/70">
                            <img alt="Tailwise - Admin Dashboard Template"
                                :src="`${Baseurl}${chat.user.users_photo}`" />
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center w-full">
                            <div
                                class="font-medium max-w-[7rem] md:max-w-[8rem] truncate text-black dark:text-slate-200">
                                {{ chat.user.name }}
                            </div>
                            <div class="flex items-center gap-2 ml-auto">
                                <div class="text-xs text-slate-400/90">
                                    {{ formatMessageDate(chat.lastMessage.date) }}
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center mt-1.5">
                            <div class="text-slate-500/90 max-w-[7rem] md:max-w-[10rem] truncate dark:text-slate-400">
                                {{ chat.lastMessage.content }}
                            </div>
                        </div>
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