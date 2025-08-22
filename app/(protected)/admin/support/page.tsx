import React from "react";

export const metadata = {
  title: "Support Desk | Admin",
  description:
    "Report operational issues affecting meteorological services. Aligned with WMO/ICAO operational practices.",
};

export default function AdminSupportDeskPage() {
  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Support Desk</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Log operational issues impacting observations, forecasts, dissemination, or aviation services.
        </p>
      </header>

      <section aria-labelledby="new-ticket-heading" className="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
        <h2 id="new-ticket-heading" className="text-base font-medium">
          New ticket
        </h2>

        <form className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" action="#" method="post" aria-describedby="ticket-help">
          <div className="sm:col-span-1">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="mt-1 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-900 shadow-sm focus:border-brand-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority (ICAO)
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue="routine"
              className="mt-1 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-900 shadow-sm focus:border-brand-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="routine">Routine</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical (Safety of Operations)</option>
            </select>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue="aviation"
              className="mt-1 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-900 shadow-sm focus:border-brand-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="observations">Observations (AWS, Radar, Upper Air)</option>
              <option value="aviation">Aviation (METAR/TAF, SIGMET, AFTN)</option>
              <option value="forecasting">Forecasting (NWP, Nowcasting, Guidance)</option>
              <option value="dissemination">Dissemination (Web, CAP, Social)</option>
              <option value="instruments">Instruments & Calibration</option>
              <option value="it-systems">IT Systems/Networks</option>
            </select>
          </div>

          <div className="sm:col-span-1">
            <label htmlFor="station" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Station/Facility (WMO/ICAO ID)
            </label>
            <input
              id="station"
              name="station"
              type="text"
              placeholder="e.g., TGPY, 78954"
              className="mt-1 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-900 shadow-sm focus:border-brand-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Details
            </label>
            <textarea
              id="details"
              name="details"
              rows={5}
              placeholder="Describe the issue, steps to reproduce, and operational impact. Include timestamps in UTC."
              className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <p id="ticket-help" className="sm:col-span-2 text-xs text-gray-500 dark:text-gray-400">
            Use UTC times and official identifiers where applicable (WMO-No. 306, ICAO Annex 3).
          </p>

          <div className="sm:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              Submit Ticket
            </button>
            <button
              type="reset"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
