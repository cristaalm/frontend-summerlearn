<script setup>
import { onMounted, inject, watch, ref } from "vue";
import { useScroll } from "@/hooks/chat";
import { Menu } from "@/components/base/Headless";
import { FormTextarea } from "@/components/base/Form";
import Tippy from "@/components/base/Tippy";
import { Baseurl } from "@/utils/global";
import Button from "@/components/base/Button";
import Lucide from "@/components/base/Lucide";
import "@/assets/css/vendors/simplebar.css";
import { formatMessageDate } from "@/utils/formatDate";
import SimpleBar from "simplebar";
import LoadingIcon from '@/components/base/LoadingIcon';

const { selectedChatIndex, selectChatInfo, messagesSelectChat } = inject("selectChat");
const { loadingMessages, newMessage, sendMessage, isTyping, loadingSendMessage, changeSeen, chats } = inject("socket");
const { photoUser } = inject("userPhoto");
const showToast = inject('showToast')
const { scrollToBottom, scrollableRef } = useScroll();



const typing = ref(false);
let typingTimeout = null; // Almacena el timeout para detectar inactividad al escribir

// Función para manejar el evento de escritura
const handleTyping = () => {
  if (!typing.value) {
    // Si no se ha enviado aún la señal de "escribiendo", la enviamos
    isTyping(selectChatInfo.value.user.id, true);
    typing.value = true;
  }

  // Limpiamos el temporizador anterior para que no envíe el evento de "ha dejado de escribir"
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  // Después de 2 segundos de inactividad, enviamos la señal de que ha dejado de escribir
  typingTimeout = setTimeout(() => {
    isTyping(selectChatInfo.value.user.id, false);
    typing.value = false;
  }, 2000);
};

const sendMessageToRecipient = () => {
  sendMessage(selectChatInfo.value.user.id);
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }
  isTyping(selectChatInfo.value.user.id, false); // Enviamos "no está escribiendo" cuando se envía el mensaje
  typing.value = false;
};

onMounted(() => {
  if (scrollableRef.value) {
    new SimpleBar(scrollableRef.value);
  }

  watch(messagesSelectChat, () => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    if (selectChatInfo.value) {
      changeSeen(selectChatInfo.value.user.id, selectChatInfo.value.id);
    }
  });

});

const copiedEmail = () => {
  navigator.clipboard.writeText(selectChatInfo.value.user.email)
    .then(() => {
      showToast({ message: "Correo copiado al portapapeles", type: "info" });
    })
    .catch(() => {
      showToast({ message: "Error al copiar el correo al portapapeles", type: "error" });
    });
};
</script>

