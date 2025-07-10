/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import { getAnnouncementsByHoaId } from "./actions"
import AnnouncementsContainer from "./components/AnnouncementsContainer"

export const revalidate = 10

const AnnouncementsManagementPage = async () => {

    let response

    try {
        response = await getAnnouncementsByHoaId()
    } catch (error) {

    }

    return (
        <AnnouncementsContainer
            announcements={response?.data}
        />
    )
}

export default AnnouncementsManagementPage
