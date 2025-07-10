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
import { Incidence } from '@/@types/incidence'

import { IncidenceTableColumns } from './IncidencesTableColumns'
import IncidenceDrawer from '../drawer/IncidenceDrawer'
import { Button, toast } from '@/components/ui'
import { PiPlus } from 'react-icons/pi'
import { deleteIncidenceOnHoa } from '../../actions'
import { CustomLoaderDeep } from '@/components/custom-loader'
import { BiPencil, BiTrash } from 'react-icons/bi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'

const { Tr, Th, Td, THead, TBody } = Table

const IncidencesTable = ({ incidences }: { incidences: Incidence[]; }) => {

    const [isLoading, startTransition] = useTransition()

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false)

    const [incidenceSelected, setIncidenceSelected] = useState<Incidence | null>(null)

    const columns = IncidenceTableColumns()

    const table = useReactTable({
        data: incidences,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const openEditDrawer = (incidence: Incidence) => {
        setIncidenceSelected(incidence)
        setIsOpenDrawer(true)
    }

    const openDeleteConfirm = (incidence: Incidence) => {
        setIncidenceSelected(incidence)
        setIsOpenDeleteConfirm(true)
    }

    const deleteIncidence = () => {
        if (incidenceSelected) {
            setIsOpenDeleteConfirm(false)
            startTransition(async () => {
                try {
                    await deleteIncidenceOnHoa(incidenceSelected.id)
                    setIncidenceSelected(null)
                    openNotification('bottom-end', 'success', '', 'Se ha archivado la incidencia')
                } catch (error) {
                    openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al archivar la incidencia')
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
            const message = action === 'create' ? 'Se ha creado la incidencia correctamente' : 'Se ha actualizado la incidencia correctamente'
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
            <IncidenceDrawer
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                incidenceSelected={incidenceSelected}
                refresh={refresh}
            />
            <ConfirmDialog
                isOpen={isOpenDeleteConfirm}
                cancelText='Cancelar'
                confirmText='Confirmar'
                closable={false}
                title="Desea eliminar esta incidencia?"
                type='danger'
                onCancel={() => {
                    setIsOpenDeleteConfirm(false)
                }}
                onConfirm={() => {
                    deleteIncidence()
                }}
            />
            <div className='flex justify-end'>
                <Button
                    variant='solid'
                    onClick={() => {
                        setIncidenceSelected(null)
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

export default IncidencesTable