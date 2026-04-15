export interface License {
  name: string;
  price: number;
  type: string;
  term: string;
  files: string;
  copies: string;
  streams: string;
}

export interface Beat {
  id: number;
  title: string;
  artist: string;
  price: number;
  oldPrice?: number;
  image: string;
  featured?: boolean;
  subscribe?: string;
  license?: string;
  licenseType?: string;
  tags?: string[];
  bpm?: string;
  genres?: string;
  key?: string;
  dateAdded?: string;
  views?: string;
  downloads?: string;
  likes?: string;
  licenses?: License[];
}

export interface CartItem extends Beat {
  license: string;
  licenseType: string;
  cartPrice: number;
}
  