"use client";

import { useState } from "react";
import { seedProducts } from "@/actions/seed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, Check } from "lucide-react";
import Link from "next/link";

export default function SeedPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSeed() {
    setIsLoading(true);
    setError(null);
    
    const result = await seedProducts();
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || "Gagal menambahkan produk sample");
    }
    
    setIsLoading(false);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Package className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Seed Database</CardTitle>
          <CardDescription>
            Tambahkan produk sample ke database
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <p className="text-green-600 font-medium">6 Produk berhasil ditambahkan!</p>
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Lihat Katalog
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}
              <Button 
                onClick={handleSeed} 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Tambahkan 6 Produk Sample
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Ini akan menambahkan produk sample untuk demo
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
