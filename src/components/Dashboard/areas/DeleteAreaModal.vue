<script setup>
import { Dialog } from "@/components/base/Headless";
import LoadingIcon from '@/components/base/LoadingIcon'
import Button from "@/components/base/Button";
import Lucide from "@/components/base/Lucide";
import { ref, inject, watch } from "vue";
import { useDeleteArea } from '@/hooks/areas/deleteArea/useDeleteArea'

// obtenemos las props del componente padre
const props = defineProps({
    ModalDeleteArea: Boolean,
    setModalDeleteArea: Function,
    infoArea: Object
})

const { areas } = inject('areas')

const { deleteArea, loadingDeleteArea } = useDeleteArea()

const handleDeleteArea = () => {
    deleteArea({ area: props.infoArea, areas: areas, setModalDeleteArea: props.setModalDeleteArea })
}
</script>

<template>
    <!-- BEGIN: Modal Content -->
    <Dialog :open="ModalDeleteArea" @close="() => {
        setModalDeleteArea({ open: false })
    }">
        <Dialog.Panel>
            <div class="p-5 text-center">
                <div class="w-16 h-16 mx-auto mt-3 ">
                    <Lucide v-if="!loadingDeleteArea" icon="XCircle"
                        class="w-full h-full text-danger dark:text-red-500" />
                    <LoadingIcon v-else icon="tail-spin" color="black" />
                </div>
                <div class="mt-5 text-3xl dark:text-slate-200">¿Está seguro?</div>
                <div class="mt-2 text-slate-500 dark:text-slate-400">
                    ¿Realmente desea eliminar este registro?
                    <br />
                    Este proceso no puede deshacerse.
                </div>
            </div>
            <div class="px-5 pb-8 text-center space-x-8">
                <Button type="button" variant="outline-secondary" @click="setModalDeleteArea({ open: false })"
                    class="w-24 mr-1 dark:text-slate-200">
                    Cancelar
                </Button>
                <Button type="button" variant="danger" class="w-24 dark:text-slate-200" @click="handleDeleteArea"
                    ref="deleteButtonRef">
                    Eliminar
                </Button>
            </div>
        </Dialog.Panel>
    </Dialog>
    <!-- END: Modal Content -->
</template>