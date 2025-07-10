/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import CommonAreasTable from "./table/CommonAreasTable"

export const CommonAreasContainer = (
    {
        condominiumId,
    }:
        {
            condominiumId: string
        }
) => {
    return (
        <CommonAreasTable
            condominiumId={condominiumId}
        />
    )
}
