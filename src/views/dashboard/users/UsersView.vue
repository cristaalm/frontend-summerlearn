<script setup lang="ts">
import Lucide from "@/components/base/Lucide";
import { Menu, Popover } from "@/components/base/Headless";
import Pagination from "@/components/base/Pagination";
import { FormInput, FormSelect } from "@/components/base/Form";
import Tippy from "@/components/base/Tippy";
import Button from "@/components/base/Button";
import Table from "@/components/base/Table";

const exampleInformationUser = [
    {
        id: 1,
        photo: "https://avatar.iran.liara.run/public/boy?username=Ash",
        name: "Ash",
        email: "prueba@mail.com",
        age: 20,
        phone: "123456789",
        role: "Beneficiario",
        status: true
    },
    {
        id: 2,
        photo: "https://avatar.iran.liara.run/public/boy?username=John",
        name: "John",
        email: "john@mail.com",
        age: 25,
        phone: "987654321",
        role: "Voluntario",
        status: false
    },
    {
        id: 3,
        photo: "https://avatar.iran.liara.run/public/boy?username=Emma",
        name: "Emma",
        email: "emma@mail.com",
        age: 30,
        phone: "555555555",
        role: "Coordinador",
        status: true
    },
    {
        id: 4,
        photo: "https://avatar.iran.liara.run/public/boy?username=Michael",
        name: "Michael",
        email: "michael@mail.com",
        age: 35,
        phone: "111111111",
        role: "Admin",
        status: false
    },
];



</script>

<template>
  <div class="grid grid-cols-12 gap-y-10 gap-x-6">
    <div class="col-span-12">
      <div class="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
        <div class="text-base font-medium group-[.mode--light]:text-white">
          Usuarios
        </div>
        <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 md:ml-auto">
          <Button
            variant="primary"
            class="group-[.mode--light]:!bg-white/[0.12] group-[.mode--light]:!text-slate-200 group-[.mode--light]:!border-transparent"
          >
            <Lucide icon="PenLine" class="stroke-[1.3] w-4 h-4 mr-2" /> Agregar nuevo usuario
          </Button>
        </div>
      </div>
      <div class="mt-3.5">
        <div class="flex flex-col box box--stacked">
          <div class="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
            <div>
              <div class="relative">
                <Lucide
                  icon="Search"
                  class="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                />
                <FormInput
                  type="text"
                  placeholder="Buscar usuario..."
                  class="pl-9 sm:w-64 rounded-[0.5rem]"
                />
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-x-3 gap-y-2 sm:ml-auto">
              <Popover class="inline-block" v-slot="{ close }">
                <Popover.Button
                  :as="Button"
                  variant="outline-secondary"
                  class="w-full sm:w-auto"
                >
                  <Lucide
                    icon="ArrowDownWideNarrow"
                    class="stroke-[1.3] w-4 h-4 mr-2"
                  />
                  Filtrar
                  <div
                    class="flex items-center justify-center h-5 px-1.5 ml-2 text-xs font-medium border rounded-full bg-slate-100"
                  >
                    3
                  </div>
                </Popover.Button>
                <Popover.Panel placement="bottom-end">
                  <div class="p-2">
                    <div>
                      <div class="text-left text-slate-500">Status</div>
                      <FormSelect class="flex-1 mt-2">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </FormSelect>
                    </div>
                    <div>
                      <div class="text-left text-slate-500">Rol</div>
                      <FormSelect class="flex-1 mt-2">
                        <option value="Admin">Admin</option>
                        <option value="Coordinador">Coordinador</option>
                        <option value="Voluntario">Voluntario</option>
                        <option value="Donador">Donador</option>
                        <option value="Beneficiario">Beneficiario</option>
                      </FormSelect>
                    </div>
                    <div class="flex items-center mt-4">
                      <Button
                        variant="secondary"
                        @click="
                          () => {
                            close();
                          }
                        "
                        class="w-32 ml-auto"
                      >
                        Close
                      </Button>
                      <Button variant="primary" class="w-32 ml-2">
                        Apply
                      </Button>
                    </div>
                  </div>
                </Popover.Panel>
              </Popover>
            </div>
          </div>
          <div class="overflow-auto xl:overflow-visible">
            <Table class="border-b border-slate-200/60">
              <Table.Thead>
                <Table.Tr>
                  <Table.Td
                    class="w-5 py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Foto
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Nombre / Email
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Edad
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Telefono
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Rol
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium border-t bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                    Estado
                  </Table.Td>
                  <Table.Td
                    class="py-4 font-medium text-center border-t w-36 bg-slate-50 border-slate-200/60 text-slate-500"
                  >
                  </Table.Td>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <template
                    v-for="user in exampleInformationUser"
                    :key="user.id"
                >
                  <Table.Tr class="[&_td]:last:border-b-0">
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <div class="flex">
                        <div class="w-9 h-9 image-fit zoom-in">
                          <Tippy
                            as="img"
                            alt="Tailwise - Admin Dashboard Template"
                            class="rounded-full cursor-default shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                            :src="user.photo"
                            :disable="true"
                            :content="`Image User`"
                          />
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <a href="" class="font-medium whitespace-nowrap">
                        {{ user.name }}
                      </a>
                      <div
                        class="text-slate-500 text-xs whitespace-nowrap mt-0.5"
                      >
                        {{ user.email }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <div class="whitespace-nowrap">
                        {{ user.age }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <a href="" class="flex items-center text-primary">
                        <Lucide icon="Phone" class="w-4 h-4 mr-2" />
                        {{ user.phone }}
                      </a>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                      <div class="whitespace-nowrap">
                        {{ user.role }}
                      </div>
                    </Table.Td>
                    <Table.Td class="py-4 border-dashed dark:bg-darkmode-600">
                        <div
                            :class="[ 'flex items-center justify-start', { 'text-success': user.status }, { 'text-danger': !user.status } ]"
                        >
                            <Lucide icon="Database" class="w-3.5 h-3.5 stroke-[1.7]" />
                            <div class="ml-1.5 whitespace-nowrap">
                                {{ user.status ? 'Active' : 'Inactive' }}
                            </div>
                        </div>
                    </Table.Td>
                    <Table.Td
                      class="relative py-4 border-dashed dark:bg-darkmode-600"
                    >
                      <div class="flex items-center justify-center">
                        <Menu class="h-5">
                          <Menu.Button class="w-5 h-5 text-black">
                            <Lucide
                              icon="MoreVertical"
                              class="w-5 h-5 stroke-black fill-black"
                            />
                          </Menu.Button>
                          <Menu.Items class="w-40">
                            <Menu.Item>
                              <Lucide icon="CheckSquare" class="w-4 h-4 mr-2" />
                              Edit
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
          <div
            class="flex flex-col-reverse flex-wrap items-center p-5 flex-reverse gap-y-2 sm:flex-row"
          >
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
