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

export async function getHoaByIdService() {
    const session = await getServerSession()
    const userAuth = { ...session?.user } as User
    return await ApiService.fetchDataWithAxios<NestApiResponse>({
        url: `${process.env.API_URL}/hoas/${userAuth.hoaId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${userAuth.accessToken}`,
        },
    })
}