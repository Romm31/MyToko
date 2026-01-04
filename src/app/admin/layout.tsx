import Link from "next/link";
import { LayoutDashboard, Package, LogOut } from "lucide-react";
import { logout, getUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-muted/30">
        <div className="p-6">
          <h2 className="text-lg font-bold text-primary">Admin Panel</h2>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <Package className="h-5 w-5" />
            Produk
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <form action={logout}>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
          </form>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background z-50">
        <nav className="flex justify-around py-2">
          <Link
            href="/admin"
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-primary"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-primary"
          >
            <Package className="h-5 w-5" />
            <span className="text-xs">Produk</span>
          </Link>
          <form action={logout}>
            <button className="flex flex-col items-center gap-1 px-4 py-2 text-muted-foreground hover:text-destructive">
              <LogOut className="h-5 w-5" />
              <span className="text-xs">Keluar</span>
            </button>
          </form>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 pb-20 md:pb-6">{children}</main>
    </div>
  );
}
