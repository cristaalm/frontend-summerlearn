<script setup lang="ts">
import { Tab } from "@/components/base/Headless";
import { ChatList } from "@/components/ChatView/";
import { FormInput, FormTextarea } from "@/components/base/Form";
import Lucide from "@/components/base/Lucide";
import { inject } from "vue";

interface SectionContext {
    section: string;
    changeSection: (section: string) => void;
}
interface Contact {
    contactos: {
        id: number;
        name: string;
        role: string;
        email: string;
        image: string;
    }[];
}

const { section, changeSection } = inject<SectionContext>("section")!;

const { contactos } = inject<Contact>("contactos")!;


</script>

<template>
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
                                class="flex flex-col gap-1 mt-4 max-h-[530px] overflow-y-auto overflow-x-hidden scrollbar-custom p-2">
                                <template v-if="section == 'chats'">
                                    <ChatList />
                                </template>

                                <template v-else>
                                    <template>
                                        <div v-for="(contact, index) in contactos" :key="contact.id"
                                            class="flex items-center gap-4 px-2 py-2.5 -mx-2 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600">
                                            <div class="relative">
                                                <div
                                                    class="w-12 h-12 overflow-hidden border-2 rounded-full image-fit border-slate-200/70">
                                                    <img alt="Tailwise - Admin Dashboard Template"
                                                        :src="contact.image" />
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
</template>