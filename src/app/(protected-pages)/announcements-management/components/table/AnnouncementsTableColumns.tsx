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