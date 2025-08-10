export const MetarSpeci = {
  openapi: '3.1.0',
  info: {
    title: 'IWXXM METAR/SPECI JSON mapping (2025-2 RC1)',
    version: '1.0.0',
    description:
      'OpenAPI component schemas that map IWXXM 2025-2 METAR/SPECI XSD elements to JSON. Preserves units (UCUM), GML time semantics, CAVOK rules, nilReason handling, codelists, and measurement operators.',
  },
  paths: {},
  components: {
    schemas: {
      IWXXM_METAR: {
        type: 'object',
        description: 'METAR report (routine).',
        allOf: [
          {
            $ref: '#/components/schemas/MeteorologicalAerodromeObservationReport',
          },
          {
            type: 'object',
            properties: {
              reportType: { const: 'METAR' },
              extension: {
                type: 'array',
                items: { $ref: '#/components/schemas/Extension' },
              },
            },
            required: ['reportType'],
          },
        ],
      },

      IWXXM_SPECI: {
        type: 'object',
        description: 'SPECI report (non-routine).',
        allOf: [
          {
            $ref: '#/components/schemas/MeteorologicalAerodromeObservationReport',
          },
          {
            type: 'object',
            properties: {
              reportType: { const: 'SPECI' },
              extension: {
                type: 'array',
                items: { $ref: '#/components/schemas/Extension' },
              },
            },
            required: ['reportType'],
          },
        ],
      },

      MeteorologicalAerodromeObservationReport: {
        type: 'object',
        description: 'Superclass for METAR and SPECI.',
        properties: {
          issueTime: { $ref: '#/components/schemas/TimeInstant' },
          aerodrome: { $ref: '#/components/schemas/AirportHeliport' },
          observationTime: { $ref: '#/components/schemas/TimeInstant' },
          observation: {
            $ref: '#/components/schemas/MeteorologicalAerodromeObservation',
          },
          trendForecast: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/MeteorologicalAerodromeTrendForecast',
            },
          },
          automatedStation: { type: 'boolean' },
        },
        required: ['issueTime', 'aerodrome', 'observationTime'],
      },

      MeteorologicalAerodromeTrendForecast: {
        type: 'object',
        description: 'Trend forecast segment within METAR/SPECI.',
        properties: {
          phenomenonTime: { $ref: '#/components/schemas/TimeOrPeriod' },
          timeIndicator: {
            $ref: '#/components/schemas/TrendForecastTimeIndicatorType',
          },
          prevailingVisibility: { $ref: '#/components/schemas/Length_m' },
          prevailingVisibilityOperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          surfaceWind: { $ref: '#/components/schemas/AerodromeSurfaceWind' },
          weather: {
            type: 'array',
            maxItems: 3,
            items: { $ref: '#/components/schemas/PresentOrForecastWeather' },
          },
          cloud: { $ref: '#/components/schemas/AerodromeCloud' },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
          changeIndicator: {
            $ref: '#/components/schemas/ForecastChangeIndicatorType',
          },
          cloudAndVisibilityOK: {
            type: 'boolean',
            description: 'CAVOK semantics for forecast.',
          },
        },
        required: ['changeIndicator'],
        allOf: [
          {
            if: { properties: { cloudAndVisibilityOK: { const: true } } },
            then: {
              not: {
                anyOf: [
                  { required: ['prevailingVisibility'] },
                  { required: ['weather'] },
                  { required: ['cloud'] },
                ],
              },
            },
          },
        ],
      },

      MeteorologicalAerodromeObservation: {
        type: 'object',
        description: 'Observed conditions at an aerodrome.',
        properties: {
          airTemperature: { $ref: '#/components/schemas/Measure_Celsius' },
          dewpointTemperature: { $ref: '#/components/schemas/Measure_Celsius' },
          qnh: { $ref: '#/components/schemas/Pressure_hPa' },
          surfaceWind: {
            $ref: '#/components/schemas/AerodromeSurfaceWindWithNil',
          },
          visibility: {
            $ref: '#/components/schemas/AerodromeHorizontalVisibilityWithNil',
          },
          rvr: {
            type: 'array',
            maxItems: 4,
            items: {
              $ref: '#/components/schemas/AerodromeRunwayVisualRangeWithNil',
            },
          },
          presentWeather: {
            type: 'array',
            maxItems: 3,
            items: { $ref: '#/components/schemas/PresentOrForecastWeather' },
          },
          cloud: { $ref: '#/components/schemas/AerodromeCloudWithNil' },
          recentWeather: {
            type: 'array',
            maxItems: 3,
            items: { $ref: '#/components/schemas/AerodromeRecentWeather' },
          },
          windShear: { $ref: '#/components/schemas/AerodromeWindShearWithNil' },
          seaCondition: {
            $ref: '#/components/schemas/AerodromeSeaConditionWithNil',
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
          cloudAndVisibilityOK: {
            type: 'boolean',
            description: 'CAVOK semantics for observation.',
          },
        },
        required: ['cloudAndVisibilityOK'],
        allOf: [
          {
            if: { properties: { cloudAndVisibilityOK: { const: true } } },
            then: {
              not: {
                anyOf: [
                  { required: ['visibility'] },
                  { required: ['rvr'] },
                  { required: ['presentWeather'] },
                  { required: ['cloud'] },
                ],
              },
            },
          },
        ],
      },

      AerodromeSurfaceWindWithNil: {
        allOf: [
          { $ref: '#/components/schemas/AerodromeSurfaceWind' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },
      AerodromeHorizontalVisibilityWithNil: {
        allOf: [
          { $ref: '#/components/schemas/AerodromeHorizontalVisibility' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },
      AerodromeRunwayVisualRangeWithNil: {
        allOf: [
          { $ref: '#/components/schemas/AerodromeRunwayVisualRange' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },
      AerodromeSeaConditionWithNil: {
        allOf: [
          { $ref: '#/components/schemas/AerodromeSeaCondition' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },
      AerodromeWindShearWithNil: {
        allOf: [
          { $ref: '#/components/schemas/AerodromeWindShear' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },
      AerodromeCloudWithNil: {
        allOf: [
          { $ref: '#/components/schemas/AerodromeCloud' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },

      AerodromeSurfaceWind: {
        type: 'object',
        properties: {
          meanWindDirection: { $ref: '#/components/schemas/Angle_deg' },
          meanWindSpeed: { $ref: '#/components/schemas/Velocity_ms_or_kt' },
          meanWindSpeedOperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          windGustSpeed: { $ref: '#/components/schemas/Velocity_ms_or_kt' },
          windGustSpeedOperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          extremeClockwiseWindDirection: {
            $ref: '#/components/schemas/Angle_deg',
          },
          extremeCounterClockwiseWindDirection: {
            $ref: '#/components/schemas/Angle_deg',
          },
          variableWindDirection: { type: 'boolean' },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      AerodromeHorizontalVisibility: {
        type: 'object',
        properties: {
          prevailingVisibility: { $ref: '#/components/schemas/Distance_m' },
          prevailingVisibilityOperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          minimumVisibility: { $ref: '#/components/schemas/Distance_m' },
          minimumVisibilityDirection: {
            $ref: '#/components/schemas/Angle_deg',
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      AerodromeRunwayVisualRange: {
        type: 'object',
        properties: {
          runway: { $ref: '#/components/schemas/RunwayDirection' },
          meanRVR: { $ref: '#/components/schemas/Distance_m' },
          meanRVROperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          pastTendency: {
            $ref: '#/components/schemas/VisualRangeTendencyType',
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      AerodromeSeaCondition: {
        type: 'object',
        properties: {
          seaSurfaceTemperature: {
            $ref: '#/components/schemas/Measure_Celsius',
          },
          significantWaveHeight: { $ref: '#/components/schemas/Distance_m' },
          seaState: { $ref: '#/components/schemas/SeaSurfaceStateCode' },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      AerodromeWindShear: {
        type: 'object',
        properties: {
          runway: {
            type: 'array',
            items: { $ref: '#/components/schemas/RunwayDirection' },
          },
          allRunways: { type: 'boolean' },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      AerodromeCloud: {
        type: 'object',
        properties: {
          verticalVisibility: { $ref: '#/components/schemas/Length_m_or_ft' },
          layer: {
            type: 'array',
            maxItems: 4,
            items: { $ref: '#/components/schemas/CloudLayerWithNil' },
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      CloudLayerWithNil: {
        allOf: [
          { $ref: '#/components/schemas/CloudLayer' },
          { $ref: '#/components/schemas/WithNilReason' },
        ],
      },
      CloudLayer: {
        type: 'object',
        description:
          'Cloud layer summary compatible with IWXXM CloudLayerPropertyType.',
        properties: {
          amount: { $ref: '#/components/schemas/CloudAmountCode' },
          base: { $ref: '#/components/schemas/Length_m_or_ft' },
          cloudType: { $ref: '#/components/schemas/CloudTypeCode' },
        },
      },

      AirportHeliport: {
        type: 'object',
        properties: {
          icaoCode: { type: 'string', minLength: 3, maxLength: 4 },
          name: { type: 'string' },
          wmoStationId: { type: 'string' },
          position: { $ref: '#/components/schemas/GeoPoint' },
          elevation: { $ref: '#/components/schemas/Length_m_or_ft' },
        },
      },

      RunwayDirection: {
        type: 'object',
        properties: {
          designator: { type: 'string', description: 'e.g., 18, 36L, 04R' },
        },
        required: ['designator'],
      },

      PresentOrForecastWeather: {
        type: 'object',
        description:
          'CodeList reference to http://codes.wmo.int/49-2/AerodromePresentOrForecastWeather',
        properties: {
          code: { type: 'string' },
          uri: { type: 'string', format: 'uri' },
          name: { type: 'string' },
        },
        required: ['code'],
      },

      AerodromeRecentWeather: {
        type: 'object',
        description:
          'CodeList reference to http://codes.wmo.int/49-2/AerodromeRecentWeather',
        properties: {
          code: { type: 'string' },
          uri: { type: 'string', format: 'uri' },
          name: { type: 'string' },
        },
        required: ['code'],
      },

      SeaSurfaceStateCode: {
        type: 'object',
        description: 'CodeList reference (WMO 3700 / BUFR 0 22 061).',
        properties: {
          code: { type: 'string' },
          uri: { type: 'string', format: 'uri' },
          name: { type: 'string' },
        },
        required: ['code'],
      },

      ForecastChangeIndicatorType: {
        type: 'string',
        enum: ['BECOMING', 'TEMPORARY_FLUCTUATIONS'],
      },

      VisualRangeTendencyType: {
        type: 'string',
        enum: ['UPWARD', 'NO_CHANGE', 'DOWNWARD', 'MISSING_VALUE'],
      },

      TrendForecastTimeIndicatorType: {
        type: 'string',
        enum: ['AT', 'UNTIL', 'FROM', 'FROM_UNTIL'],
      },

      RelationalOperatorType: {
        type: 'string',
        enum: ['above', 'below'],
      },

      CloudAmountCode: {
        type: 'string',
        enum: ['FEW', 'SCT', 'BKN', 'OVC'],
      },

      CloudTypeCode: {
        type: 'string',
        description: 'Subset of WMO cloud genera used operationally.',
        enum: ['CB', 'TCU', 'NSC', 'NCD', '///'],
      },

      TimeInstant: {
        type: 'string',
        format: 'date-time',
      },
      TimeOrPeriod: {
        oneOf: [
          { $ref: '#/components/schemas/TimeInstant' },
          {
            type: 'object',
            required: ['start', 'end'],
            properties: {
              start: { $ref: '#/components/schemas/TimeInstant' },
              end: { $ref: '#/components/schemas/TimeInstant' },
            },
          },
        ],
      },

      WithNilReason: {
        type: 'object',
        properties: {
          nilReason: {
            type: 'string',
            description: 'GML NilReason. Allowed tokens or URI.',
            pattern:
              '^(inapplicable|missing|template|unknown|withheld|NothingOfOperationalSignificance|NotDetectedByAutoSystem|notObservable|noSignificantChange|other:.+|https?://.+)$',
          },
        },
      },

      QuantityWithUnit: {
        type: 'object',
        properties: {
          value: { type: 'number' },
          uom: { type: 'string' },
        },
        required: ['value', 'uom'],
      },
      QuantityWithUnitOrNil: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnit' },
          {
            type: 'object',
            properties: {
              nilReason: {
                $ref: '#/components/schemas/WithNilReason/properties/nilReason',
              },
            },
          },
        ],
      },

      Measure_Celsius: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['Cel'] } } },
        ],
      },
      Pressure_hPa: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['hPa'] } } },
        ],
      },
      Distance_m: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['m'] } } },
        ],
      },
      Length_m: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['m'] } } },
        ],
      },
      Length_m_or_ft: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['m', '[ft_i]'] } } },
        ],
      },
      Velocity_ms_or_kt: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['m/s', '[kn_i]'] } } },
        ],
      },
      Angle_deg: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnitOrNil' },
          { type: 'object', properties: { uom: { enum: ['deg'] } } },
        ],
      },

      GeoPoint: {
        type: 'object',
        properties: {
          lat: { type: 'number', minimum: -90, maximum: 90 },
          lon: { type: 'number', minimum: -180, maximum: 180 },
          alt: { type: 'number' },
        },
        required: ['lat', 'lon'],
      },

      Extension: {
        type: 'object',
        additionalProperties: true,
      },
    },
  },
};
