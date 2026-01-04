import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto max-w-7xl px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MyDistro
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Temukan koleksi produk terbaik dengan kualitas premium dan harga terjangkau
          </p>
          <div className="flex justify-center gap-2">
            <div className="h-1 w-12 rounded-full bg-primary"></div>
            <div className="h-1 w-12 rounded-full bg-secondary"></div>
            <div className="h-1 w-12 rounded-full bg-accent"></div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Katalog Produk</h2>
            <p className="text-muted-foreground">
              Jelajahi {products.length} produk terbaik kami
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Belum Ada Produk</h3>
              <p className="text-muted-foreground max-w-md">
                Produk akan segera tersedia. Silakan kunjungi kembali nanti atau hubungi admin untuk informasi lebih lanjut.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-10">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 MyDistro. Semua hak dilindungi.
          </p>
        </div>
      </footer>
    </div>
  );
}
