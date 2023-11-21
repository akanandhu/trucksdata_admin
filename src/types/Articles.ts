export interface ArticleFields  {
    thumbnail : any[];
    heading: string
}

export interface Article {
  id: number;
  heading: string;
  html_content: string;
  thumbnail: Thumbnail[];
  created_at: string;
  updated_at: string;
}

interface Thumbnail {
  thumbnail: string;
  original: string;
}