import { Announcement } from "@/@types/announcement"
import { ColumnDef } from "@tanstack/react-table"
import { format } from 'date-fns';

export const AnnouncementTableColumns =
    (): ColumnDef<Announcement>[] => [
        {
            header: 'Titulo',
            accessorKey: 'title',
        },
        {
            header: 'Visible desde',
            accessorKey: 'from',
            cell: ({ row }) => {
                return format(new Date(row.original.from), 'dd/MM/yyyy')
            }
        },
        {
            header: 'Hasta',
            accessorKey: 'to',
            cell: ({ row }) => {
                return format(new Date(row.original.to), 'dd/MM/yyyy')
            }
        }

    ]