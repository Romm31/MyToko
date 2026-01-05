import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border-border/50 !p-0 !gap-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-6xl text-muted-foreground/30">📦</div>
            </div>
          )}
          {product.stock <= 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="destructive" className="text-sm">
                Stok Habis
              </Badge>
            </div>
          )}
          {/* Stock badge overlay */}
          {product.stock > 0 && (
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-primary/90 hover:bg-primary text-white text-xs">
                Stok: {product.stock}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {product.size ? `Ukuran: ${product.size}` : "—"}
          </p>
          <p className="text-lg font-bold text-primary mt-2">
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
