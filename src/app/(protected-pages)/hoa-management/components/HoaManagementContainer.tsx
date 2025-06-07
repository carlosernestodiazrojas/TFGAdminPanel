
'use client'

import { Hoa } from "@/@types/hoa"
import { getHoaById } from "../actions"
import { Fragment, useEffect, useState, useTransition } from "react"
import NotFound from "@/components/shared/NotFound"
import { CustomLoader } from "@/components/custom-loader"
import HoaParentCard from "./HoaParentCard"

export const HoaManagementContainer = () => {

    const [isLoading, startTransition] = useTransition()
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const [hoaData, setHoaData] = useState<Hoa | null>(null)

    useEffect(() => {

        startTransition(() => {
            getHoaById()
                .then((response) => {
                    const { data } = response
                    setHoaData(data)
                })
                .catch((error) => {
                    setHoaData(null)
                })
                .finally(() => {
                    setIsLoaded(true)
                })
        })

    }, [])

    return (
        <>
            {isLoading && <CustomLoader />}
            {!isLoading && hoaData &&
                <Fragment>
                    <HoaParentCard hoa={hoaData} />
                </Fragment>}
            {!isLoading && !hoaData && isLoaded && <NotFound />}
        </>
    )
}