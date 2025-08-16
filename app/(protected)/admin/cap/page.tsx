"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CAPFormPage() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scope, setScope] = useState("Public");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    setError(null);

    const data = new FormData(e.currentTarget);

    const infoCategory = data.get("infoCategory") as string;
    const payload: any = {
      identifier: (data.get("identifier") as string)?.trim(),
      sender: (data.get("sender") as string)?.trim(),
      sent: (data.get("sent") as string)?.trim(),
      status: data.get("status"),
      msgType: data.get("msgType"),
      scope,
      source: (data.get("source") as string)?.trim() || undefined,
      info: [
        {
          language: (data.get("language") as string)?.trim() || undefined,
          category: infoCategory ? [infoCategory] : undefined,
          event: (data.get("event") as string)?.trim(),
          urgency: data.get("urgency"),
          severity: data.get("severity"),
          certainty: data.get("certainty"),
          headline: (data.get("headline") as string)?.trim() || undefined,
          description: (data.get("description") as string)?.trim() || undefined,
          instruction: (data.get("instruction") as string)?.trim() || undefined,
          web: (data.get("web") as string)?.trim() || undefined,
        },
      ],
    };

    if (scope === "Restricted") {
      payload.restriction = (data.get("restriction") as string)?.trim();
    }
    if (scope === "Private") {
      const addresses = (data.get("addresses") as string)?.trim();
      payload.addresses = addresses ? addresses.split(/[,\n\s]+/).filter(Boolean) : [];
    }

    try {
      const res = await fetch("/api/cap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) setError(JSON.stringify(json, null, 2));
      else {
        setResult(JSON.stringify(json, null, 2));
        (e.target as HTMLFormElement).reset();
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
          <CardTitle>CAP v1.2 Alert</CardTitle>
          <CardDescription>Provide the required alert header and one info block.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-6">
            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Header</legend>
              <div className="grid gap-2">
                <Label htmlFor="identifier">Identifier</Label>
                <Input id="identifier" name="identifier" required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sender">Sender</Label>
                <Input id="sender" name="sender" required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sent">Sent (offset required)</Label>
                <Input id="sent" name="sent" placeholder="YYYY-MM-DDThh:mm:ss+hh:mm" required aria-required="true" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select name="status" defaultValue="Actual">
                    <SelectTrigger aria-label="Status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actual">Actual</SelectItem>
                      <SelectItem value="Exercise">Exercise</SelectItem>
                      <SelectItem value="System">System</SelectItem>
                      <SelectItem value="Test">Test</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Message Type</Label>
                  <Select name="msgType" defaultValue="Alert">
                    <SelectTrigger aria-label="Message Type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alert">Alert</SelectItem>
                      <SelectItem value="Update">Update</SelectItem>
                      <SelectItem value="Cancel">Cancel</SelectItem>
                      <SelectItem value="Ack">Ack</SelectItem>
                      <SelectItem value="Error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Scope</Label>
                  <Select value={scope} onValueChange={setScope} name="scope">
                    <SelectTrigger aria-label="Scope">
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Restricted">Restricted</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {scope === "Restricted" && (
                <div className="grid gap-2">
                  <Label htmlFor="restriction">Restriction</Label>
                  <Input id="restriction" name="restriction" />
                </div>
              )}
              {scope === "Private" && (
                <div className="grid gap-2">
                  <Label htmlFor="addresses">Addresses (comma/space separated)</Label>
                  <Textarea id="addresses" name="addresses" rows={2} />
                </div>
              )}
            </fieldset>

            <fieldset className="grid gap-4 border p-4 rounded-md">
              <legend className="px-1 text-sm font-medium">Info (one)</legend>
              <div className="grid gap-2">
                <Label htmlFor="language">Language (BCP-47)</Label>
                <Input id="language" name="language" placeholder="en-US" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select name="infoCategory" defaultValue="Met">
                    <SelectTrigger aria-label="Category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Geo">Geo</SelectItem>
                      <SelectItem value="Met">Met</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Rescue">Rescue</SelectItem>
                      <SelectItem value="Fire">Fire</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Env">Env</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Infra">Infra</SelectItem>
                      <SelectItem value="CBRNE">CBRNE</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Urgency</Label>
                  <Select name="urgency" defaultValue="Immediate">
                    <SelectTrigger aria-label="Urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="Expected">Expected</SelectItem>
                      <SelectItem value="Future">Future</SelectItem>
                      <SelectItem value="Past">Past</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Severity</Label>
                  <Select name="severity" defaultValue="Severe">
                    <SelectTrigger aria-label="Severity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Extreme">Extreme</SelectItem>
                      <SelectItem value="Severe">Severe</SelectItem>
                      <SelectItem value="Moderate">Moderate</SelectItem>
                      <SelectItem value="Minor">Minor</SelectItem>
                      <SelectItem value="Unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Certainty</Label>
                <Select name="certainty" defaultValue="Likely">
                  <SelectTrigger aria-label="Certainty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Observed">Observed</SelectItem>
                    <SelectItem value="Likely">Likely</SelectItem>
                    <SelectItem value="Possible">Possible</SelectItem>
                    <SelectItem value="Unlikely">Unlikely</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="event">Event</Label>
                <Input id="event" name="event" required aria-required="true" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="headline">Headline</Label>
                <Input id="headline" name="headline" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" rows={4} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instruction">Instruction</Label>
                <Textarea id="instruction" name="instruction" rows={3} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="web">Web (URI)</Label>
                <Input id="web" name="web" type="url" />
              </div>
            </fieldset>

            <div className="flex justify-end">
              <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit CAP"}</Button>
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
