import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'

import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Gestionar comunidad',
        translateKey: 'nav.home',
        icon: 'singleMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['global_admin'],
        subMenu: [],
    },
    {
        key: 'announcements-management',
        path: '/announcements-management',
        title: 'Gestionar anuncios',
        translateKey: 'nav.announcements-management',
        icon: 'groupSingleMenu',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['global_admin', 'presidente', 'administrador'],
        subMenu: [],
    },
    {
        key: 'incidences-management',
        path: '/incidences-management',
        title: 'Gestionar incidencias',
        translateKey: 'nav.incidences-management',
        icon: 'incidences',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['global_admin', 'presidente', 'administrador'],
        subMenu: [],
    },

    {
        key: 'special-assessments-management',
        path: '/special-assessments-management',
        title: 'Gestionar derramas',
        translateKey: 'nav.special-assessments-management',
        icon: 'specialAssessments',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['global_admin', 'presidente', 'administrador'],
        subMenu: [],
    },


    {
        key: 'users-management',
        path: '/users-management',
        title: 'Gestionar usuarios',
        translateKey: 'nav.users-management',
        icon: 'specialAssessments',
        type: NAV_ITEM_TYPE_ITEM,
        authority: ['global_admin', 'presidente', 'administrador'],
        subMenu: [],
    },


]

export default navigationConfig
