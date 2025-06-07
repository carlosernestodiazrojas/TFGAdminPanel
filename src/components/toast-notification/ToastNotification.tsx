
'use client'

import Notification from '@/components/ui/Notification'

export const ToastNotification = ({
    title,
    message,
    type
}: {
    title: string
    message: string
    type: 'success' | 'warning' | 'danger' | 'info'
}) => {
    return (
        <Notification
            title={title}
            type={type}
            closable
            duration={500}
        >
            {message}
        </Notification>
    )
}
