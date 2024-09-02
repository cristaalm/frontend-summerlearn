<script setup lang="ts">
import { Slideover } from "@/components/Base/Headless";
import { Menu } from "@/components/Base/Headless";
import Lucide from "@/components/Base/Lucide";
import activities from "@/fakers/activities";
import FileIcon from "@/components/Base/FileIcon";
import _ from "lodash";

interface MainProps {
  activitiesPanel: boolean;
  setActivitiesPanel: (val: boolean) => void;
}

const props = withDefaults(defineProps<MainProps>(), {
  activitiesPanel: false,
  setActivitiesPanel: () => {},
});
</script>

<template>
  <div>
    <Slideover
      :open="props.activitiesPanel"
      @close="
        () => {
          props.setActivitiesPanel(false);
        }
      "
    >
      <Slideover.Panel
        class="w-72 rounded-[0.75rem_0_0_0.75rem/1.1rem_0_0_1.1rem]"
      >
        <a
          href=""
          class="focus:outline-none hover:bg-white/10 bg-white/5 transition-all hover:rotate-180 absolute inset-y-0 left-0 right-auto flex items-center justify-center my-auto -ml-[60px] sm:-ml-[105px] border rounded-full text-white/90 w-8 h-8 sm:w-14 sm:h-14 border-white/90 hover:scale-105"
          @click="
            (e) => {
              e.preventDefault();
              props.setActivitiesPanel(false);
            }
          "
        >
          <Lucide class="w-8 h-8 stroke-[1]" icon="X" />
        </a>
        <Slideover.Title class="px-6 py-5">
          <h2 class="mr-auto text-base font-medium">Latest Activities</h2>
        </Slideover.Title>
        <Slideover.Description class="p-0">
          <div class="px-5 py-3 flex flex-col gap-3.5">
            <div
              class="relative overflow-hidden before:content-[''] before:absolute before:w-px before:bg-slate-200/60 before:left-0 before:inset-y-0 before:dark:bg-darkmode-400 before:ml-[14px]"
            >
              <template
                v-for="(faker, fakerKey) in _.take(
                  activities.fakeActivities(),
                  5
                )"
                :key="fakerKey"
              >
                <div
                  :class="[
                    'mb-3 last:mb-0 relative',
                    'first:before:content-[\'\'] first:before:h-1/2 first:before:w-5 first:before:bg-white first:before:absolute',
                    'last:after:content-[\'\'] last:after:h-1/2 last:after:w-5 last:after:bg-white last:after:absolute last:after:bottom-0',
                  ]"
                >
                  <div
                    :class="[
                      'px-4 py-3 ml-8',
                      'before:content-[\'\'] before:ml-1 before:absolute before:w-5 before:h-5 before:bg-slate-200 before:rounded-full before:inset-y-0 before:my-auto before:left-0 before:dark:bg-darkmode-300 before:z-10',
                      'after:content-[\'\'] after:absolute after:w-1.5 after:h-1.5 after:bg-slate-500 after:rounded-full after:inset-y-0 after:my-auto after:left-0 after:ml-[11px] after:dark:bg-darkmode-200 after:z-10',
                    ]"
                  >
                    <a href="" class="font-medium text-primary">
                      {{ faker.activity }}
                    </a>
                    <div
                      class="flex flex-col sm:flex-row sm:items-center gap-y-1.5 mt-1.5 leading-relaxed text-slate-500 text-[0.8rem]"
                    >
                      {{ faker.activityDetails }}
                      <span
                        :class="[
                          'group flex items-center text-xs font-medium rounded-md sm:ml-2 border px-1.5 py-px mr-auto sm:mr-0',
                          '[&.primary]:text-primary [&.primary]:bg-primary/10 [&.primary]:border-primary/10',
                          '[&.success]:text-success [&.success]:bg-success/10 [&.success]:border-success/10',
                          '[&.warning]:text-warning [&.warning]:bg-warning/10 [&.warning]:border-warning/10',
                          '[&.info]:text-info [&.info]:bg-info/10 [&.info]:border-info/10',
                          ['primary', 'success', 'warning', 'info'][
                            _.random(0, 3)
                          ],
                        ]"
                      >
                        <span
                          class="w-1.5 h-1.5 mr-1.5 rounded-full group-[.success]:bg-success/80 group-[.primary]:bg-primary/80 group-[.warning]:bg-warning/80 group-[.info]:bg-info/80"
                        ></span>
                        <span class="-mt-px">{{ faker.statusBadge }}</span>
                      </span>
                    </div>
                    <template v-if="faker.uploadedFiles">
                      <div class="grid grid-cols-1 gap-4 my-3.5">
                        <template
                          v-for="(file, fileKey) in faker.uploadedFiles"
                          :key="fakerKey"
                        >
                          <div
                            class="flex items-center pl-5 pr-2.5 py-4 border rounded-[0.6rem] border-slate-200/80 bg-slate-50/70"
                          >
                            <FileIcon
                              class="hidden w-10 sm:block"
                              variant="directory"
                            />
                            <div class="sm:ml-3.5 mr-auto">
                              <div
                                class="max-w-[8rem] font-medium truncate text-primary"
                              >
                                {{ file.filename }}
                              </div>
                              <div class="mt-1 text-xs text-slate-500">
                                {{ file.size }}
                              </div>
                            </div>
                            <Menu>
                              <Menu.Button class="w-5 h-5 text-slate-500">
                                <Lucide icon="MoreVertical" class="w-4 h-4" />
                              </Menu.Button>
                              <Menu.Items class="w-40">
                                <Menu.Item>
                                  <Lucide icon="Copy" class="w-4 h-4 mr-2" />
                                  Copy Link
                                </Menu.Item>
                                <Menu.Item>
                                  <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                                  Delete
                                </Menu.Item>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </template>
                      </div>
                    </template>
                    <template v-if="faker.images">
                      <div
                        class="w-40 sm:w-[80%] my-3.5 p-1 border rounded-[0.6rem] bg-slate-50/80"
                      >
                        <div
                          class="grid grid-cols-3 overflow-hidden rounded-[0.6rem]"
                        >
                          <div
                            class="h-12 sm:h-20 overflow-hidden border image-fit border-slate-100 saturate-[.6] hover:saturate-100 cursor-pointer"
                          >
                            <img
                              alt="Tailwise - Admin Dashboard Template"
                              :src="faker.images[0]"
                            />
                          </div>
                          <div
                            class="h-12 sm:h-20 overflow-hidden border image-fit border-slate-100 saturate-[.6] hover:saturate-100 cursor-pointer"
                          >
                            <img
                              alt="Tailwise - Admin Dashboard Template"
                              :src="faker.images[1]"
                            />
                          </div>
                          <div
                            class="h-12 sm:h-20 overflow-hidden border image-fit border-slate-100 saturate-[.6] hover:saturate-100 cursor-pointer"
                          >
                            <img
                              alt="Tailwise - Admin Dashboard Template"
                              :src="faker.images[2]"
                            />
                          </div>
                        </div>
                      </div>
                    </template>
                    <div class="mt-1.5 text-xs text-slate-500">
                      {{ faker.date }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  </div>
</template>
