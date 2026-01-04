"use client";

import { useState } from "react";
import { Product } from "@/types/database";
import { deleteProduct } from "@/actions/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export function ProductTable({ products, onEdit }: ProductTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);

    try {
      const result = await deleteProduct(deleteId);
      if (result.success) {
        toast.success("Produk berhasil dihapus!");
        setDeleteId(null);
      } else {
        toast.error(result.error || "Gagal menghapus produk");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsDeleting(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">Belum Ada Produk</h3>
        <p className="text-muted-foreground">
          Klik tombol &quot;Tambah Produk&quot; untuk menambahkan produk pertama.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Produk
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Harga
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Stok
              </th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                Ukuran
              </th>
              <th className="text-right py-3 px-4 font-medium text-muted-foreground">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border/50 hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xl">
                          📦
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-primary font-semibold">
                  {formatPrice(product.price)}
                </td>
                <td className="py-3 px-4">
                  {product.stock > 0 ? (
                    <Badge
                      variant={product.stock <= 5 ? "outline" : "secondary"}
                      className={
                        product.stock <= 5
                          ? "border-orange-500 text-orange-500"
                          : ""
                      }
                    >
                      {product.stock}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Habis</Badge>
                  )}
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {product.size || "-"}
                </td>
                <td className="py-3 px-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-4 rounded-lg border border-border/50 bg-card"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl">
                    📦
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{product.name}</h3>
                <p className="text-primary font-semibold">
                  {formatPrice(product.price)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {product.stock > 0 ? (
                    <Badge variant="secondary" className="text-xs">
                      Stok: {product.stock}
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">
                      Habis
                    </Badge>
                  )}
                  {product.size && (
                    <Badge variant="outline" className="text-xs">
                      {product.size}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => onEdit(product)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => setDeleteId(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Produk</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
