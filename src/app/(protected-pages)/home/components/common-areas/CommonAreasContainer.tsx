import CommonAreasTable from "./table/CommonAreasTable"

export const CommonAreasContainer = (
    {
        condominiumId,
    }:
        {
            condominiumId: string
        }
) => {
    return (
        <CommonAreasTable
            condominiumId={condominiumId}
        />
    )
}
