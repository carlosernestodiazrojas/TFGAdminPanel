/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { SpecialAssessment } from "@/@types/specialAssessment"
import { Tag } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table"

export const SpecialAssessmentTableColumns =
    (): ColumnDef<SpecialAssessment>[] => [
        {
            header: 'Titulo',
            accessorKey: 'title',
        },

        {
            header: 'Imagen',
            accessorKey: 'imagesUrls',
            cell: ({ row }) => {
                return <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-16 w-full">
                    <img
                        src={row.original.imagesUrls.length > 0 ? row.original.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            }
        },

        {
            header: 'Importe total',
            accessorKey: 'total_amount'
        },

        {
            header: 'Se votara?',
            accessorKey: 'is_votable',
            cell: ({ row }) => {
                return row.original.is_votable ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        },

        {
            header: 'Solucionada?',
            accessorKey: 'is_approved',
            cell: ({ row }) => {
                return row.original.is_approved ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        }

    ]