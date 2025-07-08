
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { UserForm } from '../form/UsersForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserFormValues } from '../form/UsersForm';
import { schema } from '../form/UsersForm';

import { Form } from '@/components/ui';

import { createUserOnHoa, updateUserOnHoa } from '../../actions';
import { UserResponse } from '@/@types/user';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';

import useCurrentSession from '@/utils/hooks/useCurrentSession';

const UserDrawer = (
    { isOpen, setIsOpen, userSelected = null, refresh }:
        {
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            userSelected: UserResponse | null
            refresh: (action: string) => void;
        }) => {

    const { session } = useCurrentSession();

    const [isLoading, startTransition] = useTransition()

    const [isUploading, setUploading] = useState<boolean>(false)

    const methods = useForm<UserFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            last_name: '',
            email: '',
            password: '',
            role: '',
            hoa_id: session.user?.hoaId ?? '',
            file_id: ''
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {

        if (userSelected) {

            reset({
                name: userSelected?.name ?? '',
                last_name: userSelected?.last_name ?? '',
                email: userSelected?.email ?? '',
                password: userSelected?.password ?? '',
                role: userSelected?.role.name ?? '',
                hoa_id: session.user?.hoaId ?? '',
                file_id: '',
            })

        }
        else {

            reset({
                name: '',
                last_name: '',
                email: '',
                password: '',
                role: '',
                hoa_id: session.user?.hoaId ?? '',
                file_id: '',
            })

        }


    }, [userSelected])

    const UserDrawerFooter = (
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
                            if (!userSelected) {
                                const { file_id, ...user } = data

                                if (data.file_id === "") {
                                    await createUserOnHoa(user)
                                }
                                else
                                    await createUserOnHoa(data)

                                refresh("create");
                            }
                            else {
                                const { password, hoa_id, ...user } = data
                                if (user.file_id === "") {
                                    const { file_id, ...userNoFile } = user
                                    await updateUserOnHoa(userSelected.id, userNoFile)
                                }
                                else
                                    await updateUserOnHoa(userSelected.id, user)
                                refresh("update");
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        refresh("error");
                    }

                })}
            >
                {userSelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={userSelected ? 'Actualizar usuario' : 'Crear nuevo usuario'}
                isOpen={isOpen}
                footer={UserDrawerFooter}
                onClose={closeDrawer}
                onRequestClose={closeDrawer}
                closable={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <Form noValidate>
                    <UserForm
                        userSelected={userSelected}
                        isUploading={setUploading}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default UserDrawer;