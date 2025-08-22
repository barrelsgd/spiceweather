import React from "react";

export const metadata = { title: "Tsunami Warnings | Admin", description: "Tsunami alerts and status." };

export default function AdminAlertsTsunamiPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Tsunami Warnings</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Manage tsunami alerts and dissemination.</p>
    </main>
  );
}
