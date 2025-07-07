'use client'

import { Hoa } from "@/@types/hoa"
import { getCondominiumsByHoaId } from "../../actions"
import { useEffect, useState, useTransition } from "react"
import { Condominium } from "@/@types/condominium"
import { HoaCondominiumCard } from "./HoaCondominiumCard"
import { CustomLoaderDeeper } from "@/components/custom-loader"

export const HoaCondominiumsContainer = ({
    hoa
}: {
    hoa: Hoa
}) => {

    const [isLoading, startTransition] = useTransition()

    const [condominiumsData, setCondominiumsData] = useState<Condominium[]>([])

    useEffect(() => {

        startTransition(() => {
            getCondominiumsByHoaId(hoa.id)
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
        getCondominiumsByHoaId(hoa.id)
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
        <div className="flex space-x-4">
            {isLoading && <CustomLoaderDeeper />}
            {condominiumsData.map((condominium) => {
                return <HoaCondominiumCard
                    key={condominium.id}
                    condominium={condominium}
                    hoaId={hoa.id}
                    refresh={refresh}
                />
            })}
        </div>

    )
}
