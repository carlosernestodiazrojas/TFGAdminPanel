
import { getCondominiumsByHoaId } from "../home/actions"
import { getUsersByHoaId } from "./actions"

import UsersContainer from "./components/UsersContainer"

export const revalidate = 10

const UsersManagementPage = async () => {

    let response
    let responseCondominiums

    try {
        response = await getUsersByHoaId()
        responseCondominiums = await getCondominiumsByHoaId()
    } catch (error) {

    }

    return (
        <UsersContainer
            users={response?.data}
            condominiums={responseCondominiums?.data}
        />
    )
}

export default UsersManagementPage
