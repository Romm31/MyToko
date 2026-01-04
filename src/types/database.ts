export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  size: string | null;
  stock: number;
  image_url: string | null;
  created_at: string;
};

export type ProductInsert = Omit<Product, "id" | "created_at">;
export type ProductUpdate = Partial<ProductInsert>;

export type Database = {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: ProductInsert;
        Update: ProductUpdate;
      };
    };
  };
};
