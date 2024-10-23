<script setup>
import { Chat, SectionSelect } from "@/components/ChatView/";
import { ref, onMounted, provide, onUnmounted, computed, watch, inject } from "vue";
import Button from "@/components/base/Button";


// Crear una variable reactiva para el chat seleccionado
const selectedChatIndex = ref('chats');

// Función para seleccionar un chat
const selectChat = (index) => {
  selectedChatIndex.value = index;
};


// si preciona esc deseleccionar el chat
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (selectedChatIndex.value === 'contacts') {
      selectedChatIndex.value = 'contacts';
      return
    }
    selectedChatIndex.value = 'chats';
  }
});

const { chats, messages, loadingChats, loadingMessages, newMessage } = inject("socket");

const selectChatInfo = computed(() => {
  return chats.value.find((chat) => chat.id === selectedChatIndex.value);
});

const messagesSelectChat = computed(() => {
  return messages.value.filter((message) => message.chat === selectedChatIndex.value);
})

// Proporcionar los datos de los chats
provide('selectChat', { selectChat, selectedChatIndex, selectChatInfo, messagesSelectChat });

</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="mt-3.5 flex flex-col lg:flex-row gap-y-10 gap-x-6">
        <SectionSelect />
        <Chat />
      </div>
    </div>
  </div>
</template>
