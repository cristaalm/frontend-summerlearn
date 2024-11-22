<script setup>
import { Dialog } from '@/components/base/Headless'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import { inject } from 'vue'

const props = defineProps({
  ModalConfirmAddDonation: Boolean,
  setModalConfirmAddDonation: Function
})

const { setDonationLoading, handleRegister, concept, amount } = inject('refsDonations')
const cardNumber = inject('cardNumber')

const handleConfirm = () => {
  if (setDonationLoading.value) return
  handleRegister()
  props.setModalConfirmAddDonation({ open: false })
}
</script>
<template>
  <!-- BEGIN: Modal Content -->
  <Dialog
    size="lg"
    :open="ModalConfirmAddDonation"
    @close="
      () => {
        setModalConfirmAddDonation({ open: false })
      }
    "
  >
    <Dialog.Panel>
      <div class="p-5 text-center">
        <!-- Icono de carga o de cancelación -->
        <div class="w-16 h-16 mx-auto mt-3">
          <Lucide
            v-if="!setDonationLoading"
            icon="CheckCircle"
            class="w-full h-full text-success"
          />
          <LoadingIcon v-else icon="tail-spin" color="black" />
        </div>

        <!-- Título del modal -->
        <div class="mt-5 text-3xl dark:text-slate-200">Confirmar donación</div>

        <!-- Información de la donación -->
        <div
          class="mt-6 p-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-md bg-theme-1/10 dark:bg-slate-800"
        >
          <div class="mb-2 flex flex-col gap-3">
            <p class="truncate text-lg font-semibold text-slate-700 dark:text-slate-300 text-start">
              <strong>Concepto:</strong> {{ concept }}
            </p>
            <p class="text-lg font-semibold text-slate-700 dark:text-slate-300 text-start">
              <strong>Monto:</strong> ${{ amount }}
            </p>
            <p class="text-lg font-semibold text-slate-700 dark:text-slate-300 text-start">
              <strong>Número de tarjeta:</strong> {{ cardNumber }}
            </p>
          </div>
        </div>

        <!-- Mensaje adicional -->
        <div class="mt-4 text-2xl text-slate-500 dark:text-slate-200">
          Confirme si los datos son correctos.
        </div>
        <!-- Mensaje adicional -->
        <div class="text-md text-slate-500 dark:text-slate-400">
          Al confirmar, se realizará la donación.
        </div>
      </div>

      <!-- Botones de confirmación y cancelación -->
      <div class="px-5 pb-8 text-center space-x-8">
        <Button
          type="button"
          variant="outline-danger"
          @click="setModalConfirmAddDonation({ open: false })"
          class="w-24 mr-1 dark:text-slate-200"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="outline-success"
          class="w-24 dark:text-slate-200"
          @click="handleConfirm"
          ref="deleteButtonRef"
        >
          Confirmar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
  <!-- END: Modal Content -->
</template>

<style>
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
