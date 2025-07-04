
import { getSpecialAssessmentsByHoaId } from "./actions"

import SpecialAssessmentsContainer from "./components/SpecialAssessmentsContainer"

export const revalidate = 10

const SpecialAssessmentsManagementPage = async () => {

    let response

    try {
        response = await getSpecialAssessmentsByHoaId()
    } catch (error) {

    }

    return (
        <SpecialAssessmentsContainer
            specialAssessments={response?.data}
        />
    )
}

export default SpecialAssessmentsManagementPage
