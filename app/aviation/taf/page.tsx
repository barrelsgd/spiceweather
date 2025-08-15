"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function TAFFormPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCancelReport, setIsCancelReport] = useState(false);

  // Convert a datetime-local value (no timezone) to UTC ISO string with timezone
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

    const payload: any = {
      issueTime: toIso(data.get("issueTime")),
      aerodrome: {
        icaoCode: (data.get("icaoCode") as string)?.trim() || undefined,
        name: (data.get("aerodromeName") as string)?.trim() || undefined,
      },
      isCancelReport,
    };

    if (!isCancelReport) {
      payload.validPeriod = {
        start: toIso(data.get("validStart")) || undefined,
        end: toIso(data.get("validEnd")) || undefined,
      };
      payload.baseForecast = {
        phenomenonTime: {
          start: toIso(data.get("baseStart")) || undefined,
          end: toIso(data.get("baseEnd")) || undefined,
        },
        cloudAndVisibilityOK: data.get("cavok") === "on" ? true : undefined,
      };

      const visValue = data.get("prevVisValue");
      const visUom = data.get("prevVisUom");
      if (visValue && visUom) {
        payload.baseForecast.prevailingVisibility = {
          value: Number(visValue),
          uom: String(visUom),
        };
      }

      const windDir = data.get("windDir");
      const windDirUom = data.get("windDirUom");
      const windSpd = data.get("windSpd");
      const windSpdUom = data.get("windSpdUom");
      if (windDir || windSpd) {
        payload.baseForecast.surfaceWind = {} as any;
        if (windDir && windDirUom) {
          payload.baseForecast.surfaceWind.meanWindDirection = {
            value: Number(windDir),
            uom: String(windDirUom),
          };
        }
        if (windSpd && windSpdUom) {
          payload.baseForecast.surfaceWind.meanWindSpeed = {
            value: Number(windSpd),
            uom: String(windSpdUom),
          };
        }
      }

      const wxCode = (data.get("wxCode") as string)?.trim();
      if (wxCode) {
        payload.baseForecast.weather = [{ code: wxCode }];
      }
    } else {
      payload.cancelledReportValidPeriod = {
        start: toIso(data.get("cancelStart")) || undefined,
        end: toIso(data.get("cancelEnd")) || undefined,
      };
    }

    try {
      const res = await fetch("/api/aviation/taf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(JSON.stringify(json, null, 2));
      } else {
        setResult(JSON.stringify(json, null, 2));
        form.reset();
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
          <CardTitle>TAF Report</CardTitle>
          <CardDescription>
            Submit a minimal IWXXM TAF. Provide issue time and aerodrome. Toggle Cancel if sending a cancellation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} aria-describedby="form-help">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="issueTime">Issue Time (UTC ISO)</Label>
                <Input id="issueTime" name="issueTime" type="datetime-local" required aria-required="true" />
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

              <div className="flex items-center gap-3">
                <Switch id="isCancelReport" checked={isCancelReport} onCheckedChange={setIsCancelReport} aria-labelledby="cancel-label" />
                <Label id="cancel-label" htmlFor="isCancelReport">Cancel Report</Label>
              </div>

              {!isCancelReport ? (
                <>
                  <fieldset className="grid gap-4 border p-4 rounded-md">
                    <legend className="px-1 text-sm font-medium">Valid Period</legend>
                    <div className="grid gap-2">
                      <Label htmlFor="validStart">Start</Label>
                      <Input id="validStart" name="validStart" type="datetime-local" required aria-required="true" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="validEnd">End</Label>
                      <Input id="validEnd" name="validEnd" type="datetime-local" required aria-required="true" />
                    </div>
                  </fieldset>

                  <fieldset className="grid gap-4 border p-4 rounded-md">
                    <legend className="px-1 text-sm font-medium">Base Forecast</legend>
                    <div className="grid gap-2">
                      <Label htmlFor="baseStart">Phenomenon Start</Label>
                      <Input id="baseStart" name="baseStart" type="datetime-local" required aria-required="true" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="baseEnd">Phenomenon End</Label>
                      <Input id="baseEnd" name="baseEnd" type="datetime-local" required aria-required="true" />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <Input id="cavok" name="cavok" type="checkbox" className="h-4 w-4" aria-describedby="cavok-help" />
                      <Label htmlFor="cavok">CAVOK</Label>
                    </div>
                    <p id="cavok-help" className="text-sm text-muted-foreground">If CAVOK is set, visibility, weather and cloud should be omitted.</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="prevVisValue">Prevailing Visibility</Label>
                        <div className="flex gap-2">
                          <Input id="prevVisValue" name="prevVisValue" type="number" step="1" placeholder="e.g., 6000" />
                          <Input id="prevVisUom" name="prevVisUom" placeholder="m" defaultValue="m" aria-label="Visibility unit" />
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="wxCode">Weather code</Label>
                        <Input id="wxCode" name="wxCode" placeholder="e.g., -RA BR" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="windDir">Wind Direction</Label>
                        <div className="flex gap-2">
                          <Input id="windDir" name="windDir" type="number" step="1" placeholder="deg" />
                          <Input id="windDirUom" name="windDirUom" placeholder="deg" defaultValue="deg" aria-label="Direction unit" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="windSpd">Wind Speed</Label>
                        <div className="flex gap-2">
                          <Input id="windSpd" name="windSpd" type="number" step="0.1" placeholder="e.g., 10" />
                          <Input id="windSpdUom" name="windSpdUom" placeholder="[kn_i]" defaultValue="[kn_i]" aria-label="Speed unit" />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </>
              ) : (
                <fieldset className="grid gap-4 border p-4 rounded-md">
                  <legend className="px-1 text-sm font-medium">Cancelled Report Valid Period</legend>
                  <div className="grid gap-2">
                    <Label htmlFor="cancelStart">Start</Label>
                    <Input id="cancelStart" name="cancelStart" type="datetime-local" required aria-required="true" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cancelEnd">End</Label>
                    <Input id="cancelEnd" name="cancelEnd" type="datetime-local" required aria-required="true" />
                  </div>
                </fieldset>
              )}

              <div className="flex justify-end gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit TAF"}
                </Button>
              </div>

              <p id="form-help" className="sr-only">
                All fields use semantic labels. Required fields are marked via required attribute.
              </p>

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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
