import { useState, useEffect, useTransition } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table'
import { CommonArea } from '@/@types/common-area'

import { CommonAreasTableColumns } from './CommonAreasTableColumns'
import CommonAreaDrawer from '../drawer/CommonAreaDrawer'
import { Button, toast } from '@/components/ui'
import { PiPlus } from 'react-icons/pi'
import { deleteCommonAreaOnCondominium, getCommonAreasByCondominiumId } from '../../../actions'
import { CustomLoaderDeep } from '@/components/custom-loader'
import { BiPencil, BiTrash } from 'react-icons/bi'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'

const { Tr, Th, Td, THead, TBody } = Table

const CommonAreasTable = ({ condominiumId }: { condominiumId: string; }) => {

    const [isLoading, startTransition] = useTransition()

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState<boolean>(false)

    const [commonAreasData, setCommonAreasData] = useState<CommonArea[]>([])

    const [commonAreaSelected, setCommonAreaSelected] = useState<CommonArea | null>(null)

    const columns = CommonAreasTableColumns()

    const table = useReactTable({
        data: commonAreasData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const refreshCommonAreasData = async () => {
        await getCommonAreasByCondominiumId(condominiumId)
            .then((response) => {
                const { data } = response
                setCommonAreasData(data)
            })
            .catch((error) => {
                setCommonAreasData([])
            })
            .finally(() => {

            })
    }

    useEffect(() => {

        startTransition(async () => {
            await refreshCommonAreasData()
        })

    }, [])

    const refresh = (action: string) => {

        if (action === 'error') {
            openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al ejecutar la accion')
        }

        startTransition(async () => {
            await refreshCommonAreasData()
            const message = action === 'create' ? 'Se ha creado la zona comun' : 'Se ha actualizado la zona comun'
            openNotification('bottom-end', 'success', '', message)
        })
    }

    const openEditDrawer = (commonArea: CommonArea) => {
        setCommonAreaSelected(commonArea)
        setIsOpenDrawer(true)
    }

    const openDeleteConfirm = (commonArea: CommonArea) => {
        setCommonAreaSelected(commonArea)
        setIsOpenDeleteConfirm(true)
    }

    const deleteProperty = () => {
        if (commonAreaSelected) {
            setIsOpenDeleteConfirm(false)
            startTransition(async () => {
                try {
                    await deleteCommonAreaOnCondominium(commonAreaSelected.id)
                    await refreshCommonAreasData()
                    setCommonAreaSelected(null)
                    openNotification('bottom-end', 'success', '', 'Se ha archivado la zona comun')
                } catch (error) {
                    openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al archivar la zona comun')
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
            <CommonAreaDrawer
                condominiumId={condominiumId}
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                commonAreaSelected={commonAreaSelected}
                refresh={refresh}
            />
            <ConfirmDialog
                isOpen={isOpenDeleteConfirm}
                cancelText='Cancelar'
                confirmText='Confirmar'
                closable={false}
                title="Desea eliminar esta zona comun?"
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
                        setCommonAreaSelected(null)
                        setIsOpenDrawer(true)
                    }}
                    icon={<PiPlus />}
                >
                    <span>Crear</span>
                </Button>
            </div>

            {isLoading && <CustomLoaderDeep />}
            <div className='max-h-[600] overflow-y-auto'>
                <Table >
                    <THead className='sticky top-0'>
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
                </Table>
            </div>
        </div>
    )
}

export default CommonAreasTable