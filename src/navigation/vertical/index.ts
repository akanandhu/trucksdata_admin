// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Vehicle Class',
      path: '/vehicle-class',
      icon: 'tabler:steering-wheel'
    },
    {
      title: 'Manufacturers',
      path: '/manufacturers',
      icon: 'tabler:settings-2'
    },
    {
      title: 'Vehicle',
      path: '/vehicle',
      icon: 'tabler:tir'
    },
    {
      title: 'Specifications',
      path: '/specifications',
      icon: 'tabler:file-text'
    },
    {
      title: 'Articles',
      path: '/articles',
      icon: 'tabler:article'
    },
    {
      title: 'General Settings',
      path: '/general-settings',
      icon: 'tabler:settings'
    },


    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'tabler:shield',
    // }
  ]
}

export default navigation
