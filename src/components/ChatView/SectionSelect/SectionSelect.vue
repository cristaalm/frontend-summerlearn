<script setup lang="ts">
import { Tab } from "@/components/base/Headless";
import { ChatList, ContactList } from "@/components/ChatView/";
import { FormInput } from "@/components/base/Form";
import Lucide from "@/components/base/Lucide";
import { inject, ref, provide, onMounted, watch, nextTick } from "vue";

// Define la referencia del botón
const SelectSection = ref(null);

const btnSectionChat = () => {
    const button = SelectSection.value.querySelector('button');
    button.click();
}

// Proporciona la referencia
provide('btnSectionChat', { btnSectionChat });

// Simulación de selectChat para el ejemplo
const { selectChat } = inject("selectChat")




</script>

<template>
    <div class="w-full lg:w-1/3 flex-none">
        <Tab.Group class="flex flex-col gap-y-7">
            <div class="flex flex-col p-2 box box--stacked">
                <Tab.List variant="boxed-tabs" class="bg-transparent border-transparent">
                    <Tab
                        class="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current [&[aria-selected='true']_button]:text-primary dark:[&[aria-selected='true']_button]:text-slate-200 [&[aria-selected='true']_button]:font-medium [&[aria-selected='true']_button]:shadow-sm [&[aria-selected='true']_button]:bg-primary/[0.04] [&[aria-selected='true']_button]:border-primary/[0.15]">
                        <div ref="SelectSection">
                            <Tab.Button @click="selectChat('chats')"
                                class="w-full text-slate-500 whitespace-nowrap rounded-[0.6rem] py-3 flex items-center gap-2 justify-center"
                                as="button">
                                <Lucide icon="MessagesSquare" class="w-4 h-4 stroke-[1.4]" />
                                Chats
                            </Tab.Button>
                        </div>
                    </Tab>
                    <Tab
                        class="first:rounded-l-[0.6rem] last:rounded-r-[0.6rem] [&[aria-selected='true']_button]:text-current [&[aria-selected='true']_button]:text-primary dark:[&[aria-selected='true']_button]:text-slate-200 [&[aria-selected='true']_button]:font-medium [&[aria-selected='true']_button]:shadow-sm [&[aria-selected='true']_button]:bg-primary/[0.04] [&[aria-selected='true']_button]:border-primary/[0.15]">
                        <Tab.Button @click="() => { selectChat('contacts') }"
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
                        <div>
                            <div class="relative">
                                <Lucide icon="Search"
                                    class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-4 stroke-[1.3] text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                                <FormInput type="text" rounded placeholder="Buscar chat"
                                    class="pl-10 py-2.5 text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                            </div>
                            <div
                                class="flex flex-col gap-1 mt-4 max-h-[530px] overflow-y-auto overflow-x-hidden scrollbar-custom p-2">
                                <ChatList />
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
                <Tab.Panels>
                    <Tab.Panel>
                        <div>
                            <div class="relative">
                                <Lucide icon="Search"
                                    class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-4 stroke-[1.3] text-slate-500/90 dark:text-slate-200 dark:placeholder:text-slate-400" />
                                <FormInput type="text" rounded placeholder="Buscar contacto"
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
