/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

export type HorizontalMenuMeta =
    | {
        layout: 'default'
    }
    | {
        layout: 'columns'
        showColumnTitle?: boolean
        columns: 1 | 2 | 3 | 4 | 5
    }
    | {
        layout: 'tabs'
        columns: 1 | 2 | 3 | 4 | 5
    }

export interface NavigationTree {
    key: string
    path: string
    isExternalLink?: boolean
    title: string
    translateKey: string
    icon: string
    type: 'title' | 'collapse' | 'item'
    authority: string[]
    subMenu: NavigationTree[]
    description?: string
    meta?: {
        horizontalMenu?: HorizontalMenuMeta
        description?: {
            translateKey: string
            label: string
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TranslationFn = any
