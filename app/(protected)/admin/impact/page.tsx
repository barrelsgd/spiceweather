"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ImpactFormPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

    // Build minimal IBFProduct
    const audienceStr = (data.get("impactAudience") as string) || "";
    const audience = audienceStr.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);

    const coordsStr = (data.get("areaPoint") as string) || ""; // "lon,lat" or "lon,lat,alt"
    const coords = coordsStr
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean)
      .map((n) => Number(n));

    const payload: any = {
      id: (data.get("id") as string)?.trim(),
      issued: toIso(data.get("issued")) || undefined,
      validFrom: toIso(data.get("validFrom")) || undefined,
      validTo: toIso(data.get("validTo")) || undefined,
      issuer: {
        name: (data.get("issuerName") as string)?.trim(),
        unit: (data.get("issuerUnit") as string)?.trim() || undefined,
        contact: (data.get("issuerContact") as string)?.trim() || undefined,
        web: (data.get("issuerWeb") as string)?.trim() || undefined,
        country: (data.get("issuerCountry") as string)?.trim() || undefined,
      },
      hazard: {
        type: (data.get("hazardType") as string)?.trim(),
        description: (data.get("hazardDesc") as string)?.trim(),
        leadTime: (data.get("leadTime") as string)?.trim(),
      },
      riskAssessment: {
        likelihood: data.get("likelihood"),
        impactLevel: data.get("impactLevel"),
        riskLevel: data.get("riskLevel"),
        matrixRationale: (data.get("matrixRationale") as string)?.trim() || undefined,
      },
      areas: [
        {
          areaName: (data.get("areaName") as string)?.trim(),
          geometry: coords.length >= 2 ? { type: "Point", coordinates: coords } : undefined,
        },
      ],
      impacts: [
        {
          headline: (data.get("impactHeadline") as string)?.trim(),
          audience,
          details: (data.get("impactDetails") as string)?.trim() || undefined,
        },
      ],
    };

    try {
      const res = await fetch("/api/impact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) setError(JSON.stringify(json, null, 2));
      else {
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
          <CardTitle>Impact-Based Forecast (IBF)</CardTitle>
          <CardDescription>Submit a minimal IBF product: header, hazard, risk, one area, one impact.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6">
            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Header</legend>
              <div className="grid gap-2">
                <Label htmlFor="id">ID</Label>
                <Input id="id" name="id" required aria-required="true" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="issued">Issued</Label>
                  <Input id="issued" name="issued" type="datetime-local" required aria-required="true" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validFrom">Valid From</Label>
                  <Input id="validFrom" name="validFrom" type="datetime-local" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="validTo">Valid To</Label>
                  <Input id="validTo" name="validTo" type="datetime-local" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issuerName">Issuer Name</Label>
                <Input id="issuerName" name="issuerName" required aria-required="true" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="issuerUnit">Unit</Label>
                  <Input id="issuerUnit" name="issuerUnit" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="issuerContact">Contact</Label>
                  <Input id="issuerContact" name="issuerContact" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="issuerWeb">Website</Label>
                  <Input id="issuerWeb" name="issuerWeb" type="url" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issuerCountry">Country</Label>
                <Input id="issuerCountry" name="issuerCountry" />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Hazard</legend>
              <div className="grid gap-2">
                <Label htmlFor="hazardType">Type</Label>
                <Input id="hazardType" name="hazardType" required aria-required="true" placeholder="e.g., HeavyRain" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hazardDesc">Description</Label>
                <Textarea id="hazardDesc" name="hazardDesc" rows={3} required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="leadTime">Lead Time (ISO 8601 duration)</Label>
                <Input id="leadTime" name="leadTime" placeholder="e.g., PT6H or P2D" required aria-required="true" />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Risk Assessment</legend>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Likelihood</Label>
                  <Select name="likelihood" defaultValue="Medium">
                    <SelectTrigger aria-label="Likelihood">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VeryLow">VeryLow</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Impact Level</Label>
                  <Select name="impactLevel" defaultValue="Medium">
                    <SelectTrigger aria-label="Impact Level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VeryLow">VeryLow</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Risk Level</Label>
                  <Select name="riskLevel" defaultValue="Yellow">
                    <SelectTrigger aria-label="Risk Level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Green">Green</SelectItem>
                      <SelectItem value="Yellow">Yellow</SelectItem>
                      <SelectItem value="Orange">Orange</SelectItem>
                      <SelectItem value="Red">Red</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="matrixRationale">Matrix Rationale</Label>
                <Textarea id="matrixRationale" name="matrixRationale" rows={3} />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Area</legend>
              <div className="grid gap-2">
                <Label htmlFor="areaName">Area Name</Label>
                <Input id="areaName" name="areaName" required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="areaPoint">Point coordinates (lon,lat[,alt])</Label>
                <Input id="areaPoint" name="areaPoint" placeholder="103.9,1.3" />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Impact</legend>
              <div className="grid gap-2">
                <Label htmlFor="impactHeadline">Headline</Label>
                <Input id="impactHeadline" name="impactHeadline" required aria-required="true" placeholder="e.g., Flooding in low-lying areas" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="impactAudience">Audience (comma/newline separated)</Label>
                <Textarea id="impactAudience" name="impactAudience" rows={2} required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="impactDetails">Details</Label>
                <Textarea id="impactDetails" name="impactDetails" rows={3} />
              </div>
            </fieldset>

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit IBF"}</Button>
            </div>

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
