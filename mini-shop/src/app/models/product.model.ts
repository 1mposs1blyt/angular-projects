export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description:string;
  image:string;
  category:string;
  inStock:boolean;
  discount:boolean;
}