<template>
  <template v-if="selectedChatIndex !== 'chats' && selectedChatIndex !== 'contacts'">
    <div class="flex flex-col w-full lg:w-2/3 lg:p-5 lg:pt-0 gap-y-7">
      <div class="flex flex-col p-5 box box--stacked">
        <div class="flex items-center gap-3.5 border-b border-dashed border-black dark:border-slate-400 pb-5">
          <div class="relative">
            <div
              class="w-12 h-12 overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70 dark:border-slate-500/70">
              <img alt="Tailwise - Admin Dashboard Template" :src="`${Baseurl}${selectChatInfo.user.userPhoto}`" />
            </div>
            <div v-if="selectChatInfo.user.isOnline"
              class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:bg-green-400 dark:border-slate-200">
            </div>
          </div>
          <div>
            <div class="font-medium truncate max-w-[9rem] md:max-w-none text-black dark:text-slate-200">
              {{ selectChatInfo.user.name }}
            </div>
            <div class="text-slate-500 mt-0.5 truncate max-w-[9rem] md:max-w-none dark:text-slate-400">
              {{ selectChatInfo.lastMessage?.typing ? 'Escribiendo...' : selectChatInfo.user.rol }}
            </div>
          </div>
          <div class="flex gap-2 ml-auto">
            <Tippy as="a" @click="copiedEmail"
              class="flex items-center justify-center border rounded-full w-9 h-9 border-primary/30 dark:border-slate-200/30 bg-primary/5 dark:bg-slate-200/5 dark:hover:bg-slate-900 dark:hover:text-slate-200 transition-all duration-300"
              :content="selectChatInfo.user.email">
              <Lucide icon="Mail" class="w-4 h-4 text-primary dark:text-slate-200 fill-primary/10" />
            </Tippy>
          </div>
        </div>
        <div :class="[
          'min-h-[530px] max-h-[530px] -mx-3 overflow-y-auto [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent scrollbar-custom',
          '[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/20',
        ]" ref="scrollableRef">


          <!-- si no hay mensajes mostramos un mensaje que anime a escribir -->
          <div v-if="!loadingMessages && messagesSelectChat && messagesSelectChat.length === 0"
            class="flex items-center justify-center h-[530px]">
            <div class="text-slate-500 dark:text-slate-400">
              No hay mensajes, ¡escribe algo!
            </div>
          </div>

          <!-- Si los mensajes estan cargando mostramos una animación -->
          <div v-if="loadingMessages" class="flex items-center justify-center h-[530px]">
            <div class="text-slate-500 dark:text-slate-400">
              <LoadingIcon icon="tail-spin" class="h-8" color="black" />
            </div>
          </div>

          <div class="flex flex-col gap-3.5 py-5 px-3" v-if="messagesSelectChat && messagesSelectChat.length > 0">
            <div v-for="(message, index) in messagesSelectChat" :key="index"
              :class="`max-w-[85%] sm:max-w-none relative mr-auto group [&.right]:mr-0 [&.right]:ml-auto flex items-end gap-3 [&.right]:flex-row-reverse ${message.user == selectChatInfo.user.id ? '' : 'right'}`">
              <div class="hidden sm:block">
                <div
                  class="w-12 h-12 overflow-hidden rounded-full image-fit border-[3px] border-slate-200/70 dark:border-slate-700/70">
                  <img alt="Tailwise - Admin Dashboard Template"
                    :src="`${Baseurl}${message.user == selectChatInfo.user.id ? selectChatInfo.user.userPhoto : photoUser}`" />
                </div>
              </div>
              <div :class="[`border p-2 rounded-r-xl rounded-tl-xl group-[.right]:text-right group-[.right]:rounded-l-xl group-[.right]:rounded-br-none`,
                message.user == selectChatInfo.user.id ? 'bg-slate-50 border-slate-200/80 dark:bg-slate-800/80 dark:border-slate-700/80' : 'bg-slate-300 border-slate-300/80 dark:bg-slate-600 dark:border-slate-600/80'
              ]">
                <div
                  class="text-black dark:text-slate-200 max-w-[200px] sm:max-w-[300px] md:max-w-[400px] break-words text-wrap text-justify">
                  {{ message.message }}
                </div>
                <div class="flex group-[.right]:flex-row-reverse items-center mt-1 gap-10">
                  <div
                    class="flex items-center gap-2 mr-auto group-[.right]:mr-0 group-[.right]:ml-auto group-[.right]:flex-row-reverse">
                    <div class="text-xs text-slate-500/70 dark:text-slate-400/70">
                      {{ formatMessageDate(message.date) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative">
          <FormTextarea @keydown.enter.prevent="() => {
            if (newMessage.trim() === '') return
            sendMessageToRecipient()
          }" @keydown="handleTyping" :disabled="loadingMessages || loadingSendMessage"
            class="-mb-1.5 pr-16 rounded-xl resize dark:placeholder:text-slate-400 dark:text-slate-200 scrollbar-custom"
            v-model="newMessage" placeholder="Escriba un mensaje..." maxlength="500" />
          <div class="absolute inset-y-0 right-0 flex items-center justify-center w-[3.8rem]">
            <button
              :class="`flex items-center justify-center border-transparent rounded-full w-9 h-9 box ${loadingMessages || loadingSendMessage ? ' cursor-not-allowed' : 'cursor-pointer'}`"
              @click="sendMessageToRecipient"
              :disabled="loadingMessages || loadingSendMessage || newMessage.trim() === ''">
              <Lucide v-if="!loadingMessages && !loadingSendMessage" icon="Send"
                class="stroke-[1.3] w-4 h-4 -ml-0.5 text-slate-500 dark:text-blue-400" />
              <LoadingIcon v-else icon="tail-spin" class="h-5" color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-if="selectedChatIndex === 'chats'" >
    <div class="flex flex-col w-full lg:w-2/3 lg:p-5 lg:pt-0 gap-y-7" >
      <div class="flex flex-col box box--stacked">
        <div class="flex items-center justify-center h-[728px]" id="diecisiete">
          <div class="text-slate-500 dark:text-slate-400 text-2xl">
            Seleccione un chat para empezar a chatear
          </div>
        </div>
      </div>
    </div>
  </template>

  <template v-if="selectedChatIndex === 'contacts'">
    <div class="flex flex-col w-full lg:w-2/3 lg:p-5 lg:pt-0 gap-y-7">
      <div class="flex flex-col box box--stacked">
        <div class="flex items-center justify-center h-[728px]">
          <div class="text-slate-500 dark:text-slate-400 text-2xl">
            Inicia un chat con tus contactos
          </div>
        </div>
      </div>
    </div>
  </template>

</template>