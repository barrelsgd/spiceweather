import { NextResponse } from "next/server";
import { z } from "zod";

// Common primitives
const TimeInstant = z.string().datetime();

const QuantityWithUnit = z.object({ value: z.number(), uom: z.string() });
const QuantityWithUnitOrNil = QuantityWithUnit.extend({ nilReason: z.string().optional() });

const Angle_deg = QuantityWithUnitOrNil.extend({ uom: z.literal("deg") });
const Velocity_ms_or_kt = QuantityWithUnitOrNil.extend({ uom: z.enum(["m/s", "[kn_i]"]) });
const Distance_m = QuantityWithUnitOrNil.extend({ uom: z.literal("m") });
const Length_m = QuantityWithUnitOrNil.extend({ uom: z.literal("m") });
const Length_m_or_ft = QuantityWithUnitOrNil.extend({ uom: z.enum(["m", "[ft_i]"]) });
const Measure_Celsius = QuantityWithUnitOrNil.extend({ uom: z.literal("Cel") });
const Pressure_hPa = QuantityWithUnitOrNil.extend({ uom: z.literal("hPa") });

const CloudAmountCode = z.enum(["FEW", "SCT", "BKN", "OVC"]);
const CloudTypeCode = z.enum(["CB", "TCU", "NSC", "NCD", "///"]);

const PresentOrForecastWeather = z.object({ code: z.string(), uri: z.string().url().optional(), name: z.string().optional() });

const CloudLayer = z.object({ amount: CloudAmountCode.optional(), base: Length_m_or_ft.optional(), cloudType: CloudTypeCode.optional() });
const CloudLayerWithNil = CloudLayer.extend({ nilReason: z.string().optional() });

const AerodromeCloud = z.object({ verticalVisibility: Length_m_or_ft.optional(), layer: z.array(CloudLayerWithNil).max(4).optional() });
const AerodromeCloudWithNil = AerodromeCloud.extend({ nilReason: z.string().optional() });

const AerodromeSurfaceWind = z.object({
  meanWindDirection: Angle_deg.optional(),
  meanWindSpeed: Velocity_ms_or_kt.optional(),
  windGustSpeed: Velocity_ms_or_kt.optional(),
  extremeClockwiseWindDirection: Angle_deg.optional(),
  extremeCounterClockwiseWindDirection: Angle_deg.optional(),
  variableWindDirection: z.boolean().optional(),
});
const AerodromeSurfaceWindWithNil = AerodromeSurfaceWind.extend({ nilReason: z.string().optional() });

const AerodromeHorizontalVisibility = z.object({
  prevailingVisibility: Distance_m.optional(),
  prevailingVisibilityOperator: z.enum(["above", "below"]).optional(),
  minimumVisibility: Distance_m.optional(),
  minimumVisibilityDirection: Angle_deg.optional(),
});
const AerodromeHorizontalVisibilityWithNil = AerodromeHorizontalVisibility.extend({ nilReason: z.string().optional() });

const RunwayDirection = z.object({ designator: z.string() });

const AerodromeRunwayVisualRange = z.object({
  runway: RunwayDirection.optional(),
  meanRVR: Distance_m.optional(),
  meanRVROperator: z.enum(["above", "below"]).optional(),
  pastTendency: z.enum(["UPWARD", "NO_CHANGE", "DOWNWARD", "MISSING_VALUE"]).optional(),
});
const AerodromeRunwayVisualRangeWithNil = AerodromeRunwayVisualRange.extend({ nilReason: z.string().optional() });

const AerodromeRecentWeather = z.object({ code: z.string() });

const AirportHeliport = z.object({
  icaoCode: z.string().min(3).max(4),
  name: z.string().optional(),
  wmoStationId: z.string().optional(),
  position: z.object({ lat: z.number(), lon: z.number(), alt: z.number().optional() }).optional(),
  elevation: Length_m_or_ft.optional(),
});

