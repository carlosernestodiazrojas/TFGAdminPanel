/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */
import PropertiesTable from "./table/PropertiesTable"

export const PropertiesContainer = (
    {
        condominiumId,
    }:
        {
            condominiumId: string
        }
) => {
    return (
        <PropertiesTable
            condominiumId={condominiumId}
        />
    )
}
