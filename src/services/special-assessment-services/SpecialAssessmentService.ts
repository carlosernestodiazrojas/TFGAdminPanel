
import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'

import { SpecialAssessmentFormValues, SpecialAssessmentFormValuesNew } from '@/app/(protected-pages)/special-assessments-management/components/form/SpecialAssessmentForm'



export async function getSpecialAssessmentsByHoaIdService() {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/special-assessments/allByHoa/${userAuth.hoaId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function createSpecialAssessmentOnHoaService(formData: SpecialAssessmentFormValuesNew) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, hoa_id: userAuth.hoaId }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/special-assessments`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateSpecialAssessmentOnHoaService(incidenceId: string, formData: SpecialAssessmentFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/special-assessments/${incidenceId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function deleteSpecialAssessmentOnHoaService(incidenceId: string) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/special-assessments/${incidenceId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}