export interface HomePageSettings {
  banners: Banner[]
  heading: string
  subheading: string
  logo: Banner[]
  faq: Faq[]
  contact_number: string
  email: string
}

interface Faq {
  question: string
  answer: string
}

interface Banner {
  original: string
  thumbnail: string
}




export interface RootObjectHome {
  current_page: number;
  data: GeneralSetting[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface GeneralSetting {
  id: number;
  banners: Banner[];
  heading: string;
  subheading: string;
  logo: Banner[];
  faq: Faq[];
  contact_number: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface Faq {
  url?: any;
  language?: any;
  question: string;
  answer: string;
}

interface Banner {
  thumbnail: string;
  original: string;
  id: number;
}