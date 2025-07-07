
'use client'

import { Hoa, UserResponse } from "@/@types/hoa"
import { CustomLoaderDeeper } from "@/components/custom-loader"
import { useEffect, useState, useTransition } from "react"

import { getUserById } from "../actions"
import HoaUserAdminPresidentProfile from "./HoaUserAdminPresidentProfile"
import { HoaStatistics } from "./HoaStatistics"

export const HoaInformation = ({
    hoa
}: {
    hoa: Hoa
}) => {

    const [isLoading, startTransition] = useTransition()

    const [president, setPresident] = useState<UserResponse | null>(null)
    const [admin, setAdmin] = useState<UserResponse | null>(null)

    useEffect(() => {
        startTransition(async () => {
            const { president_id, admin_id } = hoa

            const promises = []

            if (president_id) {
                promises.push(getUserById(president_id))
            }

            if (admin_id) {
                promises.push(getUserById(admin_id))
            }

            if (promises.length > 0) {
                try {
                    const responses = await Promise.all(promises)

                    let responseIndex = 0

                    if (president_id) {
                        setPresident(responses[responseIndex].data)
                        responseIndex++
                    }

                    if (admin_id) {
                        setAdmin(responses[responseIndex].data)
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error)
                }
            }
        })
    }, [])

    return (
        <>
            {isLoading && <CustomLoaderDeeper />}
            <h4 className="text-emerald-600 font-semibold my-3">{hoa.name}</h4>
            <p>
                Direcci&oacute;n: {hoa.address}
            </p>

            <div className="flex space-x-4 relative top-4 w-full" >
                <div className="w-1/2">
                    <HoaUserAdminPresidentProfile
                        user={president as UserResponse}
                        isLoading={isLoading}
                    />
                </div>

                <div className="w-1/2">
                    <HoaUserAdminPresidentProfile
                        user={admin as UserResponse}
                        isLoading={isLoading}
                    />
                </div>
            </div>

            <div>
                <HoaStatistics
                    data={hoa.statistics}
                />
            </div>



        </>
    )
}
