import React from "react";

export const metadata = { title: "Tropical Cyclone Advisories | Admin", description: "TC bulletin workflow." };

export default function AdminAlertsTcPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Tropical Cyclone Advisories</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Author, import, and distribute TC advisories.</p>
    </main>
  );
}
