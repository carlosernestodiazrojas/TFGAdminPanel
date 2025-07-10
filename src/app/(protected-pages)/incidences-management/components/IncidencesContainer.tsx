/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import { Incidence } from "@/@types/incidence"
import IncidencesTable from "./table/IncidencesTable"
import HeaderHoc from "@/components/header-hoc/HeaderHoc"

const IncidencesContainer = (
    { incidences }: {
        incidences: Incidence[]
    }
) => {

    return (
        <HeaderHoc
            title="Gesti&oacute;n de incidencias"
            subtitle="Incidencias reportadas en la comunidad"
        >
            <IncidencesTable
                incidences={incidences}
            />
        </HeaderHoc>

    )
}


export default IncidencesContainer
