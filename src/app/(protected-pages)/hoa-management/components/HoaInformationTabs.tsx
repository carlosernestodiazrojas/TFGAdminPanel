'use client'

import { Hoa } from '@/@types/hoa'
import Tabs from '@/components/ui/Tabs'
import { HoaInformation } from './HoaInformation'
import { HoaCondominiumsContainer } from './condominiums/HoaCondominiumsContainer'

const { TabNav, TabList, TabContent } = Tabs

const HoaInformationTabs = ({
    hoa
}: {
    hoa: Hoa
}) => {
    return (
        <div>
            <Tabs defaultValue="tab1">
                <TabList>
                    <TabNav value="tab1">Informacion general</TabNav>
                    <TabNav value="tab2">Edificios de la comunidad</TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="tab1">
                        <HoaInformation
                            hoa={hoa}
                        />
                    </TabContent>
                    <TabContent value="tab2">
                        <HoaCondominiumsContainer
                            hoa={hoa}
                        />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default HoaInformationTabs

