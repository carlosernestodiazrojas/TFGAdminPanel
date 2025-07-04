import { Incidence } from "@/@types/incidence"
import { Tag } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';

export const IncidenceTableColumns =
    (): ColumnDef<Incidence>[] => [
        {
            header: 'Titulo',
            accessorKey: 'name',
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
            accessorKey: 'is_solved',
            cell: ({ row }) => {
                return row.original.is_solved ? (<Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                    Si
                </Tag>) : <Tag className="bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100 border-0 rounded">
                    No
                </Tag>
            }
        }

    ]