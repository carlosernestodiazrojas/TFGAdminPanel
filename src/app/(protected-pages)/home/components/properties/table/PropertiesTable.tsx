/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { useState, useEffect, useTransition } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table'
import { Property } from '@/@types/property'

import { PropertiesTableColumns } from './PropertiesTableColumns'
import PropertyDrawer from '../drawer/PropertyDrawer'
import { Button, toast } from '@/components/ui'
import { PiPlus } from 'react-icons/pi'
import { deletePropertyOnCondominium, getPropertiesByCondominiumId } from '../../../actions'
import { CustomLoaderDeep } from '@/components/custom-loader'
import { BiPencil, BiTrash } from 'react-icons/bi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'

const { Tr, Th, Td, THead, TBody } = Table

const PropertiesTable = ({ condominiumId }: { condominiumId: string; }) => {

    const [isLoading, startTransition] = useTransition()

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false)

    const [propertiesData, setPropertiesData] = useState<Property[]>([])

    const [propertySelected, setPropertySelected] = useState<Property | null>(null)

    const columns = PropertiesTableColumns()

    const table = useReactTable({
        data: propertiesData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const refreshPropertiesData = async () => {
        await getPropertiesByCondominiumId(condominiumId)
            .then((response) => {
                const { data } = response
                setPropertiesData(data)
            })
            .catch((error) => {
                setPropertiesData([])
            })
            .finally(() => {

            })
    }

    useEffect(() => {

        startTransition(async () => {
            await refreshPropertiesData()
        })

    }, [])

    const refresh = (action: string) => {

        if (action === 'error') {
            openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al ejecutar la accion')
        }

        startTransition(async () => {
            await refreshPropertiesData()
            const message = action === 'create' ? 'Se ha creado la propiedad' : 'Se ha actualizado la propiedad'
            openNotification('bottom-end', 'success', '', message)
        })
    }

    const openEditDrawer = (property: Property) => {
        setPropertySelected(property)
        setIsOpenDrawer(true)
    }

    const openDeleteConfirm = (property: Property) => {
        setPropertySelected(property)
        setIsOpenDeleteConfirm(true)
    }

    const deleteProperty = () => {
        if (propertySelected) {
            setIsOpenDeleteConfirm(false)
            startTransition(async () => {
                try {
                    await deletePropertyOnCondominium(propertySelected.id)
                    await refreshPropertiesData()
                    setPropertySelected(null)
                    openNotification('bottom-end', 'success', '', 'Se ha archivado la propiedad')
                } catch (error) {
                    openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al archivar la propiedad')
                }

            })
        }
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
        <div>
            <PropertyDrawer
                condominiumId={condominiumId}
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                propertySelected={propertySelected}
                refresh={refresh}
            />
            <ConfirmDialog
                isOpen={isOpenDeleteConfirm}
                cancelText='Cancelar'
                confirmText='Confirmar'
                closable={false}
                title="Desea eliminar esta propiedad?"
                type='danger'
                onCancel={() => {
                    setIsOpenDeleteConfirm(false)
                }}
                onConfirm={() => {
                    deleteProperty()
                }}
            />
            <div className='flex justify-end'>
                <Button
                    variant='solid'
                    onClick={() => {
                        setPropertySelected(null)
                        setIsOpenDrawer(true)
                    }}
                    icon={<PiPlus />}
                >
                    <span>Crear</span>
                </Button>
            </div>

            {isLoading && <CustomLoaderDeep />}
            <div className='max-h-[600] overflow-y-auto'>
                <table className="table-default table-hover">
                    <THead className='sticky top-0 bg-white z-20'>
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
                    <TBody>
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
            </div>
        </div>
    )
}

export default PropertiesTable