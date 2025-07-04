
'use server'

import { createAnnouncementOnHoaService, deleteAnnouncementOnHoaService, getAnnouncementsByHoaIdService, updateAnnouncementOnHoaService } from "@/services/announcement-services/AnnouncementService"
import { AnnouncementFormValues } from "./components/form/AnnouncementForm"
import { revalidatePath } from "next/cache"
import { uploadFileService } from "@/services/file-services/FileService"

export async function getAnnouncementsByHoaId() {
    const response = await getAnnouncementsByHoaIdService()
    return response
}

export async function createAnnouncementOnHoa(formData: AnnouncementFormValues) {
    const response = await createAnnouncementOnHoaService(formData)
    revalidatePath('/announcements-management')
    return response
}

export async function updateAnnouncementOnHoa(announcementId: string, formData: AnnouncementFormValues) {
    const response = await updateAnnouncementOnHoaService(announcementId, formData)
    revalidatePath('/announcements-management')
    return response
}

export async function deleteAnnouncementOnHoa(announcementId: string) {
    const response = await deleteAnnouncementOnHoaService(announcementId)
    revalidatePath('/announcements-management')
    return response
}

export async function uploadFileImage(formData: FormData) {
    const response = await uploadFileService(formData)
    return response
} 