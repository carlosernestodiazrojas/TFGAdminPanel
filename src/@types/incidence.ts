/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export type Incidence = {
    id: string
    name: string
    description: string
    is_votable: boolean
    is_solved?: boolean
    solved_at?: string
    imagesUrls: string[]
}