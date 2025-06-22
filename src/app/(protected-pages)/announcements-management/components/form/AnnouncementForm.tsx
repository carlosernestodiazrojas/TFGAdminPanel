

import { Announcement } from '@/@types/announcement';
import { FormItem, Input } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import DatePicker from '@/components/ui/DatePicker'

export const schema = z.object({
    title: z.string({ message: "El titulo es obligatorio" }).min(1, { message: "El titulo es obligatorio" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    from: z.preprocess(
        val => {
            if (typeof val === 'object') {
                return String(val);
            }
            return val;
        },
        z.string().min(1, { message: "Debe seleccionar la fecha" })),
    to: z.preprocess(
        val => {
            if (typeof val === 'object') {
                return String(val);
            }
            return val;
        },
        z.string().min(1, { message: "Debe seleccionar la fecha" })),
});

export type AnnouncementFormValues = z.infer<typeof schema>;

export const AnnouncementForm = (
    { announcementSelected }: {
        announcementSelected: Announcement | null
    }
) => {

    const {
        formState: { errors },
        control
    } = useFormContext<AnnouncementFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Titulo"
                invalid={Boolean(errors.title)}
                errorMessage={errors.title?.message}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Titulo"
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Descripcion"
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
                            placeholder=""
                            {...field}
                            textArea
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Visible desde"
                invalid={Boolean(errors.from)}
                errorMessage={errors.from?.message}
            >
                <Controller
                    name="from"
                    control={control}
                    render={({ field }) => {
                        const dateValue = field.value ? new Date(field.value) : null;
                        return <DatePicker
                            placeholder="Seleccionar"
                            value={dateValue}
                            onChange={(d: Date | null) => {
                                field.onChange(d ? d.toISOString() : "");
                            }}
                            inputFormat='DD/MM/YYYY'
                        />
                    }}
                />
            </FormItem>

            <FormItem
                label="Hasta"
                invalid={Boolean(errors.to)}
                errorMessage={errors.to?.message}
            >
                <Controller
                    name="to"
                    control={control}
                    render={({ field }) => {
                        const dateValue = field.value ? new Date(field.value) : null;
                        return <DatePicker
                            placeholder="Seleccionar"
                            value={dateValue}
                            onChange={(d: Date | null) => {
                                field.onChange(d ? d.toISOString() : "");
                            }}
                            inputFormat='DD/MM/YYYY'
                        />
                    }}
                />
            </FormItem>
        </div>
    )
}
