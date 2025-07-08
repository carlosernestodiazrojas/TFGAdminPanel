
'use client'

import { UserInterface, UserResponse } from '@/@types/user';
import { Checkbox, FormItem, Input, Select, Upload } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import Uploader from '@/components/upload/Uploader';
import { useState } from 'react';

const roleOptions: { value: string; label: string }[] = [
    { value: 'administrador', label: 'administrador' },
    { value: 'propietario', label: 'propietario' },
    { value: 'presidente', label: 'presidente' }
]

export const schema = z.object({
    name: z.string({ message: "Campo obligatorio" }).min(1, { message: "Campo obligatorio" }),
    last_name: z.string({ message: "Campo obligatorio" }).min(1, { message: "Campo obligatorio" }),
    email: z.string({ message: "Campo obligatorio" }).email({ message: "Formato de email incorrecto" }),
    password: z.string({ message: "Campo obligatorio" }).min(6, { message: "Al menos 6 caracteres" }),
    role: z.string({ message: "Campo obligatorio" }).min(1, { message: "Campo obligatorio" }),
    hoa_id: z.string({ message: "Campo obligatorio" }).min(1, { message: "Campo obligatorio" }),
    file_id: z.string().optional(),
});

export type UserFormValues = z.infer<typeof schema>;
export type UserFormValuesNew = UserFormValues

export const UserForm = (
    { userSelected, isUploading }: {
        userSelected: UserResponse | null; isUploading: (uploading: boolean) => void
    }
) => {

    const [newImageUploaded, setNewImageUploaded] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const {
        formState: { errors },
        control,
        setValue
    } = useFormContext<UserFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Nombre"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder=""
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Apellido(s)"
                invalid={Boolean(errors.last_name)}
                errorMessage={errors.last_name?.message}
            >
                <Controller
                    name="last_name"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder=""
                            {...field}
                        />
                    }
                />
            </FormItem>


            <FormItem
                label="Email"
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder=""
                            {...field}
                        />
                    }
                />
            </FormItem>

            {!userSelected && (
                <FormItem
                    label="Contraseña"
                    invalid={Boolean(errors.password)}
                    errorMessage={errors.password?.message}
                >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder=""
                                {...field}
                            />
                        }
                    />
                </FormItem>
            )}

            {!userSelected && (
                <FormItem
                    label="Rol"
                    invalid={Boolean(errors.role)}
                    errorMessage={errors.role?.message}
                >
                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) =>
                            <Select
                                instanceId="basic"
                                placeholder=""
                                options={roleOptions}
                                defaultValue={userSelected ? roleOptions.find(o => o.value === (userSelected as unknown as UserInterface).role_id) || null : null}
                                defaultInputValue={userSelected ? (userSelected as unknown as UserInterface).role_id : ''}
                                {...field}
                                value={roleOptions.find(o => o.value === field.value) || null}
                                onChange={(value) => {
                                    if (value) {
                                        setValue("role", value.value)
                                    } else {
                                        setValue("role", "")
                                    }
                                }}
                            />
                        }
                    />
                </FormItem>
            )}



            <FormItem
                label=""
                invalid={Boolean(errors.file_id)}
                errorMessage={errors.file_id?.message}
            >
                <Controller
                    name="file_id"
                    control={control}
                    render={({ field }) => {
                        return <Uploader
                            onUploadResult={(imageUploaded: string) => {
                                field.onChange(imageUploaded)
                            }}
                            onUploading={(uploading: boolean) => {
                                setNewImageUploaded(true)
                                setUploading(uploading)
                                isUploading(uploading)
                            }}
                        />
                    }}
                />
            </FormItem>

            {userSelected && !newImageUploaded && (
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-40 w-full">
                    <img
                        src={userSelected.imagesUrls.length > 0 ? userSelected.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}


        </div>
    )
}
