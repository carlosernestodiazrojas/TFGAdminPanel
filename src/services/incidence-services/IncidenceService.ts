
import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'

import { IncidenceFormValues, IncidenceFormValuesNew } from '@/app/(protected-pages)/incidences-management/components/form/IncidenceForm'



export async function getIncidencesByHoaIdService() {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/incidences/allByHoa/${userAuth.hoaId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function createIncidenceOnHoaService(formData: IncidenceFormValuesNew) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, hoa_id: userAuth.hoaId }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/incidences`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateIncidenceOnHoaService(incidenceId: string, formData: IncidenceFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/incidences/${incidenceId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function deleteIncidenceOnHoaService(incidenceId: string) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/incidences/${incidenceId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}