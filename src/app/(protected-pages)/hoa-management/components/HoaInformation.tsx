
'use client'

import { Hoa } from "@/@types/hoa"

export const HoaInformation = ({
    hoa
}: {
    hoa: Hoa
}) => {
    return (
        <>
            <h4 className="text-emerald-600 font-semibold my-3">{hoa.name}</h4>
            <p>
                {hoa.address}
            </p>
        </>
    )
}
