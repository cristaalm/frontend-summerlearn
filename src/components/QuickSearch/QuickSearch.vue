<script setup lang="ts">
// import users from "@/fakers/users";
import departments from "@/fakers/departments";
import products from "@/fakers/products";
import { Menu } from "@/components/base/Headless";
import Lucide from "@/components/base/Lucide";
import { FormInput } from "@/components/base/Form";
import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import { onMounted, ref } from "vue";
import _ from "lodash";

interface MainProps {
  quickSearch: boolean;
  setQuickSearch: (val: boolean) => void;
}

const props = withDefaults(defineProps<MainProps>(), {
  quickSearch: false,
  setQuickSearch: () => {},
});

const search = ref("");

onMounted(() => {
  document.onkeydown = function (evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      props.setQuickSearch(false);
    } else if ((evt.ctrlKey || evt.metaKey) && evt.key === "k") {
      props.setQuickSearch(true);
    }
  };
});
</script>

<template>
  <TransitionRoot appear :show="props.quickSearch" as="template">
    <HeadlessDialog
      as="div"
      class="relative z-[60]"
      @close="props.setQuickSearch"
    >
      <TransitionChild
        as="div"
        enter="ease-out duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gradient-to-b from-theme-1/50 via-theme-2/50 to-black/50 backdrop-blur-sm"
        />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex justify-center my-2 sm:mt-40">
          <TransitionChild
            as="div"
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="sm:w-[600px] lg:w-[700px] w-[95%] relative mx-auto transition-transform"
            >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center justify-center w-12"
                >
                  <Lucide
                    icon="Search"
                    class="w-5 h-5 -mr-1.5 text-slate-500 stroke-[1]"
                  />
                </div>
                <FormInput
                  class="pl-12 pr-14 py-3.5 text-base rounded-lg focus:ring-0 border-0 shadow-lg"
                  type="text"
                  placeholder="Quick search..."
                  v-model="search"
                />
                <div class="absolute inset-y-0 right-0 flex items-center w-14">
                  <div
                    class="px-2 py-1 mr-auto text-xs border rounded-[0.4rem] bg-slate-100 text-slate-500/80"
                  >
                    ESC
                  </div>
                </div>
              </div>
              <div
                class="relative z-10 pb-1 mt-1 bg-white rounded-lg shadow-lg max-h-[468px] sm:max-h-[615px] overflow-y-auto"
              >
                <template v-if="search.length > 3">
                  <div
                    class="flex flex-col items-center justify-center pt-20 pb-28"
                  >
                    <Lucide
                      icon="SearchX"
                      class="w-20 h-20 text-theme-1/20 fill-theme-1/5 stroke-[0.5]"
                    />
                    <div class="mt-5 text-xl font-medium">No result found</div>
                    <div
                      class="w-2/3 mt-3 leading-relaxed text-center text-slate-500"
                    >
                      No results found for
                      <span class="italic font-medium">"{{ search }}</span>
                      ". Please try a different search term or check your
                      spelling.
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div>
                    <div class="px-5 py-4">
                      <div class="flex items-center">
                        <div class="text-xs uppercase text-slate-500">
                          Start your search here...
                        </div>
                      </div>
                      <div class="flex flex-wrap gap-2 mt-3.5">
                        <a
                          href=""
                          class="flex items-center gap-x-1.5 border rounded-full px-3 py-0.5 border-slate-300/70 hover:bg-slate-50"
                        >
                          <Lucide
                            icon="UsersRound"
                            class="w-4 h-4 stroke-[1.3]"
                          />
                          Users
                        </a>
                        <a
                          href=""
                          class="flex items-center gap-x-1.5 border rounded-full px-3 py-0.5 border-slate-300/70 hover:bg-slate-50"
                        >
                          <Lucide
                            icon="Building2"
                            class="w-4 h-4 stroke-[1.3]"
                          />
                          Departments
                        </a>
                        <a
                          href=""
                          class="flex items-center gap-x-1.5 border rounded-full px-3 py-0.5 border-slate-300/70 hover:bg-slate-50"
                        >
                          <Lucide
                            icon="KanbanSquare"
                            class="w-4 h-4 stroke-[1.3]"
                          />
                          Products
                        </a>
                        <a
                          href=""
                          class="flex items-center gap-x-1.5 border rounded-full px-3 py-0.5 border-slate-300/70 hover:bg-slate-50"
                        >
                          <Lucide
                            icon="MailCheck"
                            class="w-4 h-4 stroke-[1.3]"
                          />
                          Mails
                        </a>
                        <Menu>
                          <Menu.Button
                            as="a"
                            class="flex items-center gap-x-1.5 border rounded-full px-3 py-0.5 border-slate-300/70 hover:bg-slate-50"
                          >
                            More
                            <Lucide
                              icon="ChevronDown"
                              class="w-4 h-4 stroke-[1.3] -ml-0.5"
                            />
                          </Menu.Button>
                          <Menu.Items class="w-40">
                            <Menu.Item>
                              <Lucide icon="Map" class="w-4 h-4 mr-2" />
                              Locations
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide icon="FileCheck" class="w-4 h-4 mr-2" />
                              Projects
                            </Menu.Item>
                            <Menu.Item>
                              <Lucide icon="Printer" class="w-4 h-4 mr-2" />
                              Devices
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>
                    <div class="px-5 py-4 border-t border-dashed">
                      <div class="flex items-center">
                        <div class="text-xs uppercase text-slate-500">
                          Users
                        </div>
                        <a class="ml-auto text-xs text-slate-500" href="">
                          See All
                        </a>
                      </div>
                      <div class="flex flex-col gap-1 mt-3.5">
                        <!-- <template
                          v-for="(faker, fakerKey) in _.take(
                            users.fakeUsers(),
                            3
                          )"
                          :key="fakerKey"
                        >
                          <a
                            href=""
                            class="flex items-center gap-2.5 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 p-1 rounded-md"
                          >
                            <div
                              class="w-6 h-6 overflow-hidden border-2 rounded-full image-fit zoom-in border-slate-200/70 box"
                            >
                              <img
                                alt="Tailwise - Admin Dashboard Template"
                                :src="faker.photo"
                              />
                            </div>
                            <div class="font-medium truncate">
                              {{ faker.name }}
                            </div>
                            <div class="hidden text-slate-500 sm:block">
                              {{ faker.location }}
                            </div>
                          </a>
                        </template> -->
                      </div>
                    </div>
                    <div class="px-5 py-4 border-t border-dashed">
                      <div class="flex items-center">
                        <div class="text-xs uppercase text-slate-500">
                          Departments
                        </div>
                        <a class="ml-auto text-xs text-slate-500" href="">
                          See All
                        </a>
                      </div>
                      <div class="flex flex-col gap-1 mt-3.5">
                        <template
                          v-for="(faker, fakerKey) in _.take(
                            departments.fakeDepartments(),
                            3
                          )"
                          :key="fakerKey"
                        >
                          <a
                            href=""
                            class="flex items-center gap-2.5 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 p-1 rounded-md"
                          >
                            <div
                              class="flex items-center justify-center w-6 h-6 overflow-hidden border rounded-md zoom-in border-theme-1/10 box bg-theme-1/10"
                            >
                              <template v-if="_.random(0, 1)">
                                <Lucide
                                  icon="Store"
                                  class="w-3.5 h-3.5 stroke-[1.3] text-theme-1"
                                />
                              </template>
                              <template v-else>
                                <Lucide
                                  icon="Hotel"
                                  class="w-3.5 h-3.5 stroke-[1.3] text-theme-1"
                                />
                              </template>
                            </div>
                            <div class="font-medium truncate">
                              {{ faker.name }}
                            </div>
                            <div class="hidden text-slate-500 sm:block">
                              {{ faker.location.name }}
                            </div>
                          </a>
                        </template>
                      </div>
                    </div>
                    <div class="px-5 py-4 border-t border-dashed">
                      <div class="flex items-center">
                        <div class="text-xs uppercase text-slate-500">
                          Products
                        </div>
                        <a class="ml-auto text-xs text-slate-500" href="">
                          See All
                        </a>
                      </div>
                      <div class="flex flex-col gap-1 mt-3.5">
                        <template
                          v-for="(faker, fakerKey) in _.take(
                            products.fakeProducts(),
                            3
                          )"
                          :key="fakerKey"
                        >
                          <a
                            href=""
                            class="flex items-center gap-2.5 hover:bg-slate-50/80 border border-transparent hover:border-slate-100 p-1 rounded-md"
                          >
                            <div
                              class="w-6 h-6 overflow-hidden border-2 rounded-full image-fit zoom-in border-slate-200/70 box"
                            >
                              <img
                                alt="Tailwise - Admin Dashboard Template"
                                :src="faker.images[0].path"
                              />
                            </div>
                            <div class="font-medium truncate">
                              {{ faker.name }}
                            </div>
                            <div class="hidden text-slate-500 sm:block">
                              {{ faker.category.name }}
                            </div>
                          </a>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </HeadlessDialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
</template>
