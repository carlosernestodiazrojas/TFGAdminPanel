'use client'

import { Condominium } from "@/@types/condominium"
import { Button, Card, Tooltip } from "@/components/ui"
import { PiBuilding, PiPencil, PiPlus, PiTrash } from "react-icons/pi"


export const HoaCondominiumCard = ({ condominium }: { condominium: Condominium }) => {

    const cardFooter = (
        <div className="flex items-center space-x-2">
            <Tooltip title="Ver propiedades">
                <Button>
                    <PiBuilding />
                </Button>
            </Tooltip>


            <Tooltip title="Editar">
                <Button>
                    <PiPencil />
                </Button>
            </Tooltip>

            <Tooltip title="Archivar">
                <Button>
                    <PiTrash />
                </Button>
            </Tooltip>


        </div>
    )

    const cardHeader = (
        <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-60 w-full">
            <img
                src="/img/no-image/3.jpg"
                alt="card header"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>
    )

    return (
        <div className="max-w-xs">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={{
                    content: cardHeader,
                    bordered: false,
                    className: 'p-0',
                }}
                footer={{
                    content: cardFooter,
                    bordered: false,
                }}
            >
                <span className="text-emerald-600 font-semibold">
                    {condominium.name}
                </span>
                <h4 className="font-bold my-3">{condominium.address}</h4>
                <p>
                    {condominium.description}
                </p>
            </Card>
        </div>
    )
}