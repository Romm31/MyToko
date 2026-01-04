import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Truck, Shield, HeartHandshake, Star, MapPin, Phone, Mail } from "lucide-react";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                🎉 Diskon hingga 50% untuk member baru
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  MyToko
                </span>
                <br />
                <span className="text-foreground">Fashion Distro Terbaik</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mb-8">
                Temukan koleksi fashion streetwear terbaru dengan kualitas premium. 
                Gaya yang berbeda, harga yang bersahabat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="#katalog">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Lihat Katalog
                  </Button>
                </Link>
                <Link href="#tentang">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Tentang Kami
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:flex items-center justify-center">
              <div className="relative">
                {/* Animated rings */}
                <div className="absolute inset-0 w-72 h-72 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-4 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-xl"></div>
                {/* Logo container with gradient background */}
                <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <Image
                      src="/logo.svg"
                      alt="MyToko Logo"
                      width={180}
                      height={180}
                      className="object-contain drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Gratis Ongkir", desc: "Untuk pembelian di atas Rp 200rb" },
              { icon: Shield, title: "Garansi Kualitas", desc: "100% produk original" },
              { icon: HeartHandshake, title: "Customer Service", desc: "Siap membantu 24/7" },
              { icon: Star, title: "Best Seller", desc: "Produk trending terbaru" },
            ].map((feature, idx) => (
              <Card key={idx} className="border-border/50 bg-background/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20 border-secondary/20">
                Tentang Kami
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                MyToko — Gaya Hidupmu, Pilihan Kami
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                MyToko adalah destinasi fashion streetwear terdepan di Indonesia. Didirikan pada tahun 2020, 
                kami berkomitmen untuk menghadirkan produk-produk berkualitas tinggi dengan desain yang unik 
                dan harga yang terjangkau.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Dengan lebih dari 10.000 pelanggan puas di seluruh Indonesia, MyToko terus berinovasi 
                menghadirkan koleksi terbaru yang mengikuti tren fashion global. Setiap produk kami 
                dipilih dengan cermat untuk memastikan kualitas dan kenyamanan terbaik.
              </p>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Pelanggan</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">500+</p>
                  <p className="text-sm text-muted-foreground">Produk</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">99%</p>
                  <p className="text-sm text-muted-foreground">Rating Positif</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-secondary p-1">
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                  <Image
                    src="/logo.svg"
                    alt="MyToko"
                    width={250}
                    height={250}
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="katalog" className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              Katalog Produk
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Koleksi Terbaik Kami</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jelajahi {products.length} produk pilihan dengan kualitas premium dan desain eksklusif
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
                Produk akan segera tersedia. Silakan kunjungi kembali nanti.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent-foreground hover:bg-accent/20 border-accent/20">
              Testimoni
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Andi Pratama", role: "Mahasiswa", text: "Kualitas produk MyToko benar-benar premium! Hoodie yang saya beli sangat nyaman dan tahan lama. Pasti akan order lagi!" },
              { name: "Siti Rahma", role: "Content Creator", text: "Desainnya keren banget, cocok untuk konten OOTD. Pengiriman juga cepat dan packaging-nya rapi. Love it!" },
              { name: "Budi Santoso", role: "Pengusaha", text: "Sudah jadi langganan MyToko sejak 2021. Harga terjangkau tapi kualitas tidak murahan. Recommended!" },
            ].map((testimonial, idx) => (
              <Card key={idx} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">&quot;{testimonial.text}&quot;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Tampil Beda?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Bergabunglah dengan ribuan pelanggan yang sudah merasakan kualitas MyToko
          </p>
          <Link href="#katalog">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Belanja Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              Hubungi Kami
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ada Pertanyaan?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <MapPin className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Alamat</h3>
                <p className="text-sm text-muted-foreground">
                  Jl. Fashion Street No. 123<br />Jakarta Selatan, 12345
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <Phone className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Telepon</h3>
                <p className="text-sm text-muted-foreground">
                  +62 812 3456 7890<br />Senin - Sabtu, 09:00 - 18:00
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <Mail className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">
                  hello@mytoko.id<br />support@mytoko.id
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="MyToko" width={32} height={32} />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  MyToko
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Destinasi fashion streetwear terdepan di Indonesia dengan kualitas premium.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#katalog" className="hover:text-primary">Katalog</Link></li>
                <li><Link href="#tentang" className="hover:text-primary">Tentang Kami</Link></li>
                <li><Link href="#kontak" className="hover:text-primary">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Gratis Ongkir</li>
                <li>Garansi Produk</li>
                <li>Return & Refund</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ikuti Kami</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Instagram</li>
                <li>TikTok</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 MyToko. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
