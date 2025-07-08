import { UserResponse } from "@/@types/user"
import { Tag } from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table"
import { property } from "lodash";

export const UserTableColumns =
    (): ColumnDef<UserResponse>[] => [
        {
            header: 'Nombre',
            accessorKey: 'name',
        },

        {
            header: 'Apellido',
            accessorKey: 'last_name',
        },

        {
            header: 'Propiedad',
            accessorKey: '',
            cell: ({ row }) => {
                return <div>
                    <Tag
                        className={`${row.original.property ? 'bg-primary text-white' : 'bg-red-100 text-red-600'}`}
                    >
                        {row.original.property ? row.original.property.property_identifier : 'Ninguna asignada'}
                    </Tag>
                </div>
            }
        },

        {
            header: 'Imagen',
            accessorKey: 'imagesUrls',
            cell: ({ row }) => {
                return <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-16 w-16">
                    <img
                        src={row.original.imagesUrls.length > 0 ? row.original.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            }
        },


    ]