<script setup>
import Lucide from "@/components/base/Lucide";
import { Menu } from "@/components/base/Headless";
import Pagination from "@/components/base/Pagination";
import { FormInput, FormSelect } from "@/components/base/Form";
import Button from "@/components/base/Button";
import Table from "@/components/base/Table";
import { onMounted } from 'vue'
import { useBills } from "@/hooks/bills/useBills";

const { bills, loading, loadBills } = useBills();

onMounted(() => {
  loadBills();
});


</script>

<template>
    <div class="grid grid-cols-12 gap-y-10 gap-x-6">
        <div class="col-span-12">
            <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
                <div class="text-base font-medium group-[.mode--light]:text-white">
                    Gastos
                </div>
                <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
                    <Button variant="primary"
                        class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent">
                        <Lucide icon="DollarSign" class="stroke-[1.3] w-4 h-4 mr-2" /> Nueva Donacion
                        
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
                                <FormInput type="text" placeholder="Buscar..."
                                    class="pl-9 sm:w-64 rounded-[0.5rem]" />
                            </div>
                        </div>
                        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
                            <Menu>
                                <Menu.Button :as="Button" variant="outline-secondary" class="w-full sm:w-auto">
                                    <Lucide icon="Download" class="stroke-[1.3] w-4 h-4 mr-2" />
                                    Export
                                    <Lucide icon="ChevronDown" class="stroke-[1.3] w-4 h-4 ml-2" />
                                </Menu.Button>
                                <Menu.Items class="w-40">
                                    <Menu.Item>
                                        <Lucide icon="FileBarChart" class="w-4 h-4 mr-2" /> PDF
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Lucide icon="FileBarChart" class="w-4 h-4 mr-2" />
                                        CSV
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
                                        Nombre del Donante
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
                                        Fecha de Donacion
                                    </Table.Td>
                                    <Table.Td
                                        class="py-4 font-medium text-center border-t w-36 bg-slate-50 border-slate-200/60 text-slate-500">
                                        Action
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Thead>


                            <Table.Tbody v-if="loading" >
                                <Table.Tr class="[&_td]:last:border-b-0">
                                    <Table.Td colspan="8" class="py-8 text-center text-xl font-bold text-green-500">
                                        Cargando...
                                    </Table.Td>
                                </Table.Tr>
                            </Table.Tbody>
                            
                            <!-- <Table.Tbody v-if="!loading" >
                                <template v-for="(product, Key) in products" :key="Key">
                                    <Table.Tr class="[&_td]:last:border-b-0">
                                        <Table.Td colspan="3" class="py-8 text-center text-xl font-bold text-amber-500">
                                            No se encontraron áreas
                                        </Table.Td>
                                    </Table.Tr>
                                </template>
                            </Table.Tbody> -->


                            <Table.Tbody v-if="!loading" >
                                <template v-for="(bill, Key) in bills" :key="Key">
                                    <Table.Tr class="[&_td]:last:border-b-0">
                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            {{ bill.donation }}
                                        </Table.Td>

                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            Monto ----
                                        </Table.Td>

                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            {{ bill.concept }}
                                        </Table.Td>

                                        <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                                            {{ bill.date }}
                                        </Table.Td>
                                        <Table.Td class="relative py-4 border-dashed dark:bg-darkmode-600">
                                            <div class="flex items-center justify-center">
                                                <Menu class="h-5">
                                                    <Menu.Button class="w-5 h-5 text-slate-500">
                                                        <Lucide icon="MoreVertical"
                                                            class="w-5 h-5 stroke-slate-400/70 fill-slate-400/70" />
                                                    </Menu.Button>
                                                    <Menu.Items class="w-40">
                                                        <Menu.Item>
                                                            <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                                                            Factura
                                                        </Menu.Item>
                                                        <Menu.Item class="text-danger">
                                                            <Lucide icon="Trash2" class="w-4 h-4 mr-2" />
                                                            Delete
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Menu>
                                            </div>
                                        </Table.Td>
                                    </Table.Tr>
                                </template>
                            </Table.Tbody>


                        </Table>
                    </div>
                    <div class="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row">
                        <Pagination class="flex-1 w-full mr-auto sm:w-auto">
                            <Pagination.Link>
                                <Lucide icon="ChevronsLeft" class="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link>
                                <Lucide icon="ChevronLeft" class="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link>...</Pagination.Link>
                            <Pagination.Link>1</Pagination.Link>
                            <Pagination.Link active>2</Pagination.Link>
                            <Pagination.Link>3</Pagination.Link>
                            <Pagination.Link>...</Pagination.Link>
                            <Pagination.Link>
                                <Lucide icon="ChevronRight" class="w-4 h-4" />
                            </Pagination.Link>
                            <Pagination.Link>
                                <Lucide icon="ChevronsRight" class="w-4 h-4" />
                            </Pagination.Link>
                        </Pagination>
                        <FormSelect class="sm:w-20 rounded-[0.5rem]">
                            <option>10</option>
                            <option>25</option>
                            <option>35</option>
                            <option>50</option>
                        </FormSelect>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
