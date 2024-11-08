<script setup>
import { Tab } from "@/components/base/Headless";
import { ChatList, ContactList } from "@/components/ChatView/";
import { FormInput } from "@/components/base/Form";
import Lucide from "@/components/base/Lucide";
import { inject, ref, provide, onMounted, watch, nextTick } from "vue";
import { useChatFilter } from "@/hooks/chat/filters/useChatFilter";
import { useContactFilter } from "@/hooks/chat/filters/useContactFilter";

// Simulación de selectChat para el ejemplo
const { selectChat } = inject("selectChat") || { selectChat: () => { } };
const { chats } = inject("socket") || { chats: ref([]) };
const { contacts } = inject("socket") || { contacts: ref([]) };

// Estados de búsqueda
const chatSearchText = ref("");
const contactSearchText = ref("");

// Aplicamos los filtros usando los hooks y pasamos las refs directamente
const { filteredChats } = useChatFilter(chats, chatSearchText);
const { filteredContacts } = useContactFilter(contacts, contactSearchText);

// Proporcionamos los datos filtrados a los componentes hijos
provide("filteredChats", { filteredChats });
provide("filteredContacts", { filteredContacts });

// Define la referencia del botón
const SelectSection = ref(null);

const btnSectionChat = () => {
    // @ts-ignore
    const button = SelectSection.value.querySelector('button');
    button.click();
}

// Proporciona la referencia
provide('btnSectionChat', { btnSectionChat });
</script>


<template>
    <div class="w-full lg:w-1/3 flex-none">
        <Tab.Group class="flex flex-col gap-y-7">
            <div class="flex flex-col p-2 box box--stacked" id="sectionSelect">
                <Tab.List variant="boxed-tabs" class="bg-transparent border-transparent">
                    <Tab>
                        <div ref="SelectSection">
                            <Tab.Button @click="selectChat('chats')"
                                class="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                                as="button">
                                <Lucide icon="MessagesSquare" class="w-4 h-4 stroke-[1.4]" />
                                Chats
                            </Tab.Button>
                        </div>
                    </Tab>
                    <Tab>
                        <div>
                            <Tab.Button @click="selectChat('contacts')"
                                class="w-full text-slate-500 dark:text-slate-400 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                                as="button">
                                <Lucide icon="UserPlus" class="w-4 h-4 stroke-[1.4]" />
                                Contactos
                            </Tab.Button>
                        </div>
                    </Tab>
                </Tab.List>
            </div>
            <div class="flex flex-col p-5 box box--stacked">
                <Tab.Panels>
                    <!-- Panel de Chats -->
                    <Tab.Panel>
                        <div>
                            <div class="relative" id="searchChat">
                                <Lucide icon="Search"
                                    class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-4 stroke-[1.3] text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                                <FormInput v-model="chatSearchText" type="text" rounded placeholder="Buscar chat"
                                    class="pl-10 py-2.5 text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                            </div>
                            <div id="chatList"
                                class="flex flex-col gap-1 mt-4 max-h-[530px] overflow-y-auto overflow-x-hidden scrollbar-custom p-2">
                                <ChatList />
                            </div>
                        </div>
                    </Tab.Panel>
                    <!-- Panel de Contactos -->
                    <Tab.Panel>
                        <div>
                            <div class="relative">
                                <Lucide icon="Search"
                                    class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-4 stroke-[1.3] text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                                <FormInput v-model="contactSearchText" type="text" rounded placeholder="Buscar contacto"
                                    class="pl-10 py-2.5 text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                            </div>
                            <div
                                class="flex flex-col gap-1 mt-4 max-h-[530px] overflow-y-auto overflow-x-hidden scrollbar-custom p-2">
                                <ContactList />
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </div>
        </Tab.Group>
    </div>
</template>