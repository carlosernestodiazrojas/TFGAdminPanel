/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */
import { Property } from "@/@types/property"
import { Tag } from "@/components/ui"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"

export const PropertiesTableColumns =
    (): ColumnDef<Property>[] => [
        {
            header: 'Numero',
            accessorKey: 'property_identifier',
        },
        {
            header: 'Tipo',
            accessorKey: 'property_type',
        },
        {
            header: 'Trastero?',
            accessorKey: 'has_storage_room',
            cell: ({ row }) => {
                return row.original.has_storage_room ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        },
        {
            header: 'Parking?',
            accessorKey: 'has_parking_space',
            cell: ({ row }) => {
                return row.original.has_parking_space ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        },

        {
            header: 'Corriente de pago?',
            accessorKey: 'current_on_payments',
            cell: ({ row }) => {
                return row.original.current_on_payments ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        },
    ]