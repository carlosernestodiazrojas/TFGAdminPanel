
import { GetByIdParam } from '@/@types/common'
import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'
import { CommonAreaFormValues } from '@/app/(protected-pages)/home/components/common-areas/form/CommonAreaForm'


export async function getCommonAreasByCondominiumIdService(data: GetByIdParam) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/common-areas/allByCondominium/${data.id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function createCommonAreaOnCondominiumIdService(condominiumId: string, formData: CommonAreaFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, condominium_id: condominiumId }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/common-areas`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateCommonAreaOnCondominiumService(commonAreaId: string, formData: CommonAreaFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/common-areas/${commonAreaId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function deleteCommonAreaOnCondominiumService(commonAreaId: string) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/common-areas/${commonAreaId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}