/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export type SpecialAssessment = {
    id: string
    title: string
    description: string
    is_votable: boolean
    is_approved: boolean
    total_amount: number
    individual_amount: number
    imagesUrls: string[]
}