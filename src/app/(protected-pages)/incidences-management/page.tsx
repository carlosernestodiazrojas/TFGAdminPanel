/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { getIncidencesByHoaId } from "./actions"

import IncidencesContainer from "./components/IncidencesContainer"

export const revalidate = 10

const IncidencesManagementPage = async () => {

    let response

    try {
        response = await getIncidencesByHoaId()
    } catch (error) {

    }

    return (
        <IncidencesContainer
            incidences={response?.data}
        />
    )
}

export default IncidencesManagementPage
