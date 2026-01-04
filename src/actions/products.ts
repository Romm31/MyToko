"use server";

import { supabase } from "@/lib/supabase";
import { Product, ProductInsert, ProductUpdate } from "@/types/database";
import { revalidatePath } from "next/cache";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data as Product[]) || [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as Product;
}

export async function createProduct(product: ProductInsert): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("products").insert(product as Record<string, unknown>);

  if (error) {
    console.error("Error creating product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}

export async function updateProduct(
  id: string,
  product: ProductUpdate
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from("products")
    .update(product as Record<string, unknown>)
    .eq("id", id);

  if (error) {
    console.error("Error updating product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  revalidatePath(`/product/${id}`);
  return { success: true };
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}
