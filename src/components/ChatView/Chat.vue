<script setup lang="ts">
import { onMounted, onUnmounted, inject } from "vue";
import { useWebSocket, useScroll } from "@/hooks/chat";
import { Menu } from "@/components/base/Headless";
import { FormTextarea } from "@/components/base/Form";
import Tippy from "@/components/base/Tippy";
import Button from "@/components/base/Button";
import Lucide from "@/components/base/Lucide";
import "@/assets/css/vendors/simplebar.css";
import { formatMessageDate } from "@/utils/formatDate";
import SimpleBar from "simplebar";

const { channelName } = defineProps<{ channelName?: string }>();

const { scrollToBottom, scrollableRef } = useScroll();
const { messages, newMessage, mountedSocket, unmountedSocket, sendMessage } = useWebSocket({ scrollToBottom, channelName });
const { loadingUser, errorUser } = inject("user", { loadingUser: false, errorUser: false });

onMounted(() => {
  if (scrollableRef.value) {
    new SimpleBar(scrollableRef.value);
  }
  // Montamos el socket
  mountedSocket();
});

onUnmounted(() => {
  // Desmontamos el socket
  unmountedSocket();
});
</script>

<template>
  <div class="flex flex-col w-full lg:w-2/3 lg:p-5 lg:pt-0 gap-y-7">
    <div class="flex flex-col p-5 box box--stacked">
      <div class="flex items-center gap-3.5 border-b border-dashed pb-5">
        <div>
          <div
            class="w-12 h-12 overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70 dark:border-slate-500/70">
            <img alt="Tailwise - Admin Dashboard Template"
              :src="'http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg'" />
          </div>
        </div>
        <div>
          <div class="font-medium truncate max-w-[9rem] md:max-w-none text-black dark:text-slate-200">
            Eduarduar
          </div>
          <div class="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none dark:text-slate-400">
            Cordinador
          </div>
        </div>
        <div class="flex gap-2 ml-auto">
          <Tippy as="a"
            class="flex items-center justify-center border rounded-full w-9 h-9 border-primary/30 dark:border-slate-200/30 bg-primary/5 dark:bg-slate-200/5"
            content="eduardoarcega1997@gmail.com">
            <Lucide icon="Mail" class="w-4 h-4 text-primary dark:text-slate-200 fill-primary/10" />
          </Tippy>
        </div>
      </div>
      <div :class="[
        'min-h-[530px] max-h-[530px] -mx-3 overflow-y-auto [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent',
        '[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/20',
      ]" ref="scrollableRef">


        <!-- si no hay mensajes mostramos un mensaje que anime a escribir -->
        <div v-if="messages && messages.length === 0" class="flex items-center justify-center h-[530px]">
          <div class="text-slate-500 dark:text-slate-400">
            No hay mensajes, ¡escribe algo!
          </div>
        </div>
        <div class="flex flex-col gap-3.5 py-5 px-3" v-if="messages && messages.length > 0">
          <div v-for="(message, index) in messages" :key="index"
            class="max-w-[85%] sm:max-w-none relative mr-auto group [&.right]:mr-0 [&.right]:ml-auto flex items-end gap-3 [&.right]:flex-row-reverse">
            <div class="hidden sm:block">
              <div
                class="w-12 h-12 overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70 dark:border-slate-700/70">
                <img alt="Tailwise - Admin Dashboard Template"
                  :src="'http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg'" />
              </div>
            </div>
            <div :class="[`border p-2 rounded-r-xl rounded-tl-xl group-[.right]:text-right group-[.right]:rounded-l-xl group-[.right]:rounded-br-none`,
              message.error ? 'bg-red-50 border-red-200 dark:bg-red-800/80 dark:border-red-700/80' : 'bg-slate-50 border-slate-200/80 dark:bg-slate-800/80 dark:border-slate-700/80'
            ]">
              <div class="text-black dark:text-slate-200">{{ message.content ?? message.error }}</div>
              <div class="flex group-[.right]:flex-row-reverse items-center mt-1 gap-10">
                <div
                  class="flex items-center gap-2 mr-auto group-[.right]:mr-0 group-[.right]:ml-auto group-[.right]:flex-row-reverse">
                  <Lucide icon="CheckCheck" class="w-3.5 h-3.5 stroke-[1.4] text-slate-500/90 dark:text-slate-400" />
                  <div class="text-xs text-slate-500/70 dark:text-slate-400/70">
                    {{ formatMessageDate(message.date) }}
                  </div>
                </div>
              </div>
            </div>
            <Menu class="absolute inset-y-0 right-0 w-5 h-5 my-auto -mr-8 group-[.right]:-ml-8 group-[.right]:left-0">
              <Menu.Button class="w-5 h-5 text-slate-500 dark:text-slate-400">
                <Lucide icon="MoreVertical"
                  class="w-5 h-5 stroke-slate-400/70 dark:stroke-slate-500/70 fill-slate-400/70 dark:fill-slate-200" />
              </Menu.Button>
              <Menu.Items class="w-40">
                <Menu.Item class="text-black dark:text-red-400">
                  <Lucide icon="Trash" class="w-4 h-4 mr-2 text-black dark:text-red-400" />
                  Delete
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
      <div class="relative">
        <FormTextarea @keydown.enter.prevent.stop="sendMessage"
          class="-mb-1.5 pr-16 rounded-xl resize dark:placeholder:text-slate-400 dark:text-slate-200 scrollbar-custom"
          v-model="newMessage" placeholder="Type a message..." />
        <div class="absolute inset-y-0 right-0 flex items-center justify-center w-[3.8rem]">
          <button @click="sendMessage"
            class="flex items-center justify-center border-transparent rounded-full cursor-pointer w-9 h-9 box">
            <Lucide icon="Send" class="stroke-[1.3] w-4 h-4 -ml-0.5 text-slate-500 dark:text-blue-400" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>