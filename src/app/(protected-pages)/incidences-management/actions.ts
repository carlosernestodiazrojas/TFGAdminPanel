
'use server'

import {
    createIncidenceOnHoaService,
    deleteIncidenceOnHoaService,
    getIncidencesByHoaIdService,
    updateIncidenceOnHoaService
} from "@/services/incidence-services/IncidenceService"

import { IncidenceFormValues, IncidenceFormValuesNew } from "./components/form/IncidenceForm"
import { revalidatePath } from "next/cache"
import { uploadFileService } from "@/services/file-services/FileService"

export async function getIncidencesByHoaId() {
    const response = await getIncidencesByHoaIdService()
    return response
}

export async function createIncidenceOnHoa(formData: IncidenceFormValuesNew) {
    const response = await createIncidenceOnHoaService(formData)
    revalidatePath('/incidences-management')
    return response
}

export async function updateIncidenceOnHoa(announcementId: string, formData: IncidenceFormValues) {
    const response = await updateIncidenceOnHoaService(announcementId, formData)
    revalidatePath('/incidences-management')
    return response
}

export async function deleteIncidenceOnHoa(announcementId: string) {
    const response = await deleteIncidenceOnHoaService(announcementId)
    revalidatePath('/incidences-management')
    return response
}

export async function uploadFileImage(formData: FormData) {
    const response = await uploadFileService(formData)
    return response
} 