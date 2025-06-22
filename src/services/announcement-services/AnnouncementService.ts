
import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'


import { AnnouncementFormValues } from '@/app/(protected-pages)/announcements-management/components/form/AnnouncementForm'


export async function getAnnouncementsByHoaIdService() {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/announcements/allByHoa/${userAuth.hoaId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function createAnnouncementOnHoaService(formData: AnnouncementFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData, hoa_id: userAuth.hoaId }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/announcements`,
        method: 'post',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function updateAnnouncementOnHoaService(announcementId: string, formData: AnnouncementFormValues) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    const data = { ...formData }
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/announcements/${announcementId}`,
        method: 'patch',
        data,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}

export async function deleteAnnouncementOnHoaService(announcementId: string) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/announcements/${announcementId}`,
        method: 'delete',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}