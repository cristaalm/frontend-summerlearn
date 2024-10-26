<script setup>
import { inject, ref, watch } from "vue";
import { Baseurl } from "@/utils/global";
import LoadingIcon from '@/components/base/LoadingIcon';
import Lucide from "@/components/base/Lucide";
import Tippy from "@/components/base/Tippy";

// Inyectar los datos de los contacts
const { contacts, loadingContacts, chats } = inject("socket");
const { selectChat } = inject("selectChat");
const { btnSectionChat } = inject('btnSectionChat');
const showToast = inject('showToast')

const changeContactToChat = ({ contact }) => {
    // verificamos si el contacto ya esta en la lista de chats
    const chat = chats.value.find((c) => c.id === contact.id);
    if (!chat) {
        // si no esta, lo agregamos de forma visual
        chats.value.unshift(contact); // Agregamos el contacto a la lista de chats
    }
    // cambiamos de seccion y seleccionamos el chat correspondiente
    btnSectionChat();
    selectChat(contact.id);
}

const copiedEmail = (email) => {
    navigator.clipboard.writeText(email)
        .then(() => {
            showToast({ message: "Correo copiado al portapapeles", tipo: "info" });
        })
        .catch(() => {
            showToast({ message: "Error al copiar el correo al portapapeles", tipo: "error" });
        });
};

</script>

<template>
    <template v-if="!loadingContacts && contacts.length > 0">
        <div class="h-[530px] gap-1 flex flex-col">
            <template v-for="contact in contacts" :key="contact.id">
                <div :class="'hover:bg-slate-200 dark:hover:bg-slate-600'"
                    class="flex items-center gap-4 px-2 py-2.5 -mx-2 rounded-lg cursor-pointer transition-all duration-300">
                    <div class="relative">
                        <div class="w-12 h-12 overflow-hidden border-2 rounded-full image-fit border-slate-200/70">
                            <img alt="Tailwise - Admin Dashboard Template"
                                :src="`${Baseurl}${contact.user.userPhoto}`" />
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex items-center w-full">
                            <div
                                class="font-medium max-w-[10rem] md:max-w-[12rem] truncate text-black dark:text-slate-200">
                                {{ contact.user.name }}
                            </div>
                        </div>
                        <div class="flex items-center mt-1.5">
                            <div class="text-slate-500/90 max-w-[9rem] md:max-w-[12rem] truncate dark:text-slate-400">
                                {{ contact.user.rol }}
                            </div>
                        </div>
                    </div>
                    <div class="relative flex flex-row gap-2">
                        <Tippy as="button" @click="() => { copiedEmail(contact.user.email) }"
                            class="flex items-center justify-center border rounded-full w-9 h-9 border-primary/30 dark:border-slate-200/30 bg-primary/5 dark:bg-slate-200/5 dark:hover:bg-slate-900 dark:hover:text-slate-200 transition-all duration-300"
                            :content="contact.user.email">
                            <Lucide icon="Mail" class="w-4 h-4 text-primary dark:text-slate-200 fill-primary/10" />
                        </Tippy>
                        <Tippy as="button" @click="() => { changeContactToChat({ contact }) }"
                            class="flex items-center justify-center border rounded-full w-9 h-9 border-primary/30 dark:border-slate-200/30 bg-primary/5 dark:bg-slate-200/5 dark:hover:bg-slate-900 dark:hover:text-slate-200 transition-all duration-300"
                            content="Comenzar chat">
                            <Lucide icon="Send"
                                class="w-4 h-4 text-primary dark:text-slate-200 fill-primary/10 -ml-[2px] -mb-[2px]" />
                        </Tippy>
                    </div>
                </div>
            </template>
        </div>
    </template>
    <template v-if="!loadingContacts && contacts.length === 0">
        <div class="flex items-center justify-center h-[530px]">
            <div class="text-slate dark:text-slate-400">
                No tienes mas contactos con los cuales crear un chat
            </div>
        </div>
    </template>

    <template v-if="loadingContacts">
        <div class="flex items-center justify-center h-[530px]">
            <LoadingIcon icon="tail-spin" class="h-8" color="black" />
        </div>
    </template>

</template>
