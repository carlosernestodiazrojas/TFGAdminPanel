import { UserResponse } from "@/@types/user"
import { Button, Dialog, Input } from "@/components/ui"
import { useState } from "react"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const passwordSchema = z.object({
    password: z.string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z.string()
        .min(6, { message: "La confirmación debe tener al menos 6 caracteres" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

export type PasswordFormValues = z.infer<typeof passwordSchema>

const ChangePassword = ({
    user,
    dialogIsOpen,
    onDialogClose,
    onDialogOk
}: {
    user: UserResponse | null
    dialogIsOpen: boolean
    onDialogClose: () => void
    onDialogOk: (data: PasswordFormValues) => void
}) => {

    const [pwInputType, setPwInputType] = useState('password')

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        watch
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        mode: "onChange"
    })

    const onPasswordVisibleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const inputIcon = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    const onSubmit = (data: PasswordFormValues) => {
        onDialogOk(data)
        reset()
    }

    const handleCancel = () => {
        reset()
        onDialogClose()
    }

    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={handleCancel}
                onRequestClose={handleCancel}
            >
                <h5 className="mb-4">Cambiar contraseña a {user?.name} {user?.last_name}</h5>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <Input
                                {...register("password")}
                                type={pwInputType}
                                suffix={inputIcon}
                                placeholder="Nueva contraseña"
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Input
                                {...register("confirmPassword")}
                                type={pwInputType}
                                suffix={inputIcon}
                                placeholder="Repetir contraseña"
                                className={errors.confirmPassword ? "border-red-500" : ""}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="text-right mt-6">
                        <Button
                            className="ltr:mr-2 rtl:ml-2"
                            variant="plain"
                            onClick={handleCancel}
                            type="button"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="solid"
                            type="submit"
                            disabled={!isValid}
                        >
                            Cambiar contraseña
                        </Button>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default ChangePassword