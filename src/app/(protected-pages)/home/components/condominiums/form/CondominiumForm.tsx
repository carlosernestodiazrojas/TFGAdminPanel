

import { Condominium } from '@/@types/condominium';
import { Checkbox, FormItem, Input } from '@/components/ui';
import Uploader from '@/components/upload/Uploader';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const schema = z.object({
    name: z.string({ message: "El nombre es obligatorio" }).min(1, { message: "El nombre es obligatorio" }),
    address: z.string({ message: "La direccion es obligatoria" }).min(1, { message: "La direccion es obligatoria" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    file_id: z.string().optional(),
});

export type CondominiumFormValues = z.infer<typeof schema>;

export const CondominiumForm = (
    { condominiumSelected, isUploading }: {
        condominiumSelected: Condominium | null,
        isUploading: (uploading: boolean) => void
    }
) => {

    const {
        formState: { errors },
        control
    } = useFormContext<CondominiumFormValues>();

    const [newImageUploaded, setNewImageUploaded] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

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
                            placeholder="Nombre"
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Descripci&oacute;n"
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
            >
                <Controller
                    name="description"
                    control={control}

                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Descripci&oacute;n"
                            textArea
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Direcci&oacute;n"
                invalid={Boolean(errors.address)}
                errorMessage={errors.address?.message}
            >
                <Controller
                    name="address"
                    control={control}

                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Direcci&oacute;n"
                            textArea
                            {...field}
                        />
                    }
                />
            </FormItem>

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

            {condominiumSelected && !newImageUploaded && (
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-40 w-full">
                    <img
                        src={condominiumSelected.imagesUrls.length > 0 ? condominiumSelected.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}

        </div>
    )
}
