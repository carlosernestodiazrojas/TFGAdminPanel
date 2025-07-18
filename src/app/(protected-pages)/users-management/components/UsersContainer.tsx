/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


'use client'

import { UserResponse } from '@/@types/user'
import UsersTable from "./table/UsersTable"
import HeaderHoc from "@/components/header-hoc/HeaderHoc"
import { Condominium } from '@/@types/condominium'

const UsersContainer = (
    { users, condominiums }: {
        users: UserResponse[]
        condominiums: Condominium[]
    }
) => {

    return (
        <HeaderHoc
            title="Gesti&oacute;n de usuarios"
            subtitle="Usuarios y propietarios de la comunidad"
        >
            <UsersTable
                users={users}
                condominiums={condominiums}
            />
        </HeaderHoc>

    )
}


export default UsersContainer
