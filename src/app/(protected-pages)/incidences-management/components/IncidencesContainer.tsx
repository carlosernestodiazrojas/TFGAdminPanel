
'use client'

import { Incidence } from "@/@types/incidence"
import IncidencesTable from "./table/IncidencesTable"
import HeaderHoc from "@/components/header-hoc/HeaderHoc"

const IncidencesContainer = (
    { incidences }: {
        incidences: Incidence[]
    }
) => {
    console.log("Incidencias --- ", incidences)
    return (
        <HeaderHoc
            title="Gestion de incidencias"
            subtitle="Incidencias reportadas en la comunidad"
        >
            <IncidencesTable
                incidences={incidences}
            />
        </HeaderHoc>

    )
}


export default IncidencesContainer
