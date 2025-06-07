
'use server'

import { getHoaByIdService } from "@/services/hoa-services/HoaService"
import { getCondominiumByIdService, getCondominiumsByHoaIdService } from "@/services/hoa-services/CondominiumService"

export async function getHoaById() {
    const response = await getHoaByIdService()
    return response
}

export async function getCondominiumById(id: string) {
    const response = await getCondominiumByIdService({ id })
    return response
}

export async function getCondominiumsByHoaId(id: string) {
    const response = await getCondominiumsByHoaIdService({ id })
    return response
}
