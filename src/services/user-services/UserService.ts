/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'
import { UserFormValues, UserFormValuesNew } from '@/app/(protected-pages)/users-management/components/form/UsersForm'

export async function getUserByIdService(userId: string) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/users/getUser/${userId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function getUsersByHoaIdService() {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/users/allByHoa/${userAuth.hoaId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function registerUserOnHoaService(formData: UserFormValuesNew) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, hoa_id: userAuth.hoaId }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/auth/register`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateUserOnHoaService(userId: string, formData: Omit<UserFormValues, 'password' | 'hoa_id'>) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/users/${userId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateUserPropertyService(userId: string, formData: { property: string }) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/users/${userId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function changePasswordService(userId: string, formData: any) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/users/${userId}/password`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function resetPasswordService(userId: string, formData: { newPass: string }) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/users/${userId}/password_reset`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}
