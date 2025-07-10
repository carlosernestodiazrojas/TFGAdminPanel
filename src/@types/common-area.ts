/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


export type CommonArea = {
    id: string
    name: string
    description: string
    is_deleted: boolean
    is_bookable: boolean
    daily_capacity: number
    imagesUrls: string[]
}