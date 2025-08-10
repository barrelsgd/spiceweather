export const TAF = {
  openapi: '3.1.0',
  info: {
    title: 'IWXXM TAF JSON mapping (2025-2 v3.0.1)',
    version: '1.0.0',
    description:
      'OpenAPI component schemas mapping IWXXM TAF XSD to JSON. Preserves GML time semantics, CAVOK, UCUM units, nilReason, code lists, and TAF-specific change indicators including PROB30/40 and TEMPO combinations.',
  },
  paths: {},
  components: {
    schemas: {
      IWXXM_TAF: {
        type: 'object',
        description: 'TAF report root.',
        properties: {
          issueTime: { $ref: '#/components/schemas/TimeInstant' },
          aerodrome: { $ref: '#/components/schemas/AirportHeliport' },
          validPeriod: { $ref: '#/components/schemas/TimePeriod' },
          cancelledReportValidPeriod: {
            $ref: '#/components/schemas/TimePeriod',
          },
          baseForecast: {
            $ref: '#/components/schemas/MeteorologicalAerodromeForecast_Base',
          },
          changeForecast: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/MeteorologicalAerodromeForecast_Change',
            },
            description: 'Normally ≤ 5 groups; adjust limit per OPS policy.',
            maxItems: 5,
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
          isCancelReport: { type: 'boolean' },
        },
        required: ['issueTime', 'aerodrome'],
        allOf: [
          {
            if: { properties: { isCancelReport: { const: true } } },
            then: {
              required: ['cancelledReportValidPeriod'],
              not: {
                anyOf: [
                  { required: ['baseForecast'] },
                  { required: ['changeForecast'] },
                ],
              },
            },
          },
          {
            if: { properties: { isCancelReport: { const: false } } },
            then: { required: ['baseForecast', 'validPeriod'] },
          },
        ],
      },

      MeteorologicalAerodromeForecast_Base: {
        type: 'object',
        description:
          'Prevailing (base) forecast conditions. No changeIndicator. Temps allowed.',
        properties: {
          phenomenonTime: { $ref: '#/components/schemas/TimePeriod' },
          prevailingVisibility: { $ref: '#/components/schemas/Distance_m' },
          prevailingVisibilityOperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          surfaceWind: {
            $ref: '#/components/schemas/AerodromeSurfaceWindForecast',
          },
          weather: {
            type: 'array',
            maxItems: 3,
            items: { $ref: '#/components/schemas/PresentOrForecastWeather' },
          },
          cloud: { $ref: '#/components/schemas/AerodromeCloudForecast' },
          temperature: {
            type: 'array',
            maxItems: 2,
            items: {
              $ref: '#/components/schemas/AerodromeAirTemperatureForecast',
            },
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
          cloudAndVisibilityOK: { type: 'boolean' },
        },
        required: ['phenomenonTime'],
        allOf: [{ $ref: '#/components/schemas/CAVOK_Constraint' }],
      },

      MeteorologicalAerodromeForecast_Change: {
        type: 'object',
        description:
          'Forecast group that modifies base. Requires changeIndicator. Temps disallowed.',
        properties: {
          phenomenonTime: { $ref: '#/components/schemas/TimePeriodOrInstant' },
          prevailingVisibility: { $ref: '#/components/schemas/Distance_m' },
          prevailingVisibilityOperator: {
            $ref: '#/components/schemas/RelationalOperatorType',
          },
          surfaceWind: {
            $ref: '#/components/schemas/AerodromeSurfaceWindForecast',
          },
          weather: {
            type: 'array',
            maxItems: 3,
            items: { $ref: '#/components/schemas/PresentOrForecastWeather' },
          },
          cloud: { $ref: '#/components/schemas/AerodromeCloudForecast' },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
          cloudAndVisibilityOK: { type: 'boolean' },
          changeIndicator: {
            $ref: '#/components/schemas/AerodromeForecastChangeIndicatorType',
          },
        },
        required: ['phenomenonTime', 'changeIndicator'],
        allOf: [
          { $ref: '#/components/schemas/CAVOK_Constraint' },
          {
            not: { required: ['temperature'] },
            description: 'Temperature forecast not allowed in change groups.',
          },
        ],
      },

      CAVOK_Constraint: {
        type: 'object',
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

      AerodromeAirTemperatureForecast: {
        type: 'object',
        description:
          'TX/TN and their times. Times must lie within the containing phenomenonTime period.',
        properties: {
          maximumAirTemperature: {
            $ref: '#/components/schemas/Measure_Celsius',
          },
          maximumAirTemperatureTime: {
            $ref: '#/components/schemas/TimeInstant',
          },
          minimumAirTemperature: {
            $ref: '#/components/schemas/Measure_Celsius',
          },
          minimumAirTemperatureTime: {
            $ref: '#/components/schemas/TimeInstant',
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
        required: [
          'maximumAirTemperature',
          'maximumAirTemperatureTime',
          'minimumAirTemperature',
          'minimumAirTemperatureTime',
        ],
      },

      AerodromeSurfaceWindForecast: {
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
          variableWindDirection: { type: 'boolean' },
          extremeClockwiseWindDirection: {
            $ref: '#/components/schemas/Angle_deg',
          },
          extremeCounterClockwiseWindDirection: {
            $ref: '#/components/schemas/Angle_deg',
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      AerodromeCloudForecast: {
        type: 'object',
        properties: {
          verticalVisibility: { $ref: '#/components/schemas/Length_m_or_ft' },
          layer: {
            type: 'array',
            maxItems: 4,
            items: { $ref: '#/components/schemas/CloudLayer' },
          },
          extension: {
            type: 'array',
            items: { $ref: '#/components/schemas/Extension' },
          },
        },
      },

      CloudLayer: {
        type: 'object',
        properties: {
          amount: { $ref: '#/components/schemas/CloudAmountCode' },
          base: { $ref: '#/components/schemas/Length_m_or_ft' },
          cloudType: { $ref: '#/components/schemas/CloudTypeCode' },
        },
      },

      PresentOrForecastWeather: {
        type: 'object',
        description:
          'CodeList http://codes.wmo.int/49-2/AerodromePresentOrForecastWeather',
        properties: {
          code: { type: 'string' },
          uri: { type: 'string', format: 'uri' },
          name: { type: 'string' },
        },
        required: ['code'],
      },

      AerodromeForecastChangeIndicatorType: {
        type: 'string',
        enum: [
          'BECOMING',
          'TEMPORARY_FLUCTUATIONS',
          'FROM',
          'PROBABILITY_30',
          'PROBABILITY_30_TEMPORARY_FLUCTUATIONS',
          'PROBABILITY_40',
          'PROBABILITY_40_TEMPORARY_FLUCTUATIONS',
        ],
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
        enum: ['CB', 'TCU', 'NSC', 'NCD', '///'],
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

      TimeInstant: { type: 'string', format: 'date-time' },
      TimePeriod: {
        type: 'object',
        properties: {
          start: { $ref: '#/components/schemas/TimeInstant' },
          end: { $ref: '#/components/schemas/TimeInstant' },
        },
        required: ['start', 'end'],
      },
      TimePeriodOrInstant: {
        oneOf: [
          { $ref: '#/components/schemas/TimePeriod' },
          { $ref: '#/components/schemas/TimeInstant' },
        ],
      },

      Measure_Celsius: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnit' },
          { type: 'object', properties: { uom: { enum: ['Cel'] } } },
        ],
      },
      Distance_m: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnit' },
          { type: 'object', properties: { uom: { enum: ['m'] } } },
        ],
      },
      Length_m_or_ft: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnit' },
          { type: 'object', properties: { uom: { enum: ['m', '[ft_i]'] } } },
        ],
      },
      Velocity_ms_or_kt: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnit' },
          { type: 'object', properties: { uom: { enum: ['m/s', '[kn_i]'] } } },
        ],
      },
      Angle_deg: {
        allOf: [
          { $ref: '#/components/schemas/QuantityWithUnit' },
          { type: 'object', properties: { uom: { enum: ['deg'] } } },
        ],
      },

      QuantityWithUnit: {
        type: 'object',
        properties: {
          value: { type: 'number' },
          uom: { type: 'string' },
        },
        required: ['value', 'uom'],
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

      Extension: { type: 'object', additionalProperties: true },
    },
  },
};
