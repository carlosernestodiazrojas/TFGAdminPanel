/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


'use client'

import { SpecialAssessment } from "@/@types/specialAssessment"
import SpecialAssessmentsTable from "./table/SpecialAssessmentsTable"
import HeaderHoc from "@/components/header-hoc/HeaderHoc"

const SpecialAssessmentsContainer = (
    { specialAssessments }: {
        specialAssessments: SpecialAssessment[]
    }
) => {

    return (
        <HeaderHoc
            title="Gesti&oacute;n de derramas"
            subtitle="Derramas de la comunidad"
        >
            <SpecialAssessmentsTable
                specialAssessments={specialAssessments}
            />
        </HeaderHoc>

    )
}


export default SpecialAssessmentsContainer
