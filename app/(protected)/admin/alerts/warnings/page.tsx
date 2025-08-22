import React from "react";

export const metadata = { title: "Warnings & Advisories | Admin", description: "Operational warnings overview." };

export default function AdminAlertsWarningsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Warnings & Advisories</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Monitor and manage national warnings.</p>
    </main>
  );
}
