"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product, ProductInsert } from "@/types/database";
import { createProduct, updateProduct } from "@/actions/products";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProductInsert>({
    name: product?.name || "",
    price: product?.price || 0,
    description: product?.description || "",
    size: product?.size || "",
    stock: product?.stock || 0,
    image_url: product?.image_url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (product) {
        const result = await updateProduct(product.id, formData);
        if (result.success) {
          toast.success("Produk berhasil diperbarui!");
          onSuccess?.();
        } else {
          toast.error(result.error || "Gagal memperbarui produk");
        }
      } else {
        const result = await createProduct(formData);
        if (result.success) {
          toast.success("Produk berhasil ditambahkan!");
          onSuccess?.();
        } else {
          toast.error(result.error || "Gagal menambahkan produk");
        }
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nama Produk *</label>
        <Input
          required
          placeholder="Masukkan nama produk"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Harga (Rp) *</label>
          <Input
            required
            type="number"
            min="0"
            placeholder="0"
            value={formData.price || ""}
            onChange={(e) =>
              setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stok *</label>
          <Input
            required
            type="number"
            min="0"
            placeholder="0"
            value={formData.stock || ""}
            onChange={(e) =>
              setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Ukuran</label>
        <Input
          placeholder="Contoh: S, M, L, XL"
          value={formData.size || ""}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">URL Gambar</label>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.image_url || ""}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Deskripsi</label>
        <Textarea
          placeholder="Masukkan deskripsi produk"
          rows={3}
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Batal
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product ? "Simpan Perubahan" : "Tambah Produk"}
        </Button>
      </div>
    </form>
  );
}
