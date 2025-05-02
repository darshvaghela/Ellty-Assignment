export interface SelectedItem {
  product: Product;
  variant: Variant[];
}

export interface Product {
  id: number;
  title: string;
  variants: Variant[];
  image: ProductImage;
  discount?: Discount;
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  inventory_quantity: number;
  discount?: Discount;
}

export interface ProductImage {
  id: number;
  product_id: number;
  src: string;
}

export interface Discount {
  amount: string;
  type: "percent" | "flat";
}
