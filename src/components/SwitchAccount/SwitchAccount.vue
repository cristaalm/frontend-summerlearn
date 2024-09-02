<script setup lang="ts">
import users from "@/fakers/users";
import Lucide from "@/components/Base/Lucide";
import { FormCheck } from "@/components/Base/Form";
import { Dialog } from "@/components/Base/Headless";
import { ref } from "vue";
import _ from "lodash";

interface MainProps {
  switchAccount: boolean;
  setSwitchAccount: (val: boolean) => void;
}

const props = withDefaults(defineProps<MainProps>(), {
  switchAccount: false,
  setSwitchAccount: () => {},
});

const switchAccount = ref(0);
</script>

<template>
  <Dialog
    :open="props.switchAccount"
    @close="
      () => {
        props.setSwitchAccount(false);
      }
    "
  >
    <Dialog.Panel>
      <Dialog.Title class="justify-center h-14">
        <h2 class="text-base font-medium">Switch Account</h2>
      </Dialog.Title>
      <Dialog.Description class="px-2.5 pt-3.5 pb-4">
        <div class="flex flex-col gap-1.5">
          <template
            v-for="(faker, fakerKey) in _.take(users.fakeUsers(), 5)"
            :key="fakerKey"
          >
            <FormCheck.Label
              :for="'switch-account-' + fakerKey"
              class="flex items-center px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <div
                class="overflow-hidden rounded-full w-11 h-11 image-fit border-[3px] border-slate-200/70"
              >
                <img
                  alt="Tailwise - Admin Dashboard Template"
                  :src="faker.photo"
                />
              </div>
              <div class="ml-3.5">
                <div class="font-medium">{{ faker.name }}</div>
                <div class="text-xs text-slate-500 mt-0.5">
                  {{ faker.email }}
                </div>
              </div>
              <div class="relative ml-auto w-7 h-7">
                <FormCheck.Input
                  :id="'switch-account-' + fakerKey"
                  type="checkbox"
                  value="switch-account"
                  :checked="switchAccount === fakerKey"
                  @change="
                    () => {
                      switchAccount = fakerKey;
                    }
                  "
                  class="absolute z-10 w-full h-full opacity-0 peer"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center w-6 h-6 m-auto text-white transition-all border rounded-full opacity-0 bg-theme-1/80 border-theme-1 peer-checked:opacity-100"
                >
                  <Lucide icon="Check" class="stroke-[1.5] w-3 h-3" />
                </div>
                <div
                  class="absolute inset-0 flex items-center justify-center w-6 h-6 m-auto transition-all border rounded-full text-primary border-theme-1/20 bg-theme-1/5 peer-checked:opacity-0 peer-hover:bg-theme-1/10"
                ></div>
              </div>
            </FormCheck.Label>
          </template>
        </div>
      </Dialog.Description>
      <Dialog.Footer class="flex items-center justify-center text-center h-14">
        <a href="" class="block -mt-1 text-primary">
          Login into an Existing Account
        </a>
      </Dialog.Footer>
    </Dialog.Panel>
  </Dialog>
</template>
