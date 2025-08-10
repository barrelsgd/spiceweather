import Link from "next/link";
import type { Metadata } from "next";
import { usersApi, itemsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  // Auth is enforced by app/(protected)/layout.tsx via requireAuthOrRedirect
  const me = await usersApi().readUserMe();
  const user = me?.data;
  const itemsResp = await itemsApi().readItems({ skip: 0, limit: 1 });
  const itemsCount = itemsResp?.data?.count ?? 0;

  return (
    <main className="mx-auto mt-8 w-full max-w-5xl px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Admin</h1>
        <p className="text-sm text-muted-foreground">Welcome{user?.full_name ? `, ${user.full_name}` : user?.email ? `, ${user.email}` : ''}. This area is protected.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded border p-4">
          <div className="text-sm text-muted-foreground">Items</div>
          <div className="mt-1 text-2xl font-semibold">{itemsCount}</div>
          <div className="mt-3 flex gap-2">
            <Button asChild size="sm">
              <Link href="/items">View items</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/items/new">New item</Link>
            </Button>
          </div>
        </div>

        <div className="rounded border p-4">
          <div className="text-sm text-muted-foreground">Account</div>
          <div className="mt-1 text-2xl font-semibold">Profile</div>
          <div className="mt-3">
            <Button asChild size="sm" variant="outline">
              <Link href="/profile">Manage profile</Link>
            </Button>
          </div>
        </div>

        <div className="rounded border p-4">
          <div className="text-sm text-muted-foreground">System</div>
          <div className="mt-1 text-2xl font-semibold">Environment</div>
          <div className="mt-2 text-sm text-muted-foreground break-all">
            API: {process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.barrels.gd"}
          </div>
        </div>
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Admin",
  description: "Administrative tools and settings.",
  alternates: { canonical: "/admin" },
};
