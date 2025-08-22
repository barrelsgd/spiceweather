import React from "react";

export const metadata = { title: "Volcano Alerts | Admin", description: "Volcanic activity advisories." };

export default function AdminAlertsVolcanoPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Volcano Alerts</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Track and issue volcanic advisories.</p>
    </main>
  );
}
