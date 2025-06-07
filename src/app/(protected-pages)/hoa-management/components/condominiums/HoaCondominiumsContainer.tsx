'use client'

import { Hoa } from "@/@types/hoa"
import { getCondominiumsByHoaId } from "../../actions"
import { useEffect, useState, useTransition } from "react"
import { Condominium } from "@/@types/condominium"
import { HoaCondominiumCard } from "./HoaCondominiumCard"
import { CustomLoader } from "@/components/custom-loader"

export const HoaCondominiumsContainer = ({
    hoa
}: {
    hoa: Hoa
}) => {

    const [isLoading, startTransition] = useTransition()
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

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
                    setIsLoaded(true)
                })
        })

    }, [])

    return (

        <div className="flex space-x-4">
            {isLoading && <CustomLoader />}
            {condominiumsData.map((condominium) => {
                return <HoaCondominiumCard
                    key={condominium.id}
                    condominium={condominium}
                />
            })}
        </div>

    )
}
