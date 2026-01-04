import { getProduct } from "@/actions/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <Link href="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Kembali ke Katalog
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Image */}
          <Card className="overflow-hidden border-border/50">
            <div className="relative aspect-square bg-muted">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-9xl text-muted-foreground/30">📦</div>
                </div>
              )}
            </div>
          </Card>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                {product.stock > 0 ? (
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                    Tersedia
                  </Badge>
                ) : (
                  <Badge variant="destructive">Stok Habis</Badge>
                )}
                {product.size && (
                  <Badge variant="outline">Ukuran: {product.size}</Badge>
                )}
              </div>
            </div>

            <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Harga</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </p>
              </CardContent>
            </Card>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Deskripsi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border/50">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Stok tersisa:</span>
                <span className="font-semibold">{product.stock}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
