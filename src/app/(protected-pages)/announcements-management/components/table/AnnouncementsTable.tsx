/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import { useState, useTransition } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table'
import { Announcement } from '@/@types/announcement'

import { AnnouncementTableColumns } from './AnnouncementsTableColumns'
import AnnouncementDrawer from '../drawer/AnnouncementDrawer'
import { Button, toast } from '@/components/ui'
import { PiPlus } from 'react-icons/pi'
import { deleteAnnouncementOnHoa } from '../../actions'
import { CustomLoaderDeep } from '@/components/custom-loader'
import { BiPencil, BiTrash } from 'react-icons/bi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'

const { Tr, Th, Td, THead, TBody } = Table

const AnnouncementsTable = ({ announcements }: { announcements: Announcement[]; }) => {

    const [isLoading, startTransition] = useTransition()

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false)

    const [announcementSelected, setAnnouncementSelected] = useState<Announcement | null>(null)

    const columns = AnnouncementTableColumns()

    const table = useReactTable({
        data: announcements,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const openEditDrawer = (announcement: Announcement) => {
        setAnnouncementSelected(announcement)
        setIsOpenDrawer(true)
    }

    const openDeleteConfirm = (announcement: Announcement) => {
        setAnnouncementSelected(announcement)
        setIsOpenDeleteConfirm(true)
    }

    const deleteAnnouncement = () => {
        if (announcementSelected) {
            setIsOpenDeleteConfirm(false)
            startTransition(async () => {
                try {
                    await deleteAnnouncementOnHoa(announcementSelected.id)
                    setAnnouncementSelected(null)
                    openNotification('bottom-end', 'success', '', 'Se ha archivado el anuncio')
                } catch (error) {
                    openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al archivar el anuncio')
                }

            })
        }
    }

    const refresh = (action: string) => {

        if (action === 'error') {
            openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al ejecutar la accion')
            return
        }

        startTransition(async () => {
            const message = action === 'create' ? 'Se ha creado el anuncio correctamente' : 'Se ha actualizado el anuncio correctamente'
            openNotification('bottom-end', 'success', '', message)
            return
        })
    }

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
            <AnnouncementDrawer
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                announcementSelected={announcementSelected}
                refresh={refresh}
            />
            <ConfirmDialog
                isOpen={isOpenDeleteConfirm}
                cancelText='Cancelar'
                confirmText='Confirmar'
                closable={false}
                title="Desea eliminar este anuncio?"
                type='danger'
                onCancel={() => {
                    setIsOpenDeleteConfirm(false)
                }}
                onConfirm={() => {
                    deleteAnnouncement()
                }}
            />
            <div className='flex justify-end'>
                <Button
                    variant='solid'
                    onClick={() => {
                        setAnnouncementSelected(null)
                        setIsOpenDrawer(true)
                    }}
                    icon={<PiPlus />}
                >
                    <span>Crear</span>
                </Button>
            </div>

            {isLoading && <CustomLoaderDeep />}
            <div className='max-h-[600px] overflow-y-auto'>
                <table className="table-default table-hover">
                    <THead className="sticky top-0 bg-white z-20">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}

                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </Th>
                                    )
                                })}
                            </Tr>
                        ))}
                    </THead>
                    <TBody >
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                    <Td className='space-x-2'>
                                        <Button
                                            onClick={() => {
                                                openEditDrawer(row.original)
                                            }}
                                        >
                                            <BiPencil />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                openDeleteConfirm(row.original)
                                            }}
                                        >
                                            <BiTrash />
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })}

                    </TBody>
                </table>
            </div >
        </>
    )
}

export default AnnouncementsTable