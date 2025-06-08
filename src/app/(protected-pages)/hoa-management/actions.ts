
'use server'

import { getHoaByIdService } from "@/services/hoa-services/HoaService"
import { getCondominiumByIdService, getCondominiumsByHoaIdService } from "@/services/hoa-services/CondominiumService"
import { createPropertyOnCondominiumIdService, deletePropertyOnCondominiumService, getPropertiesByCondominiumIdService, updatePropertyOnCondominiumService } from "@/services/hoa-services/PropertyService"
import { PropertyFormValues } from "./components/properties/form/PropertyForm"

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

export async function getPropertiesByCondominiumId(id: string) {
    const response = await getPropertiesByCondominiumIdService({ id })
    return response
}

export async function createPropertyOnCondominiumId(condominiumId: string, formData: PropertyFormValues) {
    const response = await createPropertyOnCondominiumIdService(condominiumId, formData)
    return response
}

export async function updatePropertyOnCondominium(propertyId: string, formData: PropertyFormValues) {
    const response = await updatePropertyOnCondominiumService(propertyId, formData)
    return response
}

export async function deletePropertyOnCondominium(propertyId: string) {
    const response = await deletePropertyOnCondominiumService(propertyId)
    return response
}