const MeteorologicalAerodromeObservation = z
  .object({
    airTemperature: Measure_Celsius.optional(),
    dewpointTemperature: Measure_Celsius.optional(),
    qnh: Pressure_hPa.optional(),
    surfaceWind: AerodromeSurfaceWindWithNil.optional(),
    visibility: AerodromeHorizontalVisibilityWithNil.optional(),
    rvr: z.array(AerodromeRunwayVisualRangeWithNil).max(4).optional(),
    presentWeather: z.array(PresentOrForecastWeather).max(3).optional(),
    cloud: AerodromeCloudWithNil.optional(),
    recentWeather: z.array(AerodromeRecentWeather).max(3).optional(),
    windShear: z
      .object({ runway: z.array(RunwayDirection).optional(), allRunways: z.boolean().optional() })
      .extend({ nilReason: z.string().optional() })
      .optional(),
    seaCondition: z
      .object({
        seaSurfaceTemperature: Measure_Celsius.optional(),
        significantWaveHeight: Distance_m.optional(),
        seaState: z.object({ code: z.string(), uri: z.string().url().optional(), name: z.string().optional() }).optional(),
      })
      .extend({ nilReason: z.string().optional() })
      .optional(),
    extension: z.array(z.object({}).catchall(z.unknown())).optional(),
    cloudAndVisibilityOK: z.boolean(),
  })
  .superRefine((obj, ctx) => {
    if (obj.cloudAndVisibilityOK) {
      if (obj.visibility !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "visibility must be omitted when CAVOK is true", path: ["visibility"] });
      if (obj.rvr !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "rvr must be omitted when CAVOK is true", path: ["rvr"] });
      if (obj.presentWeather !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "presentWeather must be omitted when CAVOK is true", path: ["presentWeather"] });
      if (obj.cloud !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "cloud must be omitted when CAVOK is true", path: ["cloud"] });
    }
  });

const MeteorologicalAerodromeTrendForecast = z.object({
  phenomenonTime: z.union([TimeInstant, z.object({ start: TimeInstant, end: TimeInstant })]).optional(),
  timeIndicator: z.enum(["AT", "UNTIL", "FROM", "FROM_UNTIL"]).optional(),
  prevailingVisibility: Distance_m.optional(),
  prevailingVisibilityOperator: z.enum(["above", "below"]).optional(),
  surfaceWind: AerodromeSurfaceWind.optional(),
  weather: z.array(PresentOrForecastWeather).max(3).optional(),
  cloud: AerodromeCloud.optional(),
  extension: z.array(z.object({}).catchall(z.unknown())).optional(),
  changeIndicator: z.enum(["BECOMING", "TEMPORARY_FLUCTUATIONS"]).optional(),
  cloudAndVisibilityOK: z.boolean().optional(),
}).superRefine((obj, ctx) => {
  if (obj.cloudAndVisibilityOK) {
    if (obj.prevailingVisibility !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "prevailingVisibility must be omitted when CAVOK is true", path: ["prevailingVisibility"] });
    if (obj.weather !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "weather must be omitted when CAVOK is true", path: ["weather"] });
    if (obj.cloud !== undefined) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "cloud must be omitted when CAVOK is true", path: ["cloud"] });
  }
});

const MeteorologicalAerodromeObservationReport = z.object({
  issueTime: TimeInstant,
  aerodrome: AirportHeliport,
  observationTime: TimeInstant,
  observation: MeteorologicalAerodromeObservation.optional(),
  trendForecast: z.array(MeteorologicalAerodromeTrendForecast).optional(),
  automatedStation: z.boolean().optional(),
});

const IWXXM_METAR = MeteorologicalAerodromeObservationReport.and(
  z.object({ reportType: z.literal("METAR"), extension: z.array(z.object({}).catchall(z.unknown())).optional() })
);
const IWXXM_SPECI = MeteorologicalAerodromeObservationReport.and(
  z.object({ reportType: z.literal("SPECI"), extension: z.array(z.object({}).catchall(z.unknown())).optional() })
);

const IWXXM_METAR_OR_SPECI = z.union([IWXXM_METAR, IWXXM_SPECI]);

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = IWXXM_METAR_OR_SPECI.parse(json);

    return NextResponse.json({ id: `${data.reportType.toLowerCase()}_${Date.now()}`, receivedAt: new Date().toISOString(), data }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", issues: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
