/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import Card from '@/components/ui/Card'
import { Hoa } from '@/@types/hoa'
import HoaInformationTabs from './HoaInformationTabs'
import ImageGallery from '@/components/image-gallery/ImageGallery'

const HoaParentCard = ({
    hoa
}: {
    hoa: Hoa
}) => {
    const cardFooter = (
        <div className="flex items-center">
            <span>
                <h6 className="text-sm"></h6>
                <span className="text-xs"></span>
            </span>
        </div>
    )

    let cardHeader = hoa.imagesUrls.length > 0 ? (
        <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-75 w-full">
            <ImageGallery
                images={hoa.imagesUrls}
            />
        </div>
    ) :
        (<div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-75 w-full">
            <img
                src="/img/no-image/3.jpg"
                alt="card header"
                className="absolute inset-0 w-full h-full object-cover"
            />
        </div>)

    return (
        <div className="w-full">
            <Card
                clickable
                className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={{
                    content: cardHeader,
                    bordered: false,
                    className: 'p-0',
                }}
                footer={{
                    content: cardFooter,
                    bordered: false,
                }}
            >

                <HoaInformationTabs hoa={hoa} />
            </Card>
        </div>
    )
}

export default HoaParentCard