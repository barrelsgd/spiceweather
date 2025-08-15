import { NextResponse } from "next/server";
import { z } from "zod";

// Quantity with Unit helpers
const QuantityWithUnit = z.object({ value: z.number(), uom: z.string() });
const TimeInstant = z.string().datetime();
const TimePeriod = z.object({ start: TimeInstant, end: TimeInstant });

const Angle_deg = QuantityWithUnit.extend({ uom: z.literal("deg") });
const Distance_m = QuantityWithUnit.extend({ uom: z.literal("m") });
const Length_m_or_ft = QuantityWithUnit.extend({ uom: z.union([z.literal("m"), z.literal("[ft_i]")]) });
const Velocity_ms_or_kt = QuantityWithUnit.extend({ uom: z.union([z.literal("m/s"), z.literal("[kn_i]")]) });

const AerodromeSurfaceWindForecast = z.object({
  meanWindDirection: Angle_deg.optional(),
  meanWindSpeed: Velocity_ms_or_kt.optional(),
  meanWindSpeedOperator: z.enum(["above", "below"]).optional(),
  windGustSpeed: Velocity_ms_or_kt.optional(),
  windGustSpeedOperator: z.enum(["above", "below"]).optional(),
  variableWindDirection: z.boolean().optional(),
  extremeClockwiseWindDirection: Angle_deg.optional(),
  extremeCounterClockwiseWindDirection: Angle_deg.optional(),
});

const PresentOrForecastWeather = z.object({
  code: z.string(),
  uri: z.string().url().optional(),
  name: z.string().optional(),
});

const CloudLayer = z.object({
  amount: z.enum(["FEW", "SCT", "BKN", "OVC"]).optional(),
  base: Length_m_or_ft.optional(),
  cloudType: z.enum(["CB", "TCU", "NSC", "NCD", "///"]).optional(),
});

const AerodromeCloudForecast = z.object({
  verticalVisibility: Length_m_or_ft.optional(),
  layer: z.array(CloudLayer).max(4).optional(),
});

const AirportHeliport = z.object({
  icaoCode: z.string().min(3).max(4),
  name: z.string().optional(),
  wmoStationId: z.string().optional(),
  position: z
    .object({
      lat: z.number().min(-90).max(90),
      lon: z.number().min(-180).max(180),
      alt: z.number().optional(),
    })
    .optional(),
  elevation: Length_m_or_ft.optional(),
});

const CAVOK_Constraint_Base = z.object({ cloudAndVisibilityOK: z.boolean().optional() });

const MeteorologicalAerodromeForecast_Base = z
  .object({
    phenomenonTime: TimePeriod,
    prevailingVisibility: Distance_m.optional(),
    prevailingVisibilityOperator: z.enum(["above", "below"]).optional(),
    surfaceWind: AerodromeSurfaceWindForecast.optional(),
    weather: z.array(PresentOrForecastWeather).max(3).optional(),
    cloud: AerodromeCloudForecast.optional(),
    temperature: z
      .array(
        z.object({
          maximumAirTemperature: QuantityWithUnit.extend({ uom: z.literal("Cel") }),
          maximumAirTemperatureTime: TimeInstant,
          minimumAirTemperature: QuantityWithUnit.extend({ uom: z.literal("Cel") }),
          minimumAirTemperatureTime: TimeInstant,
          extension: z.array(z.object({}).catchall(z.unknown())).optional(),
        })
      )
      .max(2)
      .optional(),
  })
  .merge(CAVOK_Constraint_Base)
  .superRefine((obj, ctx) => {
    if (obj.cloudAndVisibilityOK === true) {
      if (obj.prevailingVisibility !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "When CAVOK is true, prevailingVisibility must be omitted.",
          path: ["prevailingVisibility"],
        });
      }
      if (obj.weather !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "When CAVOK is true, weather must be omitted.",
          path: ["weather"],
        });
      }
      if (obj.cloud !== undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "When CAVOK is true, cloud must be omitted.",
          path: ["cloud"],
        });
      }
    }
  });

const MeteorologicalAerodromeForecast_Change = z
  .object({
    phenomenonTime: z.union([TimePeriod, TimeInstant]),
    prevailingVisibility: Distance_m.optional(),
    prevailingVisibilityOperator: z.enum(["above", "below"]).optional(),
    surfaceWind: AerodromeSurfaceWindForecast.optional(),
    weather: z.array(PresentOrForecastWeather).max(3).optional(),
    cloud: AerodromeCloudForecast.optional(),
    cloudAndVisibilityOK: z.boolean().optional(),
    changeIndicator: z.enum([
      "BECOMING",
      "TEMPORARY_FLUCTUATIONS",
      "FROM",
      "PROBABILITY_30",
      "PROBABILITY_30_TEMPORARY_FLUCTUATIONS",
      "PROBABILITY_40",
      "PROBABILITY_40_TEMPORARY_FLUCTUATIONS",
    ]),
  })
  .superRefine((obj, ctx) => {
    if (obj.cloudAndVisibilityOK === true) {
      if (obj.prevailingVisibility !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "When CAVOK is true, prevailingVisibility must be omitted.", path: ["prevailingVisibility"] });
      }
      if (obj.weather !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "When CAVOK is true, weather must be omitted.", path: ["weather"] });
      }
      if (obj.cloud !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "When CAVOK is true, cloud must be omitted.", path: ["cloud"] });
      }
    }
  });

const IWXXM_TAF = z
  .object({
    issueTime: TimeInstant,
    aerodrome: AirportHeliport,
    validPeriod: TimePeriod.optional(),
    cancelledReportValidPeriod: TimePeriod.optional(),
    baseForecast: MeteorologicalAerodromeForecast_Base.optional(),
    changeForecast: z.array(MeteorologicalAerodromeForecast_Change).max(5).optional(),
    extension: z.array(z.object({}).catchall(z.unknown())).optional(),
    isCancelReport: z.boolean().optional(),
  })
  .superRefine((obj, ctx) => {
    const isCancel = obj.isCancelReport === true;
    if (isCancel) {
      if (!obj.cancelledReportValidPeriod) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "cancelledReportValidPeriod is required when isCancelReport is true.", path: ["cancelledReportValidPeriod"] });
      }
      if (obj.baseForecast !== undefined || obj.changeForecast !== undefined) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "baseForecast/changeForecast must be omitted for cancellation reports.", path: ["baseForecast"] });
      }
    } else {
      if (!obj.validPeriod) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "validPeriod is required when isCancelReport is false or omitted.", path: ["validPeriod"] });
      }
      if (!obj.baseForecast) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "baseForecast is required when isCancelReport is false or omitted.", path: ["baseForecast"] });
      }
    }
  });

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = IWXXM_TAF.parse(json);

    return NextResponse.json(
      {
        id: `taf_${Date.now()}`,
        receivedAt: new Date().toISOString(),
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
