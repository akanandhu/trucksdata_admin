export const rows = [
  {
    id: 1,
    status: 'active',
    title: 'Trucks'
  },
  {
    id: 2,
    status: 'active',
    title: 'Tipper'
  },
  {
    id: 3,
    status: 'active',
    title: 'Trailer'
  },
  {
    id: 4,
    status: 'active',
    title: 'Pickup'
  },
  {
    id: 5,
    status: 'active',
    title: 'Mini Truck'
  },
  {
    id: 6,
    status: 'in-active',
    title: 'Three Wheeler'
  }
]

export const manufacturersRows = [
  {
    id: 1,
    title: 'Ashok Leyland',
    logo: 'https://e0.pxfuel.com/wallpapers/788/312/desktop-wallpaper-leyland-logo-png-information-ashok-leyland.jpg',
    vehicle_classes: ['Truck', 'Tipper', 'Mini Truck'],
    models: [
      {
        id: 11,
        title: 'Ashok Leyland - Ecomet Star Serires',
        image: 'https://www.truckexpert.in/2021/08/ashokleylandecomet1015he.html',
        status: 'Active'
      },
      {
        id: 12,
        title: 'Ashok Leyland - Boss Series',
        image: 'https://www.truckexpert.in/p/ashok-leyland-trucks.html',
        status: 'In-active'
      }
    ]
  },
  {
    id: 2,
    title: 'Bharath Benz',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0f/BharatBenz_logo.jpg',
    vehicle_classes: ['Trailer', 'Tipper']
  },
  {
    id: 3,
    title: 'Tata',
    logo: '',
    vehicle_classes: ['Truck', 'Mini Truck', 'Three Wheeler'],
    models: [
      {
        id: 31,
        title: 'Tata Ultra Cabin Series BS6 Trucks',
        logo: 'https://www.truckexpert.in/p/tata-ultra-cabin-trucks.html',
        vehicle_classes: ['Trucks']
      }
    ]
  }
]
