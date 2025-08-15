import { NextResponse } from "next/server";
import { z } from "zod";

// Core shared primitives
const TimeInstant = z.string().datetime();

// Organization
const Organization = z.object({
  name: z.string(),
  unit: z.string().optional(),
  contact: z.string().optional(),
  web: z.string().url().optional(),
  country: z.string().optional(),
});

// Hazard
const Threshold = z.object({
  name: z.string().optional(),
  metric: z.string().optional(),
  value: z.number().optional(),
  duration: z.string().optional(),
  spatialQualifier: z.string().optional(),
  temporalQualifier: z.string().optional(),
});

const DataSource = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  uri: z.string().url().optional(),
  version: z.string().optional(),
});

const HazardSpec = z.object({
  type: z.string(),
  description: z.string(),
  leadTime: z.string(), // ISO 8601 duration
  forecastWindow: z
    .object({ start: TimeInstant, end: TimeInstant })
    .partial()
    .optional(),
  method: z.enum(["Deterministic", "Probabilistic", "Ensemble"]).optional(),
  meteorologicalSummary: z.string().optional(),
  thresholdsUsed: z.array(Threshold).optional(),
  dataSources: z.array(DataSource).optional(),
});

// Risk
const RiskAssessment = z.object({
  likelihood: z.enum(["VeryLow", "Low", "Medium", "High"]),
  impactLevel: z.enum(["VeryLow", "Low", "Medium", "High"]),
  riskLevel: z.enum(["Green", "Yellow", "Orange", "Red"]),
  matrixRationale: z.string().optional(),
});

// GeoJSON geometries (subset)
const GeoJSONPoint = z.object({
  type: z.literal("Point"),
  coordinates: z.array(z.number()).min(2).max(3),
});

const GeoJSONPolygon = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(z.array(z.number()).min(2).max(3))).min(1),
});

const GeoJSONMultiPolygon = z.object({
  type: z.literal("MultiPolygon"),
  coordinates: z.array(z.array(z.array(z.array(z.number()).min(2).max(3))))
});

const GeoJSONGeometry = z.union([GeoJSONPoint, GeoJSONPolygon, GeoJSONMultiPolygon]);

// Areas and impacts
const AreaTarget = z.object({
  areaName: z.string(),
  adminCodes: z.array(z.string()).optional(),
  populationEstimate: z.number().int().nonnegative().optional(),
  geometry: GeoJSONGeometry,
  geocodes: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
});

const Effect = z.object({
  type: z.string().optional(),
  severity: z.enum(["Minor", "Moderate", "Major", "Severe"]).optional(),
  probability: z.number().min(0).max(1).optional(),
});

const ImpactStatement = z.object({
  headline: z.string(),
  audience: z.array(z.string()),
  sectors: z.array(z.string()).optional(),
  details: z.string().optional(),
  confidenceNote: z.string().optional(),
  expectedEffects: z.array(Effect).optional(),
});

// Root product
const IBFProduct = z.object({
  id: z.string(),
  issued: TimeInstant,
  validFrom: TimeInstant.optional(),
  validTo: TimeInstant.optional(),
  issuer: Organization,
  status: z.enum(["Draft", "Operational", "Exercise", "Test", "Cancelled"]).optional(),
  language: z.string().optional(),
  hazard: HazardSpec,
  exposureModel: z
    .object({ datasets: z.array(DataSource).optional(), timeSlice: TimeInstant.optional(), notes: z.string().optional() })
    .optional(),
  vulnerabilityModel: z
    .object({ datasets: z.array(DataSource).optional(), version: z.string().optional(), notes: z.string().optional() })
    .optional(),
  riskAssessment: RiskAssessment,
  areas: z.array(AreaTarget).min(1),
  impacts: z.array(ImpactStatement).min(1),
  actions: z
    .array(
      z.object({
        action: z.string(),
        audience: z.string(),
        urgency: z.enum(["Immediate", "Soon", "Prepare", "Monitor"]).optional(),
        sourceAgency: Organization.optional(),
      })
    )
    .optional(),
  confidence: z
    .object({ summary: z.string().optional(), ensembleSupport: z.number().min(0).max(1).optional(), keyUncertainties: z.array(z.string()).optional() })
    .optional(),
  partners: z.array(z.object({ organization: Organization, role: z.string(), mouRef: z.string().optional() })).optional(),
  dissemination: z
    .object({
      channels: z.array(z.enum(["CAP", "Web", "Email", "SMS", "Broadcast", "Social", "GIS"]).optional()).optional(),
      capFeed: z.object({ endpoint: z.string().url().optional(), alertIds: z.array(z.string()).optional() }).optional(),
      gisLayers: z.array(z.object({ name: z.string().optional(), uri: z.string().url().optional(), format: z.enum(["GeoJSON", "WMS", "WFS", "KML"]).optional() })).optional(),
    })
    .optional(),
  monitoring: z
    .object({ observationChannels: z.array(z.string()).optional(), metrics: z.array(z.string()).optional() })
    .optional(),
  validation: z
    .object({
      eventId: z.string().optional(),
      observedImpacts: z.string().optional(),
      evaluationNotes: z.string().optional(),
      stakeholderFeedback: z.string().optional(),
      improvementActions: z.string().optional(),
      meetingsHeld: z.boolean().optional(),
    })
    .optional(),
  governance: z.object({ sopRef: z.string().optional(), changeManagement: z.string().optional() }).optional(),
  capReferences: z.array(z.string()).optional(),
  attachments: z.array(z.object({ description: z.string().optional(), mimeType: z.string().optional(), uri: z.string().url().optional() })).optional(),
  notes: z.string().optional(),
  version: z.string().optional(),
  parameters: z.array(z.object({ key: z.string(), value: z.string() })).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = IBFProduct.parse(json);

    return NextResponse.json({ id: `ibf_${Date.now()}`, receivedAt: new Date().toISOString(), data }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
