/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


export type Property = {
    id: string
    property_identifier: string
    property_type: string
    is_deleted: boolean
    has_storage_room: boolean
    has_parking_space: boolean
    current_on_payments: boolean
}