"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MetarSpeciFormPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCavok, setIsCavok] = useState(false);

  const toIso = (v: FormDataEntryValue | null) => {
    const s = (v as string) || "";
    if (!s) return undefined;
    const d = new Date(s);
    return isNaN(d.getTime()) ? undefined : d.toISOString();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const reportType = (data.get("reportType") as string) || "METAR";

    const payload: any = {
      reportType,
      issueTime: toIso(data.get("issueTime")) || undefined,
      aerodrome: {
        icaoCode: (data.get("icaoCode") as string)?.trim() || undefined,
        name: (data.get("aerodromeName") as string)?.trim() || undefined,
      },
      observationTime: toIso(data.get("observationTime")) || undefined,
      observation: {
        cloudAndVisibilityOK: data.get("cloudAndVisibilityOK") === "on",
      },
    };

    // Optional temps, qnh
    const t = data.get("airTemp");
    const td = data.get("dewTemp");
    const qnh = data.get("qnh");
    if (t !== null && String(t).length) payload.observation.airTemperature = { value: Number(t), uom: "Cel" };
    if (td !== null && String(td).length) payload.observation.dewpointTemperature = { value: Number(td), uom: "Cel" };
    if (qnh !== null && String(qnh).length) payload.observation.qnh = { value: Number(qnh), uom: "hPa" };

    // Optional wind
    const windDir = data.get("windDir");
    const windSpd = data.get("windSpd");
    const windGust = data.get("windGust");
    if ((windDir && String(windDir).length) || (windSpd && String(windSpd).length) || (windGust && String(windGust).length)) {
      payload.observation.surfaceWind = {};
      if (windDir && String(windDir).length) payload.observation.surfaceWind.meanWindDirection = { value: Number(windDir), uom: "deg" };
      if (windSpd && String(windSpd).length) payload.observation.surfaceWind.meanWindSpeed = { value: Number(windSpd), uom: "[kn_i]" };
      if (windGust && String(windGust).length) payload.observation.surfaceWind.windGustSpeed = { value: Number(windGust), uom: "[kn_i]" };
    }

    // If not CAVOK, allow visibility, present weather, and a single cloud layer
    if (!payload.observation.cloudAndVisibilityOK) {
      const prevVis = data.get("prevVis");
      if (prevVis && String(prevVis).length) {
        payload.observation.visibility = { prevailingVisibility: { value: Number(prevVis), uom: "m" } };
      }

      const wxCodesStr = (data.get("presentWeather") as string) || "";
      const wxCodes = wxCodesStr
        .split(/[\n,]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 3)
        .map((code) => ({ code }));
      if (wxCodes.length) payload.observation.presentWeather = wxCodes;

      const cloudAmount = (data.get("cloudAmount") as string) || "";
      const cloudBase = data.get("cloudBase");
      const cloudType = (data.get("cloudType") as string) || "";
      if (cloudAmount || (cloudBase && String(cloudBase).length) || cloudType) {
        payload.observation.cloud = { layer: [{ amount: cloudAmount || undefined, base: cloudBase ? { value: Number(cloudBase), uom: "[ft_i]" } : undefined, cloudType: cloudType || undefined }] };
      }
    }

    try {
      const res = await fetch("/api/aviation/metar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) setError(JSON.stringify(json, null, 2));
      else {
        setResult(JSON.stringify(json, null, 2));
        form.reset();
        setIsCavok(false);
      }
    } catch (err: any) {
      setError(err?.message ?? "Request failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>METAR / SPECI</CardTitle>
          <CardDescription>Submit an IWXXM METAR or SPECI mapped JSON payload. Use CAVOK to omit visibility/weather/cloud.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6" aria-describedby="form-help">
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Report Type</Label>
                <Select name="reportType" defaultValue="METAR">
                  <SelectTrigger aria-label="Report Type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="METAR">METAR</SelectItem>
                    <SelectItem value="SPECI">SPECI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issueTime">Issue Time</Label>
                <Input id="issueTime" name="issueTime" type="datetime-local" required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observationTime">Observation Time</Label>
                <Input id="observationTime" name="observationTime" type="datetime-local" required aria-required="true" />
              </div>
            </div>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Aerodrome</legend>
              <div className="grid gap-2">
                <Label htmlFor="icaoCode">ICAO Code</Label>
                <Input id="icaoCode" name="icaoCode" placeholder="e.g., WSSS" required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="aerodromeName">Name (optional)</Label>
                <Input id="aerodromeName" name="aerodromeName" />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Observation</legend>
              <div className="flex items-center gap-3">
                <Input
                  id="cloudAndVisibilityOK"
                  name="cloudAndVisibilityOK"
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={(e) => setIsCavok(e.currentTarget.checked)}
                  aria-describedby="cavok-help"
                />
                <Label htmlFor="cloudAndVisibilityOK">CAVOK</Label>
              </div>
              <p id="cavok-help" className="text-sm text-muted-foreground">If CAVOK is set, visibility, present weather and cloud should be omitted.</p>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="airTemp">Air Temp (°C)</Label>
                  <Input id="airTemp" name="airTemp" type="number" step="0.1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dewTemp">Dewpoint (°C)</Label>
                  <Input id="dewTemp" name="dewTemp" type="number" step="0.1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="qnh">QNH (hPa)</Label>
                  <Input id="qnh" name="qnh" type="number" step="0.1" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="windDir">Wind Dir (deg)</Label>
                  <Input id="windDir" name="windDir" type="number" step="1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="windSpd">Wind Spd (kt)</Label>
                  <Input id="windSpd" name="windSpd" type="number" step="0.1" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="windGust">Gust (kt)</Label>
                  <Input id="windGust" name="windGust" type="number" step="0.1" />
                </div>
              </div>

              {!isCavok ? (
                <>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="prevVis">Prevailing Vis (m)</Label>
                      <Input id="prevVis" name="prevVis" type="number" step="1" />
                    </div>
                    <div className="grid gap-2 col-span-2">
                      <Label htmlFor="presentWeather">Present weather codes (comma/newline)</Label>
                      <Input id="presentWeather" name="presentWeather" placeholder="-RA, BR" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cloudAmount">Cloud amount</Label>
                      <Select name="cloudAmount">
                        <SelectTrigger aria-label="Cloud amount">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FEW">FEW</SelectItem>
                          <SelectItem value="SCT">SCT</SelectItem>
                          <SelectItem value="BKN">BKN</SelectItem>
                          <SelectItem value="OVC">OVC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cloudBase">Cloud base (ft)</Label>
                      <Input id="cloudBase" name="cloudBase" type="number" step="1" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cloudType">Cloud type</Label>
                      <Select name="cloudType">
                        <SelectTrigger aria-label="Cloud type">
                          <SelectValue placeholder="Optional" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CB">CB</SelectItem>
                          <SelectItem value="TCU">TCU</SelectItem>
                          <SelectItem value="NSC">NSC</SelectItem>
                          <SelectItem value="NCD">NCD</SelectItem>
                          <SelectItem value="///">///</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              ) : null}
            </fieldset>

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</Button>
            </div>

            <p id="form-help" className="sr-only">All fields use semantic labels. Required fields are marked via required attribute.</p>

            {error ? (
              <div role="alert" className="rounded-md border p-3 text-sm text-red-600">
                <pre className="whitespace-pre-wrap">{error}</pre>
              </div>
            ) : null}
            {result ? (
              <div className="rounded-md border p-3 text-sm">
                <pre className="whitespace-pre-wrap">{result}</pre>
              </div>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
