import Dialog from '@/components/ui/Dialog'
import { CommonAreasContainer } from './CommonAreasContainer'

export const CommonAreasContainerDialog = (
    {
        dialogIsOpen,
        condominiumId,
        setIsOpen
    }:
        {
            dialogIsOpen: boolean
            condominiumId: string
            setIsOpen: (isOpen: boolean) => void
        }
) => {

    const onDialogClose = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                width={1500}
                height={800}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                closable={true}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <div className="flex flex-col  justify-between">
                    <h5 className="mb-4">Listado de zonas comunes</h5>

                    <div className='max-h-[700] overflow-hidden'>
                        <CommonAreasContainer
                            condominiumId={condominiumId}
                        />
                    </div>

                </div>
            </Dialog>
        </div>
    )
}
