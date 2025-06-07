'use client'
import useCurrentSession from "@/utils/hooks/useCurrentSession"

export const TestClientComponent = () => {
    const { session } = useCurrentSession()

    return (
        <div>Componente cliente de prueba</div>
    )
}
