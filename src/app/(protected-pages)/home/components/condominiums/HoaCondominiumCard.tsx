/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import { Condominium } from "@/@types/condominium"
import ImageGallery from "@/components/image-gallery/ImageGallery"
import { Button, Card, toast, Tooltip } from "@/components/ui"
import { PiBuilding, PiPencil, PiPlus, PiTrash } from "react-icons/pi"
import { useState, useTransition } from "react"
import { MdPool } from "react-icons/md"

import { PropertiesContainerDialog } from "../properties/PropertiesContainerDialog"
import { CommonAreasContainerDialog } from "../common-areas/CommonAreasContainerDialog"
import CondominiumDrawer from "./drawer/CondominiumDrawer"

import Notification from '@/components/ui/Notification'

export const HoaCondominiumCard = (
    {
        condominium,
        hoaId,
        refresh
    }: { condominium: Condominium; hoaId: string; refresh: () => void }) => {

    const [isLoading, startTransition] = useTransition()

    const [propertiesDialogOpen, setPropertiesDialogOpen] = useState<boolean>(false)
    const [commonAreasDialogOpen, setCommonAreasDialogOpen] = useState<boolean>(false)

    const [condominiumSelected, setCondominiumSelected] = useState<Condominium | null>(null)

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    const refreshData = (action: string) => {

        if (action === 'error') {
            openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al ejecutar la accion')
        }

        startTransition(() => {
            refresh()
            const message = action === 'create' ? 'Se ha creado el edificio' : 'Se ha actualizado el edificio'
            openNotification('bottom-end', 'success', '', message)
        })
    }

    const cardFooter = (
        <div className="flex items-center space-x-2">
            <Tooltip title="Ver propiedades">
                <Button onClick={() => setPropertiesDialogOpen(true)}>
                    <PiBuilding />
                </Button>
            </Tooltip>

            <Tooltip title="Ver zonas comunes">
                <Button onClick={() => setCommonAreasDialogOpen(true)}>
                    <MdPool />
                </Button>
            </Tooltip>

            <Tooltip title="Editar">
                <Button
                    onClick={() => {
                        setCondominiumSelected(condominium)
                        setIsOpenDrawer(true)
                    }}
                >
                    <PiPencil />
                </Button>
            </Tooltip>

        </div>
    )

    let cardHeader = condominium.imagesUrls.length > 0 ? (
        <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-50 w-full">
            <ImageGallery
                images={condominium.imagesUrls}
            />
        </div>
    ) :
        (<div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-50 w-full">
            <img
                src="/img/no-image/3.jpg"
                alt="card header"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>)


    const openNotification = (
        placement:
            | 'top-start'
            | 'top-center'
            | 'top-end'
            | 'bottom-start'
            | 'bottom-center'
            | 'bottom-end',
        type: 'success' | 'warning' | 'danger' | 'info',
        title: string,
        message: string,
    ) => {
        toast.push(<Notification className='z-[2000]' type={type} title={title}> {message} </Notification>, {
            placement: placement,
        })
    }

    return (
        <>

            <CondominiumDrawer
                hoaId={hoaId}
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                condominiumSelected={condominiumSelected}
                refresh={refreshData}
            />

            <PropertiesContainerDialog
                condominiumId={condominium.id}
                dialogIsOpen={propertiesDialogOpen}
                setIsOpen={() => setPropertiesDialogOpen(false)}
            />
            <CommonAreasContainerDialog
                condominiumId={condominium.id}
                dialogIsOpen={commonAreasDialogOpen}
                setIsOpen={() => setCommonAreasDialogOpen(false)}
            />
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
        </>
    )
}