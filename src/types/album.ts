export interface AlbumPhoto {
  image: string | null;
  caption?: string;
}

export interface Album {
  title: string;
  date: string;
  category: 'graduation' | 'event' | 'class' | 'culture' | 'performance' | 'other';
  cover: string | null;
  photos: AlbumPhoto[];
  description?: string;
  published?: boolean;
  slug: string;
}

export type FilterCategory = 'all' | Album['category'];
