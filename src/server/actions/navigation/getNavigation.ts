import navigationConfig from '@/configs/navigation.config'
import { auth } from '@/auth'
import { User } from '@/@types/auth'

export async function getNavigation() {

    const session = await auth()

    if (session) {
        const { user } = session!

        const { authority } = user as User

        const navigationConfigAllowed = navigationConfig.filter((navigationItem) => {
            return navigationItem.authority.length === 0
                || navigationItem.authority.some((role) => authority?.includes(role))
        })

        return navigationConfigAllowed
    }

    return []
}
