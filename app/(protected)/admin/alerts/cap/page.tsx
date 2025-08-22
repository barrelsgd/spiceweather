import React from "react";

export const metadata = {
  title: "CAP Alerts | Admin",
  description: "Common Alerting Protocol management and validation.",
};

export default function AdminAlertsCapPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Common Alerting Protocol</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Review, create, and disseminate CAP alerts.</p>
    </main>
  );
}
