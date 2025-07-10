/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


'use server'

import {
    createSpecialAssessmentOnHoaService,
    deleteSpecialAssessmentOnHoaService,
    getSpecialAssessmentsByHoaIdService,
    updateSpecialAssessmentOnHoaService
} from "@/services/special-assessment-services/SpecialAssessmentService"

import { SpecialAssessmentFormValues, SpecialAssessmentFormValuesNew } from "./components/form/SpecialAssessmentForm"
import { revalidatePath } from "next/cache"
import { uploadFileService } from "@/services/file-services/FileService"

export async function getSpecialAssessmentsByHoaId() {
    const response = await getSpecialAssessmentsByHoaIdService()
    return response
}

export async function createSpecialAssessmentOnHoa(formData: SpecialAssessmentFormValuesNew) {
    const response = await createSpecialAssessmentOnHoaService(formData)
    revalidatePath('/special-assessments-management')
    return response
}

export async function updateSpecialAssessmentOnHoa(announcementId: string, formData: SpecialAssessmentFormValues) {
    const response = await updateSpecialAssessmentOnHoaService(announcementId, formData)
    revalidatePath('/special-assessments-management')
    return response
}

export async function deleteSpecialAssessmentOnHoa(announcementId: string) {
    const response = await deleteSpecialAssessmentOnHoaService(announcementId)
    revalidatePath('/special-assessments-management')
    return response
}

export async function uploadFileImage(formData: FormData) {
    const response = await uploadFileService(formData)
    return response
} 