// product.model.ts
export interface IProduct {
  id: number;
  name: string;
  description: string | null;
  image: IProductImage | null; // mapped from product_files
}

interface IProductImage {
  id: number;
  product_id: number;
  file_path: string;
}
