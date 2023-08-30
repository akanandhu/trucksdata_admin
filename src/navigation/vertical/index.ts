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
    }

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
