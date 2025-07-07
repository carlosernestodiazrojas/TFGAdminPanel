
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { CondominiumForm } from '../form/CondominiumForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CondominiumFormValues } from '../form/CondominiumForm';
import { schema } from '../form/CondominiumForm';

import { Form } from '@/components/ui';

import { createCondominiumOnHoaId, updateCondominiumOnHoa } from '../../../actions';
import { Condominium } from '@/@types/condominium';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';

const CondominiumDrawer = (
    { hoaId, isOpen, setIsOpen, refresh, condominiumSelected = null }:
        {
            hoaId: string;
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            refresh: (action: string) => void;
            condominiumSelected: Condominium | null
        }) => {

    const [isLoading, startTransition] = useTransition()
    const [isUploading, setUploading] = useState<boolean>(false)

    const methods = useForm<CondominiumFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            address: '',
            description: '',
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {
        reset({
            name: condominiumSelected?.name ?? '',
            address: condominiumSelected?.address ?? '',
            description: condominiumSelected?.description || '',
        })
    }, [condominiumSelected])

    const CondominiumDrawerFooter = (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={closeDrawer} loading={isLoading || isUploading}>
                Cancelar
            </Button>
            <Button
                size="sm"
                variant="solid"
                loading={isLoading || isUploading}
                onClick={methods.handleSubmit(async (data) => {

                    try {
                        startTransition(async () => {
                            if (!condominiumSelected) {
                                const response = await createCondominiumOnHoaId(data)
                                refresh('create')
                            }
                            else {
                                const response = await updateCondominiumOnHoa(condominiumSelected.id, data)
                                refresh('update')
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        refresh('error')
                    }

                })}
            >
                {condominiumSelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={condominiumSelected ? 'Actualizar edificio existente' : 'Crear nuevo edificio'}
                isOpen={isOpen}
                footer={CondominiumDrawerFooter}
                onClose={closeDrawer}
                onRequestClose={closeDrawer}
                closable={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <Form noValidate>
                    <CondominiumForm
                        condominiumSelected={condominiumSelected}
                        isUploading={setUploading}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default CondominiumDrawer;