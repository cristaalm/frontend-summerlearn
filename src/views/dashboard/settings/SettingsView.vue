<!-- path: @/views/dashboard/settings/SettingsView.vue -->

<script setup>
import { ToastNotification, useToast } from '@/components/ToastNotification'
import Litepicker from '@/components/base/Litepicker'
import TomSelect from '@/components/base/TomSelect'
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import { SettingsMenu, SettingsHero } from './components/'
import { FormInput, FormSelect, FormCheck } from "@/components/base/Form";
import { useUser } from "@/hooks/settings/";
import { useRoute } from 'vue-router'
import { ref, onMounted, watch, computed } from 'vue'

const page = ref(null);
const { toastMessages, showToast } = useToast();
const { user, loadingUser, errorUser, loadUser } = useUser();
const selectedCountry = ref("1");
const dateOfBirth = ref("");

const route = useRoute();

watch(errorUser, (newError) => {
  if (newError) {
    showToast({ message: 'Error al cargar la información, Intentelo mas tarde.', tipo: 'error' });
  }
});

watch(
  computed(() => route),
  () => {
    const queryParams = new URLSearchParams(window.location.search);
    page.value = queryParams.get("page");
  },
  { deep: true }
);

onMounted(() => {
  if (page.value === null) {
    loadUser()
  }
});

