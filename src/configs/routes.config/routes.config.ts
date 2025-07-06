import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const protectedRoutes: Routes = {

    '/home': {
        key: 'home',
        authority: ['global_admin'],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/announcements-management': {
        key: 'announcements-management',
        authority: ['global_admin', 'presidente', 'administrador'],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    '/incidences-management': {
        key: 'incidences-management',
        authority: ['global_admin', 'presidente', 'administrador'],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },

    '/special-assessments-management': {
        key: 'special-assessments-management',
        authority: ['global_admin', 'presidente', 'administrador'],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },

}

export const publicRoutes: Routes = {}

export const authRoutes = authRoute
