<script setup>
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'
import LoadingIcon from '@/components/base/LoadingIcon'
import Checkout from '@/components/CheckoutPage/CheckoutPage.vue'
import AddDonation from '@/components/Dashboard/donations/AddDonation.vue'
import { Tab } from '@/components/base/Headless'
import { useRouter } from 'vue-router'
import { ref, provide, onMounted, nextTick } from 'vue'

const router = useRouter()

const changeActive = (element) => {
  // buscamos el componente que tenga el active
  const lista = element.value.parentNode.parentNode.parentNode
  const active = lista.querySelector('.active')
  // si el componente tiene la clase active
  if (active) {
    // removemos la clase active
    active.classList.remove('active')
  }
  const button = element.value.querySelector('button')
  element.value.parentNode.parentNode.classList.add('active')
  // eliminamos el disabled
  button.disabled = false
  button.click()
  // activamos el disabled
  button.disabled = true
}

const button_method = ref(null)
const btnMethod = () => {
  changeActive(button_method)
}

const button_form = ref(null)
const btnForm = () => {
  changeActive(button_form)
}

const button_confirm = ref(null)
const btnConfirm = () => {
  changeActive(button_confirm)
}

provide('buttonsDonations', { btnMethod, btnForm, btnConfirm })

nextTick(() => {
  btnForm()
})

// ? Donacion ?//
import { useStatus, useValidations, useRefs } from '@/hooks/donations/addDonation'
import { useSetDonation } from '@/hooks/donations/addDonation/useSetDonation'

const { concept, amount } = useRefs()
const { status } = useStatus()
const { valid, validateInputAmount } = useValidations({ status, concept, amount })
const { setDonationLoading, addDonation } = useSetDonation()

const handleRegister = () => {
  if (valid.value) {
    const donation = {
      concept: concept.value,
      amount: amount.value
    }
    addDonation({ donation, btnConfirm, btnForm })
  }
}

provide('refsDonations', {
  concept,
  amount,
  status,
  valid,
  validateInputAmount,
  setDonationLoading,
  handleRegister
})
</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12 sm:col-span-10 sm:col-start-2">
      <Tab.Group>
        <Tab.List class="flex flex-col lg:items-center lg:flex-row gap-y-2 border-none">
          <!-- aqui esta el active -->
          <div
            :class="[
              'flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group active',
              'after:hidden before:hidden after:lg:block before:lg:block',
              'first:after:content-[\'\'] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20',
              'last:before:content-[\'\'] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20',
              'last:after:hidden after:content-[\'\'] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20',
              'first:before:hidden before:content-[\'\'] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20'
            ]"
          >
            <Tab class="flex items-center">
              <div ref="button_form">
                <Tab.Button
                  as="button"
                  disabled
                  class="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 border p-0 rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary cursor-default group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"
                >
                  <div class="flex items-center justify-center w-10 h-10 select-none">1</div>
                </Tab.Button>
              </div>
            </Tab>
            <div
              class="dark:text-slate-200 ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current dark:group-[.active]:text-slate-200 [.group.mode--light_.group.active_&]:!text-slate-100 select-none"
            >
              Donación
            </div>
          </div>
          <div
            :class="[
              'flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group',
              'after:hidden before:hidden after:lg:block before:lg:block',
              'first:after:content-[\'\'] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20',
              'last:before:content-[\'\'] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20',
              'last:after:hidden after:content-[\'\'] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20',
              'first:before:hidden before:content-[\'\'] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20'
            ]"
          >
            <Tab class="flex items-center">
              <div ref="button_method">
                <Tab.Button
                  as="button"
                  disabled
                  class="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 p-0 border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary cursor-default group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"
                >
                  <div class="flex items-center justify-center w-10 h-10 select-none">2</div>
                </Tab.Button>
              </div>
            </Tab>
            <div
              class="dark:text-slate-200 ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current dark:group-[.active]:text-slate-200 [.group.mode--light_.group.active_&]:!text-slate-100 select-none"
            >
              Método de pago
            </div>
          </div>
          <div
            :class="[
              'flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group',
              'after:hidden before:hidden after:lg:block before:lg:block',
              'first:after:content-[\'\'] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20',
              'last:before:content-[\'\'] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20',
              'last:after:hidden after:content-[\'\'] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20',
              'first:before:hidden before:content-[\'\'] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20'
            ]"
          >
            <Tab class="flex items-center">
              <div ref="button_confirm">
                <Tab.Button
                  as="button"
                  disabled
                  class="bg-white dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 p-0 border rounded-full group-[.mode--light]:!bg-transparent group-[.active]:bg-primary cursor-default group-[.active]:text-white group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-white/[0.25] [.group.mode--light_.group.active_&]:!bg-white/[0.12] [.group.mode--light_.group.active_&]:!border-white/[0.15]"
                >
                  <div class="flex items-center justify-center w-10 h-10 select-none">3</div>
                </Tab.Button>
              </div>
            </Tab>
            <div
              class="dark:text-slate-200 ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current dark:group-[.active]:text-slate-200 [.group.mode--light_.group.active_&]:!text-slate-100 select-none"
            >
              Confirmación
            </div>
          </div>
        </Tab.List>
        <div class="mt-7">
          <div class="flex flex-col box box--stacked">
            <div class="p-7">
              <Tab.Panels>
                <Tab.Panel>
                  <AddDonation />
                </Tab.Panel>

                <Tab.Panels>
                  <Tab.Panel>
                    <Checkout />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Panels>
              <Tab.Panels>
                <Tab.Panel>
                  <div class="flex flex-col items-center justify-center min-h-[344px]">
                    <div class="flex flex-col items-center justify-center gap-4">
                      <div class="flex items-center gap-2">
                        <Lucide icon="CheckCircle" class="w-10 h-10 text-primary" />
                        <div class="text-lg font-medium text-slate-500 dark:text-slate-200">
                          ¡Donación realizada!
                        </div>
                      </div>
                      <div class="text-slate dark:text-slate-400 text-center">
                        Tu donación ha sido realizada con éxito, gracias por tu aporte.
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </div>
        </div>
      </Tab.Group>
    </div>
  </div>
</template>