</script>
<template>
  <!--? ######################## TOAST NOTIFICATION ######################## -->

  <div class="fixed right-22 p-4 transition-opacity duration-300 top-[110px] z-50 flex flex-col gap-3">
    <ToastNotification v-for="(message, index) in toastMessages" :key="index" :message="message" />
  </div>

  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">
          Configuración de la Cuenta
        </div>
      </div>
      <div class="mt-3.5 grid grid-cols-12 gap-y-10 gap-x-6">

        <!--? ################################ MENU ################################ -->

        <SettingsMenu />


        <div class="flex flex-col col-span-12 xl:col-span-9 gap-y-7">

          <!--? ################################ HERO ################################ -->

          <!-- * Imagen del usuario * -->
          <SettingsHero :loading="loadingUser" :error="errorUser ? true : false"
            :imageUser="user?.photo ?? '/media/usersImages/placeholderUser.jpg'" :showToast="showToast" />


          <template v-if="page === null && !loadingUser">
            <div class="flex flex-col p-5 box box--stacked">
              <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
                Profile Info
              </div>
              <div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Full Name</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Enter your full legal name as it appears on your
                        official identification.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-col items-center md:flex-row">
                      <FormInput type="text"
                        class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10" />
                      <FormInput type="text"
                        class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10" />
                    </div>
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Date of Birth</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        This information is required to verify your age and
                        provide age-appropriate services.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <Litepicker v-model="dateOfBirth" :options="{
                      autoApply: false,
                      dropdowns: {
                        minYear: 1990,
                        maxYear: null,
                        months: true,
                        years: true,
                      },
                    }" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Gender</div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Select your gender from the options.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-col items-center md:flex-row">
                      <div
                        class="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                        <FormCheck>
                          <FormCheck.Input id="checkbox-switch-1" type="radio" value="" />
                          <FormCheck.Label htmlFor="checkbox-switch-1">
                            Male
                          </FormCheck.Label>
                        </FormCheck>
                      </div>
                      <div
                        class="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                        <FormCheck>
                          <FormCheck.Input id="checkbox-switch-2" type="radio" value="" />
                          <FormCheck.Label htmlFor="checkbox-switch-2">
                            Female
                          </FormCheck.Label>
                        </FormCheck>
                      </div>
                      <div
                        class="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                        <FormCheck>
                          <FormCheck.Input id="checkbox-switch-3" type="radio" value="" />
                          <FormCheck.Label htmlFor="checkbox-switch-3">
                            Prefer Not to Say
                          </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Email</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Please provide a valid email address that you have
                        access to.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput type="text" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Phone Number</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Please provide a valid phone number where we can reach
                        you if needed.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-col items-center md:flex-row">
                      <FormInput type="text"
                        class="first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10" />
                      <FormSelect
                        class="md:w-36 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                        <option value="office">Office</option>
                        <option value="home">Home</option>
                      </FormSelect>
                    </div>
                    <a class="flex items-center mt-3.5 -mb-1 font-medium text-primary" href="">
                      <Lucide class="w-4 h-4 stroke-[1.3] mr-1" icon="Plus" />
                      Add phone
                    </a>
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Department</div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Choose your department or division from the list of
                        available options.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormSelect>
                      <option value="engineering">Engineering</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                    </FormSelect>
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Account Type</div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Your account type determines the features and privileges
                        you will have on this platform.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <div class="flex flex-col items-center md:flex-row">
                      <div
                        class="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                        <FormCheck>
                          <FormCheck.Input id="checkbox-switch-4" type="radio" value="" />
                          <FormCheck.Label htmlFor="checkbox-switch-4">
                            Individual
                          </FormCheck.Label>
                        </FormCheck>
                      </div>
                      <div
                        class="bg-white w-full px-3 py-2 border rounded-md shadow-sm border-slate-300/60 first:rounded-b-none first:md:rounded-bl-md first:md:rounded-r-none [&:not(:first-child):not(:last-child)]:-mt-px [&:not(:first-child):not(:last-child)]:md:mt-0 [&:not(:first-child):not(:last-child)]:md:-ml-px [&:not(:first-child):not(:last-child)]:rounded-none last:rounded-t-none last:md:rounded-l-none last:md:rounded-tr-md last:-mt-px last:md:mt-0 last:md:-ml-px focus:z-10">
                        <FormCheck>
                          <FormCheck.Input id="checkbox-switch-5" type="radio" value="" />
                          <FormCheck.Label htmlFor="checkbox-switch-5">
                            Company
                          </FormCheck.Label>
                        </FormCheck>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Country</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Please specify the country you are currently residing
                        in.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <TomSelect v-model="selectedCountry" :options="{
                      placeholder: 'Select your country',
                    }" class="w-full">
                      <option value="united-states">United States</option>
                      <option value="canada">Canada</option>
                      <option value="mexico">Mexico</option>
                      <option value="united-kingdom">United Kingdom</option>
                      <option value="germany">Germany</option>
                    </TomSelect>
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Address Line 1</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Enter the primary line of your physical address,
                        typically including your house or building number and
                        street name.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput type="text" placeholder="users.fakeUsers()[0].location" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Address Line 2</div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        This field is optional and can be used to provide any
                        additional address details, such as apartment number,
                        suite, floor, or any other relevant information.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput type="text" placeholder="users.fakeUsers()[0].location" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">City</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Enter the name of the city or locality where your
                        address is located.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput type="text" placeholder="users.fakeUsers()[0].location" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">State / Province</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Please select your state or province from the provided
                        list.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput type="text" placeholder="users.fakeUsers()[0].location" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Zip / Postal Code</div>
                        <div
                          class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                          Required
                        </div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Enter the postal code or ZIP code associated with your
                        address.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput type="text" />
                  </div>
                </div>
                <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                  <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                      <div class="flex items-center">
                        <div class="font-medium">Exclusivity</div>
                      </div>
                      <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                        Check this box if you want to enable exclusive access to
                        certain features or content on our platform.
                      </div>
                    </div>
                  </label>
                  <div class="flex-1 w-full mt-3 xl:mt-0">
                    <FormCheck>
                      <FormCheck.Input id="checkbox-switch-1" type="checkbox" value="" />
                      <FormCheck.Label class="ml-3.5 text-slate-500 leading-relaxed" htmlFor="checkbox-switch-1">
                        Opting to maintain exclusivity for your portfolio of
                        items on this platform can significantly boost your
                        earnings.
                      </FormCheck.Label>
                    </FormCheck>
                  </div>
                </div>
              </div>
              <div class="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
                <Button variant="outline-primary" class="w-full px-4 border-primary/50 md:w-auto">
                  Save Changes
                </Button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>