
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
