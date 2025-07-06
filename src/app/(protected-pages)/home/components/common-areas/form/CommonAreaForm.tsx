

import { CommonArea } from '@/@types/common-area';
import { Checkbox, FormItem, Input } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const schema = z.object({
    name: z.string({ message: "El nombre es obligatorio" }).min(1, { message: "El nombre es obligatorio" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    is_bookable: z.boolean().optional().default(false),
    daily_capacity: z.preprocess(
        val => {
            if (typeof val === 'string' && val.trim() !== '') {
                return Number(val);
            }
            return val;
        },
        z.number().min(0, { message: "Debe ser ≥ 0" }))
});

export type CommonAreaFormValues = z.infer<typeof schema>;

export const CommonAreaForm = (
    { commonAreaSelected }: {
        commonAreaSelected: CommonArea | null
    }
) => {

    const {
        formState: { errors },
        control
    } = useFormContext<CommonAreaFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Nombre de la zona comun"
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
                label="Descripcion de la zona comun"
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
                            placeholder="Descripcion"
                            textArea
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Necesario reservar?"
                invalid={Boolean(errors.is_bookable)}
                errorMessage={errors.is_bookable?.message}
            >
                <Controller
                    name="is_bookable"
                    control={control}
                    render={({ field }) => <Checkbox {...field} defaultChecked={commonAreaSelected?.is_bookable ?? false} />}
                />
            </FormItem>

            <FormItem
                label="Capacidad de reserva"
                invalid={Boolean(errors.daily_capacity)}
                errorMessage={errors.daily_capacity?.message}
            >
                <Controller
                    name="daily_capacity"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="number"
                            autoComplete="off"
                            placeholder=""
                            min={0}
                            {...field}
                        />
                    }
                />
            </FormItem>

        </div>
    )
}
