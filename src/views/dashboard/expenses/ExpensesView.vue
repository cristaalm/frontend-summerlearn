<script setup>
import Lucide from "@/components/base/Lucide";
import { Menu } from "@/components/base/Headless";
import Pagination from "@/components/base/Pagination";
import LoadingIcon from "@/components/base/LoadingIcon";
import ToastNotification from '@/components/ToastNotification'
import { FormInput, FormSelect } from "@/components/base/Form";
import Button from "@/components/base/Button";
import Table from "@/components/base/Table";
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useBills, usePagination, useBillSearch, useExportExcel, useToast } from "@/hooks/bills";

const router = useRouter();
const { bills, loading, loadBills, errorBills } = useBills();
const { searchQuery, filteredBills } = useBillSearch(bills);
const { currentPage, pageSize, totalPages, paginatedItems, changePage, changePageSize } = usePagination(filteredBills);
const { toastMessages, showToast } = useToast();
const { loadExportExcel, loadingExportExcel, errorExportExcel } = useExportExcel({ showToast });

function formatDateToDDMMYYYY(dateString) {
    if (!dateString) return ''; // Verifica si dateString es undefined, null o vacío.
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

onMounted(() => {
    loadBills();
});
</script>

<template>

    <!--? ######################## TOAST NOTIFICATION ######################## -->

    <div>
        <ToastNotification v-for="(message, index) in toastMessages" :key="index" :message="message" :index="index">
        </ToastNotification>
    </div>

    <div class="grid grid-cols-12 gap-y-10 gap-x-6">
        <div class="col-span-12">
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium group-[.mode--light]:text-white">
                    Gastos
                </div>
                <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                    <Button variant="primary" @click="router.push({ name: 'addExpense' })"
                        class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
                        <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Nuevo Gasto
                    </Button>
                </div>
            </div>

            <div class="mt-3.5">
                <div class="flex flex-col box box--stacked">
                    <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
                        <div>
                            <div class="relative">
                                <Lucide icon="Search"
                                    class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500" />
                                <FormInput v-model="searchQuery" type="text" placeholder="Buscar por concepto"
                                    class="pl-9 sm:w-64 rounded-[0.5rem]" />
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                            <Menu>
                                <Menu.Button :as="Button" variant="outline-secondary"
                                    :class="`w-full sm:w-auto ${loadingExportExcel ? 'text-amber-500' : ' text-black'}`"
                                    :disabled="loadingExportExcel">
                                    <Lucide v-if="!loadingExportExcel" icon="Download"
                                        class="stroke-[1.3] w-4 h-4 mr-2" />
                                    <LoadingIcon v-if="loadingExportExcel" icon="tail-spin"
                                        class="stroke-[1.3] w-4 h-4 mr-2" color="black" />
                                    Exportar
                                    <Lucide icon="ChevronDown" class="stroke-[1.3] w-4 h-4 ml-2" />
                                </Menu.Button>
                                <Menu.Items class="w-40">
                                    <Menu.Item>
                                        <Button @click="loadExportExcel"
                                            :class="`w-full ${loadingExportExcel ? 'text-amber-500' : ' text-black'}`"
                                            :disabled="loadingExportExcel">
                                            <Lucide v-if="!loadingExportExcel" icon="FileSpreadsheet"
                                                class="stroke-[1.3] w-4 h-4 mr-2" />
                                            <LoadingIcon v-if="loadingExportExcel" icon="tail-spin"
                                                class="stroke-[1.3] w-4 h-4 mr-2" color="black" />
                                            Excel
                                        </Button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </div>
                    <div class="overflow-auto xl:overflow-visible">
                        <Table class="border-b border-slate-200/60">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td
                                        class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                        Nombre del donante
                                    </Table.Td>
                                    <Table.Td
                                        class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                        Monto
                                    </Table.Td>
                                    <Table.Td
                                        class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                        Concepto
                                    </Table.Td>
                                    <Table.Td
                                        class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500">
                                        Fecha de Donación
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Thead>

                            <Table.Tbody v-if="loading">
                                <Table.Tr class="[&_td]:last:border-b-0">
                                    <Table.Td colspan="8" class="py-8 text-center text-xl font-bold text-green-500">
                                        <div class="flex flex-col w-full justify-center items-center text-nowrap">
                                            <LoadingIcon icon="tail-spin" class=" h-8" color="black" />
                                            <div class="mt-2">Cargando información...</div>
                                        </div>
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>

                            <!--? Mostrar mensaje de error cuando hay error -->
                            <Table.Tbody v-if="errorBills">
                                <Table.Tr>
                                    <Table.Td colspan="5" class="py-8 text-center text-xl font-bold text-red-500">
                                        Error al cargar la información, Inténtelo más tarde
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>

                            <!--? Mostrar mensaje de error cuando no se encuentran usuarios -->
                            <Table.Tbody v-if="!loading && totalPages <= 0 && !errorBills">
                                <Table.Tr>
                                    <Table.Td colspan="5" class="py-8 text-center text-xl font-bold text-amber-500">
                                        No se encontraron gasto
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>

                            <Table.Tbody v-if="!loading">
                                <template v-for="(bill, key) in paginatedItems" :key="key">
                                    <Table.Tr class="[&_td]:last:border-b-0">
                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            {{ bill.donation.name }}
                                        </Table.Td>
                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            $ {{ bill.amount }}
                                        </Table.Td>
                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                           {{ bill.concept }}
                                        </Table.Td>
                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            {{ formatDateToDDMMYYYY(bill.date) }}
                                        </Table.Td>
                                    </Table.Tr>
                                </template>
                            </Table.Tbody>
                        </Table>
                    </div>
                    <div class="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row">
                        <Pagination class="flex-1 w-full mr-auto sm:w-auto">
                            <Pagination.Link @click="changePage(1)">
                                <Lucide icon="ChevronsLeft" class="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link @click="changePage(currentPage - 1)">
                                <Lucide icon="ChevronLeft" class="w-4 h-4" />
                            </Pagination.Link>
                            <template v-for="page in totalPages" :key="page">
                                <Pagination.Link :active="page === currentPage" @click="changePage(page)">
                                    {{ page }}
                                </Pagination.Link>
                            </template>
                            <Pagination.Link @click="changePage(currentPage + 1)">
                                <Lucide icon="ChevronRight" class="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link @click="changePage(totalPages)">
                                <Lucide icon="ChevronsRight" class="w-4 h-4" />
                            </Pagination.Link>
                        </Pagination>
                        <FormSelect class="sm:w-20 rounded-[0.5rem]" v-model="pageSize" @change="changePageSize">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </FormSelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
