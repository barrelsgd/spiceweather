import { NextResponse } from "next/server";
import { z } from "zod";

const CAPDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[\-\+]\d{2}:\d{2}$/);

const CAPKeyValue = z.object({ valueName: z.string(), value: z.string() });

const CAPArea = z
  .object({
    areaDesc: z.string(),
    polygon: z
      .array(
        z.string().regex(
          /^-?\d{1,2}(?:\.\d+)?,\s*-?\d{1,3}(?:\.\d+)?(?:\s+-?\d{1,2}(?:\.\d+)?,\s*-?\d{1,3}(?:\.\d+)?)+$/
        )
      )
      .optional(),
    circle: z
      .array(z.string().regex(/^-?\d{1,2}(?:\.\d+)?,\s*-?\d{1,3}(?:\.\d+)?\s+\d+(?:\.\d+)?$/))
      .optional(),
    geocode: z.array(CAPKeyValue).optional(),
    altitude: z.number().optional(),
    ceiling: z.number().optional(),
  })
  .superRefine((obj, ctx) => {
    if (obj.ceiling !== undefined && obj.altitude === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "altitude is required when ceiling is provided", path: ["altitude"] });
    }
  });

const CAPResource = z.object({
  resourceDesc: z.string(),
  mimeType: z.string(),
  size: z.number().int().nonnegative().optional(),
  uri: z.string().url().optional(),
  derefUri: z.string().optional(),
  digest: z.string().regex(/^[A-Fa-f0-9]{40}$/).optional(),
});

const CAPInfo = z.object({
  language: z.string().optional(),
  category: z.array(z.enum([
    "Geo",
    "Met",
    "Safety",
    "Security",
    "Rescue",
    "Fire",
    "Health",
    "Env",
    "Transport",
    "Infra",
    "CBRNE",
    "Other",
  ])).min(1),
  event: z.string(),
  responseType: z.array(
    z.enum(["Shelter","Evacuate","Prepare","Execute","Avoid","Monitor","Assess","AllClear","None"])
  ).optional(),
  urgency: z.enum(["Immediate","Expected","Future","Past","Unknown"]),
  severity: z.enum(["Extreme","Severe","Moderate","Minor","Unknown"]),
  certainty: z.enum(["Observed","Likely","Possible","Unlikely","Unknown"]),
  audience: z.string().optional(),
  eventCode: z.array(CAPKeyValue).optional(),
  effective: CAPDateTime.optional(),
  onset: CAPDateTime.optional(),
  expires: CAPDateTime.optional(),
  senderName: z.string().optional(),
  headline: z.string().optional(),
  description: z.string().optional(),
  instruction: z.string().optional(),
  web: z.string().url().optional(),
  contact: z.string().optional(),
  parameter: z.array(CAPKeyValue).optional(),
  resource: z.array(CAPResource).optional(),
  area: z.array(CAPArea).optional(),
});

const CAPAlert = z
  .object({
    identifier: z.string(),
    sender: z.string(),
    sent: CAPDateTime,
    status: z.enum(["Actual","Exercise","System","Test","Draft"]),
    msgType: z.enum(["Alert","Update","Cancel","Ack","Error"]),
    source: z.string().optional(),
    scope: z.enum(["Public","Restricted","Private"]),
    restriction: z.string().optional(),
    addresses: z.array(z.string()).optional(),
    code: z.array(z.string()).optional(),
    note: z.string().optional(),
    references: z.array(z.string()).optional(),
    incidents: z.array(z.string()).optional(),
    info: z.array(CAPInfo).min(1).optional(),
    xmlSignature: z.object({}).catchall(z.unknown()).optional(),
  })
  .superRefine((obj, ctx) => {
    if (obj.scope === "Restricted" && !obj.restriction) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "restriction is required when scope is Restricted", path: ["restriction"] });
    }
    if (obj.scope === "Private" && (!obj.addresses || obj.addresses.length === 0)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "addresses is required when scope is Private", path: ["addresses"] });
    }
  });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = CAPAlert.parse(json);

    return NextResponse.json({ id: `cap_${Date.now()}`, receivedAt: new Date().toISOString(), data }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
