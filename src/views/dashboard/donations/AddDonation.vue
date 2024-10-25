<script setup>
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import Alert from '@/components/base/Alert'
import LoadingIcon from '@/components/base/LoadingIcon'
import { FormInput, InputGroup } from '@/components/base/Form'
import { useStatus, useValidations, useRefs } from '@/hooks/donations/addDonation'
import { useSetDonation } from '@/hooks/donations/addDonation/useSetDonation'
import { useRouter } from 'vue-router'

const { concept, amount } = useRefs()
const { status } = useStatus()
const { valid, validateInputAmount } = useValidations({ status, concept, amount })
const { setDonationLoading, setDonationError, addDonation } = useSetDonation()
const router = useRouter()

const handleRegister = () => {
  if (valid.value) {
    const donation = {
      concept: concept.value,
      amount: amount.value
    }
    addDonation({ donation })
  }
}
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 sm:col-span-10 sm:col-start-2">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">Agregar Donación</div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
            @click="() => {
              router.push({
                name: 'donations'
              })
            }
              ">
            <Lucide icon="ArrowLeft" class="stroke-[1.3] w-4 h-4 mr-2" /> Regresar
          </Button>
        </div>
      </div>
      <div class="mt-7">
        <div class="flex flex-col box box--stacked">
          <div class="p-7">



            <!--? ######################### ALERTA DE ERROR ######################### -->

            <Alert variant="outline-danger" v-if="setDonationError" :message="setDonationError" :dismissible="true"
              class="flex items-center px-4 py-3 my-7" />

            <!--? ######################### INPUTS ######################### -->

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium text-nowrap dark:text-slate-200">Concepto de donación</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, proporcione un concepto para la donación.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <FormInput type="text" placeholder="Escriba aquí el concepto..." v-model="concept"
                  @keydown.enter.prevent="() => {
                    if (valid && !setDonationLoading) handleRegister()
                  }" class="dark:text-slate-200 dark:placeholder:!text-slate-400" />
                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.concept.message }}
                </div>
              </div>
            </div>

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
              <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                <div class="text-left">
                  <div class="flex items-center">
                    <div class="font-medium dark:text-slate-200">Monto</div>
                    <div
                      class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200 dark:border-slate-500">
                      Requerido
                    </div>
                  </div>
                  <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80 dark:text-slate-400">
                    Por favor, proporcione el monto de la donación.
                  </div>
                </div>
              </label>
              <div class="flex-1 w-full mt-3 xl:mt-0">
                <InputGroup>
                  <InputGroup.Text> $ </InputGroup.Text>
                  <FormInput type="text" placeholder="Escriba aquí su monto..." v-model="amount" @keydown.enter.prevent="() => {
                    if (valid && !setDonationLoading) handleRegister()
                  }" class="dark:text-slate-200 dark:placeholder:!text-slate-400" @input="validateInputAmount" />
                </InputGroup>

                <div class="mt-1 text-xs text-red-500 h-4">
                  {{ status.amount.message }}
                </div>
              </div>
            </div>
          </div>

          <!--? ######################### BUTTON ######################### -->

          <div class="flex py-5 border-t md:justify-end px-7 border-slate-200/80 dark:border-slate-600">
            <Button variant="outline-success"
              :class="`w-full px-10 md:w-auto font-bold ${setDonationLoading || !valid ? 'border-gray-500 text-gray-500' : 'border-green text-green dark:text-slate-200'}`"
              @click="handleRegister" :disabled="!valid || setDonationLoading">
              <LoadingIcon v-if="setDonationLoading" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                color="black" />

              <Lucide v-if="!setDonationLoading" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2" />
              {{ setDonationLoading ? 'Registrando...' : 'Registrar' }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
