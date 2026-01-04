"use server";

import { supabase } from "@/lib/supabase";

export async function seedProducts() {
  const sampleProducts = [
    {
      name: "Kaos Distro Premium",
      price: 150000,
      description: "Kaos distro premium dengan bahan cotton combed 30s yang nyaman dan adem. Cocok untuk aktivitas sehari-hari.",
      size: "M, L, XL",
      stock: 50,
      image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    },
    {
      name: "Hoodie Street Style",
      price: 350000,
      description: "Hoodie dengan desain street style yang keren. Bahan fleece tebal dan hangat.",
      size: "L, XL",
      stock: 25,
      image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    },
    {
      name: "Celana Cargo Tactical",
      price: 275000,
      description: "Celana cargo dengan banyak kantong, cocok untuk outdoor dan aktivitas sehari-hari.",
      size: "32, 34, 36",
      stock: 30,
      image_url: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    },
    {
      name: "Topi Snapback Classic",
      price: 85000,
      description: "Topi snapback dengan desain klasik yang timeless. Bahan berkualitas tinggi.",
      size: "All Size",
      stock: 100,
      image_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    },
    {
      name: "Jaket Bomber Vintage",
      price: 450000,
      description: "Jaket bomber dengan gaya vintage yang stylish. Cocok untuk cuaca dingin.",
      size: "M, L, XL, XXL",
      stock: 15,
      image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    },
    {
      name: "Kaos Oversize Polos",
      price: 120000,
      description: "Kaos oversize polos yang minimalis. Bahan cotton premium 24s.",
      size: "M, L, XL",
      stock: 75,
      image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    },
  ];

  const { error } = await supabase
    .from("products")
    .insert(sampleProducts as Record<string, unknown>[]);

  if (error) {
    console.error("Error seeding products:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
