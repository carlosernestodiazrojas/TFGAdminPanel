/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import { Hoa } from "@/@types/hoa"
import { getCondominiumsByHoaId } from "../../actions"
import { useEffect, useState, useTransition } from "react"
import { Condominium } from "@/@types/condominium"
import { HoaCondominiumCard } from "./HoaCondominiumCard"
import { CustomLoaderDeeper } from "@/components/custom-loader"
import CondominiumDrawer from "./drawer/CondominiumDrawer"
import { Button } from "@/components/ui"
import { PiPlus } from "react-icons/pi"

export const HoaCondominiumsContainer = ({
    hoa
}: {
    hoa: Hoa
}) => {

    const [isLoading, startTransition] = useTransition()

    const [condominiumsData, setCondominiumsData] = useState<Condominium[]>([])

    const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)

    useEffect(() => {

        startTransition(() => {
            getCondominiumsByHoaId()
                .then((response) => {
                    const { data } = response
                    setCondominiumsData(data)
                })
                .catch((error) => {
                    setCondominiumsData([])
                })
                .finally(() => {
                })
        })

    }, [])

    const refresh = () => {
        getCondominiumsByHoaId()
            .then((response) => {
                const { data } = response
                setCondominiumsData(data)
            })
            .catch((error) => {
                setCondominiumsData([])
            })
            .finally(() => {
            })
    }

    return (
        <>
            <Button
                variant='solid'
                onClick={() => {
                    setIsOpenDrawer(true)
                }}
                    icon={<PiPlus />}
                >
                                <span>Crear</span>
                            </Button>
            <div className="flex space-x-4">
                {isLoading && <CustomLoaderDeeper />}

                <CondominiumDrawer
                    hoaId={hoa.id}
                    isOpen={isOpenDrawer}
                    setIsOpen={setIsOpenDrawer}
                    condominiumSelected={null}
                    refresh={refresh}
                />

                {condominiumsData.map((condominium) => {
                    return <HoaCondominiumCard
                        key={condominium.id}
                        condominium={condominium}
                        hoaId={hoa.id}
                        refresh={refresh}
                    />
                })}
            </div>
        </>

    )
}
