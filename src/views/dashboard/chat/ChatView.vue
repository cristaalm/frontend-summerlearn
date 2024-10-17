<script setup lang="ts">
import { FormInput, FormTextarea } from "@/components/base/Form";
import { Chat, Chats } from "@/components/ChatView/";
import { ref, onMounted, provide } from "vue";
import { Tab } from "@/components/base/Headless";
import { formatMessageDate } from "@/utils/formatDate";
import Lucide from "@/components/base/Lucide";
import Button from "@/components/base/Button";
import { useChats } from '@/hooks/chat';

const { chats, loadingChats, errorChats, loadChats } = useChats();
provide('chats', { chats, loadingChats, errorChats, loadChats });

onMounted(() => {
  loadChats();
});


const section = ref("chats");
const changeSection = (newSection: string) => {
  section.value = newSection;
};


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

</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="mt-3.5 flex flex-col lg:flex-row gap-y-10 gap-x-6">
        <div class="w-full lg:w-1/3 flex-none">
          <Tab.Group class="flex flex-col gap-y-7">
            <div class="flex flex-col p-2 box box--stacked">
              <Tab.List variant="boxed-tabs" class="bg-transparent border-transparent">
                <Tab
                  class="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current [&[aria-selected='true']_button]:text-primary dark:[&[aria-selected='true']_button]:text-slate-200 [&[aria-selected='true']_button]:font-medium [&[aria-selected='true']_button]:shadow-sm [&[aria-selected='true']_button]:bg-primary/[0.04] [&[aria-selected='true']_button]:border-primary/[0.15]">
                  <Tab.Button @click="changeSection('chats')"
                    class="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                    as="button">
                    <Lucide icon="MessagesSquare" class="w-4 h-4 stroke-[1.4]" />
                    Chats
                  </Tab.Button>
                </Tab>
                <Tab
                  class="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current [&[aria-selected='true']_button]:text-primary [&[aria-selected='true']_button]:font-medium [&[aria-selected='true']_button]:shadow-sm [&[aria-selected='true']_button]:bg-primary/[0.04] [&[aria-selected='true']_button]:border-primary/[0.15]">
                  <Tab.Button @click="changeSection('contacts')"
                    class="w-full text-slate-500 dark:text-slate-400 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                    as="button">
                    <Lucide icon="UserPlus" class="w-4 h-4 stroke-[1.4]" />
                    Contactos
                  </Tab.Button>
                </Tab>
              </Tab.List>
            </div>
            <div class="flex flex-col p-5 box box--stacked">
              <Tab.Panels>
                <Tab.Panel>
                  <div class="">
                    <div class="relative">
                      <Lucide icon="Search"
                        class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-4 stroke-[1.3] text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                      <FormInput type="text" rounded placeholder="Buscar chat"
                        class="pl-10 py-2.5 text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                    </div>
                    <div
                      class="flex flex-col gap-1 mt-4 max-h-[530px] overflow-y-scroll overflow-x-hidden scrollbar-custom p-2">
                      <template v-if="section === 'chats'">
                        <Chats />
                      </template>

                      <template v-if="section === 'contacts'">
                        <template v-for="(contact, index) in contactos" :key="index">
                          <div
                            class="flex items-center gap-4 px-2 py-2.5 -mx-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600">
                            <div class="relative">
                              <div
                                class="w-12 h-12 overflow-hidden border-2 rounded-full image-fit border-slate-200/70">
                                <img alt="Tailwise - Admin Dashboard Template" :src="contact.image" />
                              </div>
                            </div>
                            <div class="w-full">
                              <div class="flex items-center w-full">
                                <div
                                  class="font-medium max-w-[7rem] md:max-w-[8rem] truncate text-black dark:text-slate-200">
                                  {{ contact.name }}
                                </div>
                                <div class="flex items-center gap-2 ml-auto">
                                  <div class="text-xs text-slate-400/90">
                                    {{ contact.role }}
                                  </div>
                                </div>
                              </div>
                              <div class="flex items-center mt-1.5">
                                <div
                                  class="text-slate-500/90 max-w-[7rem] md:max-w-[10rem] truncate dark:text-slate-400">
                                  {{ contact.email }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </template>

                        <!-- si no hay contactos mostramos un mensaje que anime a escribir -->

                        <div v-if="contactos && contactos.length === 0"
                          class="flex items-center justify-center h-[530px]">
                          <div class="text-slate-500 dark:text-slate-400">
                            No hay contactos, ¡añade uno!
                          </div>
                        </div>

                      </template>


                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
        <Chat />
      </div>
    </div>
  </div>
</template>
