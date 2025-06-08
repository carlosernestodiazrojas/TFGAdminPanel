import { CommonArea } from "@/@types/common-area"
import { Tag } from "@/components/ui"
import { ColumnDef } from "@tanstack/react-table"

export const CommonAreasTableColumns =
    (): ColumnDef<CommonArea>[] => [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Descripcion',
            accessorKey: 'description',
        },
        {
            header: 'Necesario reservar?',
            accessorKey: 'is_bookable',
            cell: ({ row }) => {
                return row.original.is_bookable ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        },
        {
            header: 'Capacidad de reserva',
            accessorKey: 'daily_capacity',
        },
    ]