
import ApiService from '../ApiService'

import { NestApiResponse } from '@/@types/nest-api-response'
import getServerSession from "@/server/actions/auth/getServerSession"
import { User } from '@/@types/auth'


export async function uploadFileService(formData: FormData) {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/files/upload`,
        method: 'post',
        data: formData,
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },

    })
}

