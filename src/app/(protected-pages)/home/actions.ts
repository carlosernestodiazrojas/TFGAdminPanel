/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use server'

import { getHoaByIdService } from "@/services/hoa-services/HoaService"
import { createCondominiumOnHoaIdService, getCondominiumByIdService, getCondominiumsByHoaIdService, updateCondominiumOnHoaService } from "@/services/hoa-services/CondominiumService"
import { createPropertyOnCondominiumIdService, deletePropertyOnCondominiumService, getPropertiesByCondominiumIdService, updatePropertyOnCondominiumService } from "@/services/hoa-services/PropertyService"
import { PropertyFormValues } from "./components/properties/form/PropertyForm"
import { createCommonAreaOnCondominiumIdService, deleteCommonAreaOnCondominiumService, getCommonAreasByCondominiumIdService, updateCommonAreaOnCondominiumService } from "@/services/hoa-services/CommonAreaService"
import { CommonAreaFormValues } from "./components/common-areas/form/CommonAreaForm"

import { getUserByIdService } from "@/services/user-services/UserService"
import { CondominiumFormValues } from "./components/condominiums/form/CondominiumForm"

export async function getHoaById() {
    const response = await getHoaByIdService()
    return response
}

export async function getUserById(id: string) {
    const response = await getUserByIdService(id)
    return response
}

export async function getCondominiumById(id: string) {
    const response = await getCondominiumByIdService({ id })
    return response
}

export async function getCondominiumsByHoaId() {
    const response = await getCondominiumsByHoaIdService()
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


export async function getCommonAreasByCondominiumId(id: string) {
    const response = await getCommonAreasByCondominiumIdService({ id })
    return response
}

export async function createCommonAreaOnCondominiumId(condominiumId: string, formData: CommonAreaFormValues) {
    const response = await createCommonAreaOnCondominiumIdService(condominiumId, formData)
    return response
}

export async function updateCommonAreaOnCondominium(commonAreaId: string, formData: CommonAreaFormValues) {
    const response = await updateCommonAreaOnCondominiumService(commonAreaId, formData)
    return response
}

export async function deleteCommonAreaOnCondominium(commonAreaId: string) {
    const response = await deleteCommonAreaOnCondominiumService(commonAreaId)
    return response
}


export async function createCondominiumOnHoaId(formData: CondominiumFormValues) {
    const response = await createCondominiumOnHoaIdService(formData)
    return response
}

export async function updateCondominiumOnHoa(propertyId: string, formData: CondominiumFormValues) {
    const response = await updateCondominiumOnHoaService(propertyId, formData)
    return response
}
