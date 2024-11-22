<script setup>
import { Dialog } from '@/components/base/Headless'
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from '@/components/base/Button'
import Lucide from '@/components/base/Lucide'
import { ref, inject, watch } from 'vue'
import { useDeleteProgram } from '@/hooks/programs/deleteProgram/useDeleteProgram'

// obtenemos las props del componente padre
const props = defineProps({
  ModalDeleteProgram: Boolean,
  setModalDeleteProgram: Function,
  infoProgram: Object
})

const { programs } = inject('programs')

const { deleteProgram, loadingDeleteProgram } = useDeleteProgram()

const handleDeleteArea = () => {
  deleteProgram({
    program: props.infoProgram,
    programs: programs,
    setModalDeleteProgram: props.setModalDeleteProgram
  })
}
</script>

<template>
  <Dialog
    :open="ModalDeleteProgram"
    @close="
      () => {
        setModalDeleteProgram({ open: false })
      }
    "
  >
    <Dialog.Panel>
      <div class="p-5 text-center">
        <div class="w-16 h-16 mx-auto mt-3">
          <Lucide
            v-if="!loadingDeleteProgram"
            icon="XCircle"
            class="w-full h-full text-danger dark:text-red-500"
          />
          <LoadingIcon v-else icon="tail-spin" color="black" />
        </div>
        <div class="mt-5 text-3xl text-slate-900 dark:text-slate-200">¿Está seguro?</div>
        <div class="mt-2 text-slate-500 dark:text-slate-400">
          ¿Realmente desea eliminar este registro?
          <br />
          Este proceso eliminara las actividades asociadas a este programa.
        </div>
      </div>
      <div class="px-5 pb-8 text-center space-x-8">
        <Button
          type="button"
          variant="outline-secondary"
          @click="
            () => {
              setModalDeleteProgram({ open: false })
            }
          "
          class="w-24 mr-1 text-slate-900 dark:text-slate-200"
        >
          Cancelar
        </Button>
        <Button
          type="button"
          variant="danger"
          class="w-24 text-slate-900 dark:text-slate-200"
          @click="handleDeleteArea"
          ref="deleteButtonRef"
        >
          Eliminar
        </Button>
      </div>
    </Dialog.Panel>
  </Dialog>
</template>
