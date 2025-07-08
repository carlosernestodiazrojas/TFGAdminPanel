'use client'

import { useState, useTransition } from 'react'
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    flexRender,
} from '@tanstack/react-table'
import { UserResponse } from '@/@types/user'

import { UserTableColumns } from './UsersTableColumns'
import UserDrawer from '../drawer/UsersDrawer'
import { Button, toast } from '@/components/ui'
import { PiPlus } from 'react-icons/pi'
import { CustomLoaderDeep } from '@/components/custom-loader'
import { BiPencil, BiTrash, BiBuilding } from 'react-icons/bi'
import { MdPassword } from 'react-icons/md'
import Notification from '@/components/ui/Notification'
import { Condominium } from '@/@types/condominium'

import AssignProperty from '../assign-property/AssignProperty'
import ChangePassword, { PasswordFormValues } from '../change-password/ChangePassword'
import { Property } from '@/@types/property'

import { changePassword, resetPassword, updateUserProperty } from '../../actions'

const { Tr, Th, Td, THead, TBody } = Table

const UsersTable = ({ users, condominiums }: { users: UserResponse[]; condominiums: Condominium[] }) => {

    const [isLoading, startTransition] = useTransition()

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    const [isOpenAssignPropertyConfirm, setIsOpenAssignPropertyConfirm] = useState<boolean>(false)

    const [isOpenChangePasswordConfirm, setIsOpenChangePasswordConfirm] = useState<boolean>(false)

    const [userSelected, setUserSelected] = useState<UserResponse | null>(null)

    const columns = UserTableColumns()

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const openEditDrawer = (user: UserResponse) => {
        setUserSelected(user)
        setIsOpenDrawer(true)
    }

    const openAssignPropertyModal = (user: UserResponse) => {
        setUserSelected(user)
        setIsOpenAssignPropertyConfirm(true)
    }

    const openChangePasswordModal = (user: UserResponse) => {
        setUserSelected(user)
        setIsOpenChangePasswordConfirm(true)
    }


    const refresh = (action: string) => {

        if (action === 'error') {
            openNotification('bottom-end', 'danger', '', 'Ha ocurrido un error al ejecutar la accion')
            return
        }

        startTransition(async () => {
            const message = action === 'create' ? 'Se ha registrado el usuario' : 'Se ha actualizado el usuario'
            openNotification('bottom-end', 'success', '', message)
            setUserSelected(null)
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


    const onAssignProperty = async (property: Property) => {

        if (userSelected) {
            const response = await updateUserProperty(userSelected?.id, { property: property.id })
            const { success, data } = response
            if (success) {
                setIsOpenAssignPropertyConfirm(false)
                openNotification('bottom-end', 'success', '', 'Se ha asignado la propiedad al usuario')
            }
        }
    }

    const onChangePassword = async (formValues: PasswordFormValues) => {

        if (userSelected) {
            const response = await resetPassword(userSelected?.id, { newPass: formValues.password })
            const { success } = response
            if (success) {
                setIsOpenChangePasswordConfirm(false)
                openNotification('bottom-end', 'success', '', 'Se ha cambiado la contraseña del usuario')
            }
        }
    }

    return (
        <>
            <UserDrawer
                isOpen={isOpenDrawer}
                setIsOpen={setIsOpenDrawer}
                userSelected={userSelected}
                refresh={refresh}
            />

            <AssignProperty
                condominiumsAvailable={condominiums}
                dialogIsOpen={isOpenAssignPropertyConfirm}
                onDialogClose={() => setIsOpenAssignPropertyConfirm(false)}
                onDialogOk={onAssignProperty}
            />

            <ChangePassword
                user={userSelected}
                dialogIsOpen={isOpenChangePasswordConfirm}
                onDialogClose={() => setIsOpenChangePasswordConfirm(false)}
                onDialogOk={onChangePassword}
            />

            <div className='flex justify-end'>
                <Button
                    variant='solid'
                    onClick={() => {
                        setUserSelected(null)
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
                                                openChangePasswordModal(row.original)
                                            }}
                                        >
                                            <MdPassword />
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                openAssignPropertyModal(row.original)
                                            }}
                                        >
                                            <BiBuilding />
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

export default UsersTable