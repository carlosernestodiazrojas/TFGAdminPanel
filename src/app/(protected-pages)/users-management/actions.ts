/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


'use server'

import {
    registerUserOnHoaService,
    getUsersByHoaIdService,
    updateUserOnHoaService,
    changePasswordService,
    updateUserPropertyService,
    resetPasswordService
} from "@/services/user-services/UserService"

import { UserFormValues, UserFormValuesNew } from "./components/form/UsersForm"
import { revalidatePath } from "next/cache"
import { uploadFileService } from "@/services/file-services/FileService"

export async function getUsersByHoaId() {
    const response = await getUsersByHoaIdService()
    return response
}

export async function createUserOnHoa(formData: UserFormValuesNew) {
    const response = await registerUserOnHoaService(formData)
    revalidatePath('/users-management')
    return response
}

export async function updateUserOnHoa(userId: string, formData: Omit<UserFormValues, 'password' | 'hoa_id'>) {
    const response = await updateUserOnHoaService(userId, formData)
    revalidatePath('/users-management')
    return response
}

export async function updateUserProperty(userId: string, formData: { property: string }) {
    const response = await updateUserPropertyService(userId, formData)
    revalidatePath('/users-management')
    return response
}

export async function changePassword(userId: string, formData: UserFormValues) {
    const response = await changePasswordService(userId, formData)
    revalidatePath('/users-management')
    return response
}

export async function resetPassword(userId: string, formData: { newPass: string }) {
    const response = await resetPasswordService(userId, formData)
    revalidatePath('/users-management')
    return response
}

export async function uploadFileImage(formData: FormData) {
    const response = await uploadFileService(formData)
    return response
} 