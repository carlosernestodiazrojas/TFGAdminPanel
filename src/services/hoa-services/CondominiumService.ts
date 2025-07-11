/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { GetByIdParam } from '@/@types/common'
import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'
import { CondominiumFormValues } from '@/app/(protected-pages)/home/components/condominiums/form/CondominiumForm'

export async function getCondominiumByIdService(data: GetByIdParam) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/condominiums/${data.id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function getCondominiumsByHoaIdService() {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/condominiums/allByHoa/${userAuth.hoaId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function createCondominiumOnHoaIdService(formData: CondominiumFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, hoa_id: userAuth.hoaId }

    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/condominiums`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateCondominiumOnHoaService(condominiumId: string, formData: CondominiumFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/condominiums/${condominiumId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}