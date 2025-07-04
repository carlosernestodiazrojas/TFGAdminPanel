
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { AnnouncementForm } from '../form/AnnouncementForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AnnouncementFormValues } from '../form/AnnouncementForm';
import { schema } from '../form/AnnouncementForm';

import { Form } from '@/components/ui';

import { createAnnouncementOnHoa, updateAnnouncementOnHoa } from '../../actions';
import { Announcement } from '@/@types/announcement';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';

const AnnouncementDrawer = (
    { isOpen, setIsOpen, announcementSelected = null, refresh }:
        {
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            announcementSelected: Announcement | null
            refresh: (action: string) => void;
        }) => {

    const [isLoading, startTransition] = useTransition()

    const [isUploading, setUploading] = useState<boolean>(false)

    const methods = useForm<AnnouncementFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            from: '',
            to: ''
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {
        reset({
            title: announcementSelected?.title ?? '',
            description: announcementSelected?.description ?? '',
            from: announcementSelected?.from || '',
            to: announcementSelected?.to ?? '',
        })
    }, [announcementSelected])

    const AnnouncementDrawerFooter = (
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
                            if (!announcementSelected) {
                                const response = await createAnnouncementOnHoa(data)
                                refresh("create");
                            }
                            else {
                                const response = await updateAnnouncementOnHoa(announcementSelected.id, data)
                                refresh("update");
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        console.log("Errro", error)
                        refresh("error");
                    }

                })}
            >
                {announcementSelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={announcementSelected ? 'Actualizar anuncio' : 'Crear nuevo anuncio'}
                isOpen={isOpen}
                footer={AnnouncementDrawerFooter}
                onClose={closeDrawer}
                onRequestClose={closeDrawer}
                closable={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <Form noValidate>
                    <AnnouncementForm
                        announcementSelected={announcementSelected}
                        isUploading={setUploading}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default AnnouncementDrawer;