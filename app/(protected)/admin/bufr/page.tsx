"use client";

import { useState } from "react";

export default function BufrFormPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const form = new FormData(e.currentTarget);

    // Build minimal payload shaped like BUFR.components.schemas.SynopTM307080
    const payload = {
      surfaceStationIdentification: {
        wmoBlockNumber: Number(form.get("wmoBlockNumber")),
        wmoStationNumber: Number(form.get("wmoStationNumber")),
        stationOrSiteName: String(form.get("stationOrSiteName") || ""),
        typeOfStation: String(form.get("typeOfStation") || ""),
        time: {
          year: Number(form.get("time.year")),
          month: Number(form.get("time.month")),
          day: Number(form.get("time.day")),
          hour: Number(form.get("time.hour")),
          minute: Number(form.get("time.minute")),
        },
        location: {
          latitude: Number(form.get("location.latitude")),
          longitude: Number(form.get("location.longitude")),
          stationGroundHeightMSL_m: form.get(
            "location.stationGroundHeightMSL_m"
          )
            ? Number(form.get("location.stationGroundHeightMSL_m"))
            : undefined,
          barometerHeightMSL_m: form.get("location.barometerHeightMSL_m")
            ? Number(form.get("location.barometerHeightMSL_m"))
            : undefined,
        },
      },
      pressureInformation: {
        stationPressure_Pa: form.get("pressure.stationPressure_Pa")
          ? Number(form.get("pressure.stationPressure_Pa"))
          : undefined,
        pressureReducedToMSL_Pa: form.get("pressure.pressureReducedToMSL_Pa")
          ? Number(form.get("pressure.pressureReducedToMSL_Pa"))
          : undefined,
      },
      basicSynopticInstantaneousData: {
        temperatureAndHumidity: {
          sensorHeight_m: form.get("tah.sensorHeight_m")
            ? Number(form.get("tah.sensorHeight_m"))
            : undefined,
          airTemperature_K: form.get("tah.airTemperature_K")
            ? Number(form.get("tah.airTemperature_K"))
            : undefined,
          dewpointTemperature_K: form.get("tah.dewpointTemperature_K")
            ? Number(form.get("tah.dewpointTemperature_K"))
            : undefined,
          relativeHumidity_pct: form.get("tah.relativeHumidity_pct")
            ? Number(form.get("tah.relativeHumidity_pct"))
            : undefined,
        },
      },
      basicSynopticPeriodData: {
        presentAndPastWeather: {
          presentWeather: String(form.get("ppw.presentWeather") || ""),
          timePeriodHours: form.get("ppw.timePeriodHours")
            ? Number(form.get("ppw.timePeriodHours"))
            : undefined,
          pastWeather1: form.get("ppw.pastWeather1")
            ? String(form.get("ppw.pastWeather1"))
            : undefined,
          pastWeather2: form.get("ppw.pastWeather2")
            ? String(form.get("ppw.pastWeather2"))
            : undefined,
        },
      },
    };

    try {
      const res = await fetch("/api/bufr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(`Error: ${data?.error || res.statusText}`);
      } else {
        setMessage("Submitted successfully.");
      }
    } catch (err) {
      setMessage("Network error while submitting.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="container  px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">
        SYNOP (BUFR 3 07 080) Submission
      </h1>
      <p className="text-sm text-muted-foreground mb-6">
        Enter observation fields. Required fields are marked with *.
      </p>

      <form onSubmit={onSubmit} noValidate>
        {/* Surface Station Identification */}
        <fieldset className="mb-6 border rounded-md p-4">
          <legend className="font-medium">
            Surface Station Identification *
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <label
                htmlFor="wmoBlockNumber"
                className="block text-sm font-medium"
              >
                WMO Block Number *
              </label>
              <input
                id="wmoBlockNumber"
                name="wmoBlockNumber"
                inputMode="numeric"
                type="number"
                min={0}
                max={99}
                required
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="wmoStationNumber"
                className="block text-sm font-medium"
              >
                WMO Station Number *
              </label>
              <input
                id="wmoStationNumber"
                name="wmoStationNumber"
                inputMode="numeric"
                type="number"
                min={0}
                max={999}
                required
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div className="md:col-span-1">
              <label
                htmlFor="stationOrSiteName"
                className="block text-sm font-medium"
              >
                Station or Site Name
              </label>
              <input
                id="stationOrSiteName"
                name="stationOrSiteName"
                type="text"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label
                htmlFor="typeOfStation"
                className="block text-sm font-medium"
              >
                Type of Station (code) *
              </label>
              <input
                id="typeOfStation"
                name="typeOfStation"
                type="text"
                required
                className="mt-1 w-full rounded border px-3 py-2"
                aria-describedby="typeOfStation-help"
              />
              <p
                id="typeOfStation-help"
                className="text-xs text-muted-foreground mt-1"
              >
                BUFR 0 02 001 — enter code or mnemonic
              </p>
            </div>
          </div>

          {/* Time */}
          <div className="mt-4">
            <h3 className="text-sm font-medium">Time (UTC) *</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-2">
              <div>
                <label htmlFor="time.year" className="block text-sm">
                  Year *
                </label>
                <input
                  id="time.year"
                  name="time.year"
                  type="number"
                  min={1900}
                  max={2100}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="time.month" className="block text-sm">
                  Month *
                </label>
                <input
                  id="time.month"
                  name="time.month"
                  type="number"
                  min={1}
                  max={12}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="time.day" className="block text-sm">
                  Day *
                </label>
                <input
                  id="time.day"
                  name="time.day"
                  type="number"
                  min={1}
                  max={31}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="time.hour" className="block text-sm">
                  Hour *
                </label>
                <input
                  id="time.hour"
                  name="time.hour"
                  type="number"
                  min={0}
                  max={23}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="time.minute" className="block text-sm">
                  Minute *
                </label>
                <input
                  id="time.minute"
                  name="time.minute"
                  type="number"
                  min={0}
                  max={59}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-4">
            <h3 className="text-sm font-medium">Location *</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
              <div>
                <label htmlFor="location.latitude" className="block text-sm">
                  Latitude *
                </label>
                <input
                  id="location.latitude"
                  name="location.latitude"
                  type="number"
                  step="any"
                  min={-90}
                  max={90}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="location.longitude" className="block text-sm">
                  Longitude *
                </label>
                <input
                  id="location.longitude"
                  name="location.longitude"
                  type="number"
                  step="any"
                  min={-180}
                  max={180}
                  required
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="location.stationGroundHeightMSL_m"
                  className="block text-sm"
                >
                  Station Ground Height (m)
                </label>
                <input
                  id="location.stationGroundHeightMSL_m"
                  name="location.stationGroundHeightMSL_m"
                  type="number"
                  step="any"
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
              <div>
                <label
                  htmlFor="location.barometerHeightMSL_m"
                  className="block text-sm"
                >
                  Barometer Height (m)
                </label>
                <input
                  id="location.barometerHeightMSL_m"
                  name="location.barometerHeightMSL_m"
                  type="number"
                  step="any"
                  className="mt-1 w-full rounded border px-3 py-2"
                />
              </div>
            </div>
          </div>
        </fieldset>

        {/* Pressure Information */}
        <fieldset className="mb-6 border rounded-md p-4">
          <legend className="font-medium">Pressure Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label
                htmlFor="pressure.stationPressure_Pa"
                className="block text-sm"
              >
                Station Pressure (Pa)
              </label>
              <input
                id="pressure.stationPressure_Pa"
                name="pressure.stationPressure_Pa"
                type="number"
                step="any"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="pressure.pressureReducedToMSL_Pa"
                className="block text-sm"
              >
                Pressure Reduced to MSL (Pa)
              </label>
              <input
                id="pressure.pressureReducedToMSL_Pa"
                name="pressure.pressureReducedToMSL_Pa"
                type="number"
                step="any"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        {/* Temperature & Humidity */}
        <fieldset className="mb-6 border rounded-md p-4">
          <legend className="font-medium">Temperature & Humidity</legend>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <div>
              <label htmlFor="tah.sensorHeight_m" className="block text-sm">
                Sensor Height (m)
              </label>
              <input
                id="tah.sensorHeight_m"
                name="tah.sensorHeight_m"
                type="number"
                step="any"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="tah.airTemperature_K" className="block text-sm">
                Air Temp (K)
              </label>
              <input
                id="tah.airTemperature_K"
                name="tah.airTemperature_K"
                type="number"
                step="any"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="tah.dewpointTemperature_K"
                className="block text-sm"
              >
                Dewpoint (K)
              </label>
              <input
                id="tah.dewpointTemperature_K"
                name="tah.dewpointTemperature_K"
                type="number"
                step="any"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label
                htmlFor="tah.relativeHumidity_pct"
                className="block text-sm"
              >
                RH (%)
              </label>
              <input
                id="tah.relativeHumidity_pct"
                name="tah.relativeHumidity_pct"
                type="number"
                min={0}
                max={100}
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        {/* Present & Past Weather */}
        <fieldset className="mb-6 border rounded-md p-4">
          <legend className="font-medium">Present & Past Weather</legend>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <div>
              <label htmlFor="ppw.presentWeather" className="block text-sm">
                Present Weather (code)
              </label>
              <input
                id="ppw.presentWeather"
                name="ppw.presentWeather"
                type="text"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="ppw.timePeriodHours" className="block text-sm">
                Time Period (h)
              </label>
              <input
                id="ppw.timePeriodHours"
                name="ppw.timePeriodHours"
                type="number"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="ppw.pastWeather1" className="block text-sm">
                Past Weather 1 (code)
              </label>
              <input
                id="ppw.pastWeather1"
                name="ppw.pastWeather1"
                type="text"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="ppw.pastWeather2" className="block text-sm">
                Past Weather 2 (code)
              </label>
              <input
                id="ppw.pastWeather2"
                name="ppw.pastWeather2"
                type="text"
                className="mt-1 w-full rounded border px-3 py-2"
              />
            </div>
          </div>
        </fieldset>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
          {message ? (
            <span role="status" className="text-sm">
              {message}
            </span>
          ) : null}
        </div>
      </form>
    </main>
  );
}
