import PropertiesTable from "./table/PropertiesTable"

export const PropertiesContainer = (
    {
        condominiumId,
    }:
        {
            condominiumId: string
        }
) => {
    return (
        <PropertiesTable
            condominiumId={condominiumId}
        />
    )
}
