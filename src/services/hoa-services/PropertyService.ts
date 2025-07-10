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
import { PropertyFormValues } from '@/app/(protected-pages)/home/components/properties/form/PropertyForm'


export async function getPropertiesByCondominiumIdService(data: GetByIdParam) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/properties/allByCondominium/${data.id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function createPropertyOnCondominiumIdService(condominiumId: string, formData: PropertyFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, condominium_id: condominiumId }

    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/properties`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updatePropertyOnCondominiumService(propertyId: string, formData: PropertyFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/properties/${propertyId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function deletePropertyOnCondominiumService(propertyId: string) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/properties/${propertyId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}