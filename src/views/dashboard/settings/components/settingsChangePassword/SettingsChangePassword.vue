<script setup>
import { useRefs, useStatus, useValidateFunctions, usePasswordSecurity, useUpdatePassword } from "@/hooks/settings/changePassword";
import { InputGroup, FormInput } from "@/components/base/Form";
import LoadingIcon from '@/components/base/LoadingIcon'
import Lucide from '@/components/base/Lucide'
import Button from '@/components/base/Button'

const { currentPassword, newPassword, newPasswordConfirm, showCurrentPassword, showNewPassword, showNewPasswordConfirm, valid } = useRefs();
const { status, resetFields } = useStatus();
const { validate, validatePasswordCurrent, validateNewPasswordComfirm } = useValidateFunctions({ valid, password_current: currentPassword, new_password: newPassword, new_password_confirm: newPasswordConfirm, status })
const { validatePassword } = usePasswordSecurity({ status, validate, newPassword, currentPassword });
const { loadingUpdatePassword, updatePassword } = useUpdatePassword({ newPassword, newPasswordConfirm, currentPassword, validate, valid, resetFields });

</script>

<template>
    <div class="flex flex-col p-5 box box--stacked">
        <div class="pb-5 mb-6 font-medium border-b border-dashed border-slate-300/70 text-[0.94rem]">
            Cambiar contraseña
        </div>

        <div>

            <!-- ? ######################## Contraseña actual ######################## ? -->

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                        <div class="flex items-center">
                            <div class="font-medium">Contraseña actual</div>
                            <div
                                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                Requerido
                            </div>
                        </div>
                        <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                            Por favor, ingrese su contraseña actual.
                        </div>
                    </div>
                </label>
                <div class="flex-1 w-full mt-3 xl:mt-0">
                    <InputGroup class="mt-2">
                        <FormInput :type="`${showCurrentPassword ? 'text' : 'password'}`"
                            placeholder="Escriba aquí su contraseña actual..." name="password_current" @input="(e) => {
                                validatePasswordCurrent();
                                validatePassword(e);
                            }" v-model="currentPassword" />
                        <InputGroup.Text @click="() => {
                            showCurrentPassword = !showCurrentPassword
                        }
                            " class="cursor-pointer">
                            <button>
                                <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500"
                                    v-if="showCurrentPassword" />
                                <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                            </button>
                        </InputGroup.Text>
                    </InputGroup>
                    <div class="text-red-500 mt-2">{{ status.password_current.message }}</div>
                </div>
            </div>



            <!-- ? ######################## Nueva contraseña ######################## ? -->

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                        <div class="flex items-center">
                            <div class="font-medium">Nueva contraseña</div>
                            <div
                                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                Requerido
                            </div>
                        </div>
                        <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                            Por favor, ingrese su nueva contraseña.
                        </div>
                    </div>
                </label>
                <div class="flex-1 w-full mt-3 xl:mt-0">
                    <InputGroup class="mt-2">
                        <FormInput :type="`${showNewPassword ? 'text' : 'password'}`" @input="(e) => {
                            validatePassword(e);
                            validateNewPasswordComfirm(e);
                        }" placeholder=" Escriba aquí su contraseña..." name="new_password" v-model="newPassword" />
                        <InputGroup.Text @click="() => { showNewPassword = !showNewPassword }" class="cursor-pointer">
                            <button>
                                <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500" v-if="showNewPassword" />
                                <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                            </button>
                        </InputGroup.Text>
                    </InputGroup>
                    <div class="grid w-full h-1.5 grid-cols-12 gap-4 mt-3.5">
                        <div
                            :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.new_password.color} ${status.new_password.secure >= 0 ? 'active' : ''}`">
                        </div>
                        <div
                            :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.new_password.color} ${status.new_password.secure >= 2 ? 'active' : ''}`">
                        </div>
                        <div
                            :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.new_password.color} ${status.new_password.secure >= 3 ? 'active' : ''}`">
                        </div>
                        <div
                            :class="`h-full col-span-3 border rounded bg-slate-400/30 border-slate-400/20 ${status.new_password.color} ${status.new_password.secure >= 4 ? 'active' : ''}`">
                        </div>
                    </div>

                    <div
                        :class="`mt-2 flex flex-col gap-1 ${status.new_password.error ? 'text-red-500' : status.new_password.secure === 4 ? 'text-blue-600' : 'text-green-600'}`">
                        <span v-for="item in status.new_password.message" :key="item">
                            {{ item }}
                        </span>
                        <ul v-if="status.new_password.secure != 4">
                            <li v-for="item in status.new_password.list" :key="item" class="list-disc list-inside">
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- ? ######################## Confirmar nueva contraseña ######################## ? -->

            <div class="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                <label class="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                    <div class="text-left">
                        <div class="flex items-center">
                            <div class="font-medium text-nowrap">Confirmar nueva contraseña</div>
                            <div
                                class="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                                Requerido
                            </div>
                        </div>
                        <div class="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                            Por favor, confirme su nueva contraseña.
                        </div>
                    </div>
                </label>
                <div class="flex-1 w-full mt-3 xl:mt-0">
                    <InputGroup class="mt-2">
                        <FormInput placeholder="Escriba nuevamente aquí su contraseña..."
                            @input="validateNewPasswordComfirm"
                            :type="`${showNewPasswordConfirm ? 'text' : 'password'}`" name="new_password_confirm"
                            v-model="newPasswordConfirm" />
                        <InputGroup.Text @click="() => { showNewPasswordConfirm = !showNewPasswordConfirm }
                            " class="cursor-pointer">
                            <button>
                                <Lucide icon="Eye" class="w-4 h-4 stroke-[1.3] text-green-500"
                                    v-if="showNewPasswordConfirm" />
                                <Lucide icon="EyeOff" class="w-4 h-4 stroke-[1.3] text-red-500" v-else />
                            </button>
                        </InputGroup.Text>
                    </InputGroup>
                    <div class="text-red-500 mt-2">{{ status.new_password_confirm.message }}</div>
                </div>
            </div>


        </div>
        <div class="flex pt-5 mt-6 border-t border-dashed md:justify-end border-slate-300/70">
            <Button variant="outline-primary" class="w-full px-10 md:w-auto border-primary/50"
                :disabled="!valid || loadingUpdatePassword" @click="updatePassword">
                <Lucide v-if="!loadingUpdatePassword" icon="Check" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2" />
                <LoadingIcon v-if="loadingUpdatePassword" icon="tail-spin" class="stroke-[1.3] w-4 h-4 mr-2 -ml-2"
                    color="black" />
                {{ loadingUpdatePassword ? 'Cambiando contraseña...' : 'Cambiar contraseña' }}
            </Button>
        </div>
    </div>
</template>