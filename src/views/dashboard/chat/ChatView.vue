<script setup>
import { Chat, SectionSelect } from "@/components/ChatView/";
import { ref, onMounted, provide, onUnmounted, computed, watch, inject } from "vue";
import Button from "@/components/base/Button";


// Crear una variable reactiva para el chat seleccionado
const selectedChatIndex = ref(null);

// Función para seleccionar un chat
const selectChat = (index) => {
  selectedChatIndex.value = index;
};

const section = ref("chats");
const changeSection = (newSection) => {
  section.value = newSection;
};


const { chats, messages, loadingChats, loadingMessages, newMessage } = inject("socket");

const selectChatInfo = computed(() => {
  return chats.value.find((chat) => chat.id === selectedChatIndex.value);
});

const messagesSelectChat = computed(() => {
  return messages.value.filter((message) => message.chat === selectedChatIndex.value);
})

// Proporcionar los datos de los chats

provide('section', { section, changeSection });
provide('selectChat', { selectChat, selectedChatIndex, selectChatInfo, messagesSelectChat });

const contactos = ref([ // contactos con los que no tiene chat
  {
    id: 1,
    name: "Eduarduar",
    role: "Coordinador",
    email: "eduardor@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 2,
    name: "Clara Mendez",
    role: "Voluntaria",
    email: "claram@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 3,
    name: "Mario Gomez",
    role: "Donante",
    email: "mariog@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 4,
    name: "Luis Garcia",
    role: "Beneficiario",
    email: "luisg@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 5,
    name: "Ana López",
    role: "Voluntaria",
    email: "anal@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 6,
    name: "Carlos Pérez",
    role: "Donante",
    email: "carlosp@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 7,
    name: "Gloria Diaz",
    role: "Coordinadora",
    email: "gloriad@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 8,
    name: "Fernando Ruiz",
    role: "Beneficiario",
    email: "fernandor@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 9,
    name: "Sandra Ortiz",
    role: "Voluntaria",
    email: "sandrao@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 10,
    name: "Jorge Hernandez",
    role: "Administrador",
    email: "jorgeh@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  },
  {
    id: 11,
    name: "Patricia Vargas",
    role: "Beneficiaria",
    email: "patriciav@mail.com",
    image: "http://localhost:8000/media/usersImages/76a3d577-e4f8-4e37-b5bc-0b899bdc13af.jpg"
  }
]);

provide('contactos', { contactos });
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
