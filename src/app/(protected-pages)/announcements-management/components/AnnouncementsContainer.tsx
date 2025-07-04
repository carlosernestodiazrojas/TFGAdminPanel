
'use client'

import { Announcement } from "@/@types/announcement"
import AnnouncementsTable from "./table/AnnouncementsTable"
import HeaderHoc from "@/components/header-hoc/HeaderHoc"

const AnnouncementsContainer = (
    { announcements }: {
        announcements: Announcement[]
    }
) => {

    return (
        <HeaderHoc
            title="Gesti&oacute;n de anuncios"
            subtitle="Listado de anuncios de la comunidad"
        >
            <AnnouncementsTable
                announcements={announcements}
            />
        </HeaderHoc>

    )
}


export default AnnouncementsContainer
