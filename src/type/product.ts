export interface Product {
  id: number;
  title: string;
  variants: Variant[];
  image: ProductImage;
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string; // you could change to `number` if preferred
}

export interface ProductImage {
  id: number;
  product_id: number;
  src: string;
}
