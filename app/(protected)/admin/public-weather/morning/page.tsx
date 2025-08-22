import React from "react";

export const metadata = { title: "Morning Forecast | Admin", description: "Author and publish morning forecast." };

export default function AdminPublicWeatherMorningPage() {
  return (
    <main className="space-y-2">
      <h1 className="text-2xl font-semibold">Morning Forecast</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">Draft and publish the morning forecast.</p>
    </main>
  );
}
