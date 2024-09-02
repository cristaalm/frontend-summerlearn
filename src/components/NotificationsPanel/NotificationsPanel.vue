<script setup lang="ts">
import { Slideover } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";
import activities from "@/fakers/activities";
import users from "@/fakers/users";
import _ from "lodash";

interface MainProps {
  notificationsPanel: boolean;
  setNotificationsPanel: (val: boolean) => void;
}

const props = withDefaults(defineProps<MainProps>(), {
  notificationsPanel: false,
  setNotificationsPanel: () => {},
});
</script>

<template>
  <div>
    <Slideover
      :open="props.notificationsPanel"
      @close="
        () => {
          props.setNotificationsPanel(false);
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
              props.setNotificationsPanel(false);
            }
          "
        >
          <Lucide class="w-8 h-8 stroke-[1]" icon="X" />
        </a>
        <Slideover.Title class="px-6 py-5">
          <h2 class="mr-auto text-base font-medium">Notifications</h2>
          <Button variant="outline-secondary" class="hidden sm:flex">
            <Lucide icon="ShieldCheck" class="w-4 h-4 mr-2" /> Mark all as read
          </Button>
        </Slideover.Title>
        <Slideover.Description class="p-0">
          <div class="flex flex-col p-3 gap-0.5">
            <template
              v-for="(faker, fakerKey) in activities.fakeActivities()"
              :key="fakerKey"
            >
              <a
                href=""
                class="flex items-center px-3 py-2.5 rounded-xl hover:bg-slate-100/80"
              >
                <div>
                  <div
                    class="overflow-hidden border-2 rounded-full w-11 h-11 image-fit border-slate-200/70"
                  >
                    <img
                      alt="Tailwise - Admin Dashboard Template"
                      :src="users.fakeUsers()[0].photo"
                    />
                  </div>
                </div>
                <div class="sm:ml-5">
                  <div class="font-medium">{{ faker.activity }}</div>
                  <div class="text-slate-500 mt-0.5">
                    {{ faker.activityDetails }}
                  </div>
                  <template v-if="faker.images">
                    <div
                      class="w-40 sm:w-56 my-3.5 p-1 border rounded-[0.6rem] bg-slate-50/80"
                    >
                      <div
                        class="grid grid-cols-3 overflow-hidden rounded-[0.6rem]"
                      >
                        <div
                          class="h-12 sm:h-16 overflow-hidden border image-fit border-slate-100 saturate-[.6] hover:saturate-100 cursor-pointer"
                        >
                          <img
                            alt="Tailwise - Admin Dashboard Template"
                            :src="faker.images[0]"
                          />
                        </div>
                        <div
                          class="h-12 sm:h-16 overflow-hidden border image-fit border-slate-100 saturate-[.6] hover:saturate-100 cursor-pointer"
                        >
                          <img
                            alt="Tailwise - Admin Dashboard Template"
                            :src="faker.images[1]"
                          />
                        </div>
                        <div
                          class="h-12 sm:h-16 overflow-hidden border image-fit border-slate-100 saturate-[.6] hover:saturate-100 cursor-pointer"
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
                <template v-if="_.random(0, 1) == 1">
                  <div
                    class="flex-none w-2 h-2 ml-auto border rounded-full bg-primary/40 border-primary/40"
                  ></div>
                </template>
              </a>
            </template>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  </div>
</template>
