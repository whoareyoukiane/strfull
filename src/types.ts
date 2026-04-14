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
}

export interface CartItem extends Beat {
  license: string;
  licenseType: string;
}
