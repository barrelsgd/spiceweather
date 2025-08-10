export const BUFR = {
  openapi: '3.1.0',
  info: {
    title:
      'TM 307080 — SYNOP from Fixed Land Stations (BUFR sequence 3 07 080)',
    version: '1.0.0',
    description:
      'OpenAPI JSON Schema for ingesting and producing SYNOP observations encoded per WMO TM 307080 (BUFR sequence 3 07 080). Units and precision reflect BUFR Table B entries. Each property includes the BUFR descriptor mapping (F-X-Y), unit, and scale in $comment. Code-table and flag-table fields reference WMO tables by URI where applicable.',
  },
  paths: {},
  components: {
    schemas: {
      SynopTM307080: {
        type: 'object',
        additionalProperties: false,
        required: [
          'surfaceStationIdentification',
          'pressureInformation',
          'basicSynopticInstantaneousData',
          'basicSynopticPeriodData',
        ],
        properties: {
          metadata: {
            type: 'object',
            description:
              'Optional message-level metadata not carried in BUFR Section 4 but useful for APIs (e.g., message ids, routing).',
            additionalProperties: true,
          },
          surfaceStationIdentification: {
            $ref: '#/components/schemas/SurfaceStationIdentification',
          },
          pressureInformation: {
            $ref: '#/components/schemas/PressureInformation',
          },
          basicSynopticInstantaneousData: {
            $ref: '#/components/schemas/BasicSynopticInstantaneousData',
          },
          cloudsWithBasesBelowStationLevel: {
            $ref: '#/components/schemas/CloudsBelowStationLevel',
          },
          directionOfCloudDrift: {
            $ref: '#/components/schemas/DirectionOfCloudDrift',
          },
          directionAndElevationOfCloud: {
            $ref: '#/components/schemas/DirectionAndElevationOfCloud',
          },
          stateOfGroundSnowAndMinTemp: {
            $ref: '#/components/schemas/StateOfGroundSnowAndMinTemp',
          },
          basicSynopticPeriodData: {
            $ref: '#/components/schemas/BasicSynopticPeriodData',
          },
          evaporationData: {
            $ref: '#/components/schemas/EvaporationData',
          },
          radiationData: {
            $ref: '#/components/schemas/RadiationData',
          },
          temperatureChange: {
            $ref: '#/components/schemas/TemperatureChange',
          },
        },
      },

      SurfaceStationIdentification: {
        type: 'object',
        description:
          '3 01 090 — Surface station identification; time, horizontal and vertical coordinates.',
        required: [
          'wmoBlockNumber',
          'wmoStationNumber',
          'typeOfStation',
          'time',
          'location',
        ],
        properties: {
          wmoBlockNumber: {
            type: 'integer',
            minimum: 0,
            maximum: 99,
            $comment:
              '0 01 001 — WMO block number; Unit: numeric; Scale: 0; Width: 7 bits.',
          },
          wmoStationNumber: {
            type: 'integer',
            minimum: 0,
            maximum: 999,
            $comment:
              '0 01 002 — WMO station number; Unit: numeric; Scale: 0; Width: 10 bits.',
          },
          stationOrSiteName: {
            type: 'string',
            $comment: '0 01 015 — Station or site name; CCITT IA5.',
          },
          typeOfStation: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 02 001 — Type of station; Code table.',
          },
          time: {
            type: 'object',
            required: ['year', 'month', 'day', 'hour', 'minute'],
            properties: {
              year: {
                type: 'integer',
                minimum: 1900,
                maximum: 2100,
                $comment: '0 04 001 — Year',
              },
              month: {
                type: 'integer',
                minimum: 1,
                maximum: 12,
                $comment: '0 04 002 — Month',
              },
              day: {
                type: 'integer',
                minimum: 1,
                maximum: 31,
                $comment: '0 04 003 — Day',
              },
              hour: {
                type: 'integer',
                minimum: 0,
                maximum: 23,
                $comment: '0 04 004 — Hour',
              },
              minute: {
                type: 'integer',
                minimum: 0,
                maximum: 59,
                $comment: '0 04 005 — Minute (SYNOP uses 00).',
              },
            },
          },
          location: {
            type: 'object',
            required: ['latitude', 'longitude'],
            properties: {
              latitude: {
                type: 'number',
                minimum: -90,
                maximum: 90,
                $comment:
                  '0 05 001 — Latitude (high accuracy) degrees; Scale: 5.',
              },
              longitude: {
                type: 'number',
                minimum: -180,
                maximum: 180,
                $comment:
                  '0 06 001 — Longitude (high accuracy) degrees; Scale: 5.',
              },
              stationGroundHeightMSL_m: {
                type: 'number',
                $comment:
                  '0 07 030 — Height of station ground above MSL; Unit: m; Scale: 1.',
              },
              barometerHeightMSL_m: {
                type: 'number',
                $comment:
                  '0 07 031 — Height of barometer above MSL; Unit: m; Scale: 1.',
              },
            },
          },
        },
      },

      PressureInformation: {
        type: 'object',
        description: '3 02 031 — Pressure information.',
        properties: {
          stationPressure_Pa: {
            type: 'number',
            $comment: '0 10 004 — Pressure P0P0P0P0; Unit: Pa; Scale: -1.',
          },
          pressureReducedToMSL_Pa: {
            type: 'number',
            $comment:
              '0 10 051 — Pressure reduced to mean sea level PPPP; Unit: Pa; Scale: -1.',
          },
          pressureChange3h_Pa: {
            type: 'number',
            $comment:
              '0 10 061 — 3-hour pressure change ppp; Unit: Pa; Scale: -1.',
          },
          pressureTendencyCharacteristic: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment:
              '0 10 063 — Characteristic of pressure tendency; Code table.',
          },
          pressureChange24h_Pa: {
            type: 'number',
            $comment:
              '0 10 062 — 24-hour pressure change p24; Unit: Pa; Scale: -1.',
          },
          standardLevels: {
            type: 'array',
            description:
              'Optional standard-level pressure and geopotential height pairs (e.g., 925/850/700 hPa).',
            items: {
              type: 'object',
              properties: {
                pressure_Pa: {
                  type: 'number',
                  $comment:
                    '0 07 004 — Pressure (standard level) a3; Unit: Pa; Scale: -1.',
                },
                geopotentialHeight_gpm: {
                  type: 'number',
                  $comment:
                    '0 10 009 — Geopotential height of the standard level; Unit: gpm; Scale: 0.',
                },
              },
            },
          },
        },
      },

      BasicSynopticInstantaneousData: {
        type: 'object',
        description:
          '3 02 035 — Basic synoptic instantaneous data, grouped by sub-topic.',
        properties: {
          temperatureAndHumidity: {
            $ref: '#/components/schemas/TemperatureAndHumidity',
          },
          visibility: { $ref: '#/components/schemas/Visibility' },
          precipitationPast24h: {
            $ref: '#/components/schemas/PrecipitationPast24h',
          },
          generalCloudInformation: {
            $ref: '#/components/schemas/GeneralCloudInformation',
          },
          individualCloudLayers: {
            type: 'array',
            description:
              'Delayed replication of individual cloud layers or masses.',
            items: { $ref: '#/components/schemas/CloudLayer' },
          },
        },
      },

      TemperatureAndHumidity: {
        type: 'object',
        required: ['sensorHeight_m', 'airTemperature_K'],
        properties: {
          sensorHeight_m: {
            type: 'number',
            $comment:
              '0 07 032 — Height of sensor above local ground; Unit: m; Scale: 2.',
          },
          airTemperature_K: {
            type: 'number',
            $comment: '0 12 101 — Air temperature; Unit: K; Scale: 2.',
          },
          dewpointTemperature_K: {
            type: 'number',
            $comment: '0 12 103 — Dewpoint temperature; Unit: K; Scale: 2.',
          },
          relativeHumidity_pct: {
            type: 'number',
            minimum: 0,
            maximum: 100,
            $comment: '0 13 003 — Relative humidity; Unit: %; Scale: 0.',
          },
        },
      },

      Visibility: {
        type: 'object',
        properties: {
          sensorHeight_m: {
            type: 'number',
            $comment:
              '0 07 032 — Height of sensor for visibility; Unit: m; Scale: 2.',
          },
          horizontalVisibility_m: {
            type: 'number',
            $comment:
              '0 20 001 — Horizontal visibility VV; Unit: m; Scale: -1.',
          },
        },
      },

      PrecipitationPast24h: {
        type: 'object',
        properties: {
          sensorHeight_m: {
            type: 'number',
            $comment:
              '0 07 032 — Height of sensor for precipitation; Unit: m; Scale: 2.',
          },
          totalPrecipitation_kg_m2: {
            type: 'number',
            $comment:
              '0 13 023 — Total precipitation past 24 hours R24; Unit: kg m^-2; Scale: 1 (equiv. mm/10).',
          },
        },
      },

      GeneralCloudInformation: {
        type: 'object',
        properties: {
          totalCloudCover_pct: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
            $comment: '0 20 010 — Cloud cover (total) N; Unit: %; Scale: 0.',
          },
          verticalSignificance: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 08 002 — Vertical significance (surface obs).',
          },
          cloudAmountLowOrMiddle: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 011 — Cloud amount Nh; Code table (oktas).',
          },
          cloudBaseHeight_m: {
            type: 'number',
            $comment:
              '0 20 013 — Height of base of cloud h; Unit: m; Scale: -1.',
          },
          cloudTypeLow: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 012 — Cloud type CL; Code table.',
          },
          cloudTypeMiddle: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 012 — Cloud type CM; Code table.',
          },
          cloudTypeHigh: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 012 — Cloud type CH; Code table.',
          },
        },
      },

      CloudLayer: {
        type: 'object',
        description:
          'Delayed replication block for individual cloud layer or mass.',
        properties: {
          verticalSignificance: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 08 002 — Vertical significance.',
          },
          cloudAmount: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 011 — Cloud amount Ns; Code table.',
          },
          cloudType: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 012 — Cloud type C; Code table.',
          },
          cloudBaseHeight_m: {
            type: 'number',
            $comment:
              '0 20 013 — Height of base of cloud hs; Unit: m; Scale: -1.',
          },
        },
      },

      CloudsBelowStationLevel: {
        type: 'object',
        description:
          '3 02 036 — Clouds with bases below station level; delayed replication of 5 descriptors.',
        properties: {
          layers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                verticalSignificance: {
                  allOf: [{ $ref: '#/components/schemas/CodeTable' }],
                  $comment: '0 08 002 — Vertical significance.',
                },
                cloudAmount: {
                  allOf: [{ $ref: '#/components/schemas/CodeTable' }],
                  $comment: "0 20 011 — Cloud amount N'.",
                },
                cloudType: {
                  allOf: [{ $ref: '#/components/schemas/CodeTable' }],
                  $comment: "0 20 012 — Cloud type C'.",
                },
                cloudTopHeight_m: {
                  type: 'number',
                  $comment:
                    "0 20 014 — Height of top of cloud H'H'; Unit: m; Scale: -1.",
                },
                cloudTopDescription: {
                  allOf: [{ $ref: '#/components/schemas/CodeTable' }],
                  $comment: '0 20 017 — Cloud top description Ct; Code table.',
                },
              },
            },
          },
        },
      },

      DirectionOfCloudDrift: {
        type: 'object',
        description:
          '3 02 047 — Direction of cloud drift, reported for low, middle, high clouds.',
        properties: {
          low_degTrue: {
            type: 'number',
            $comment:
              '0 20 054 — Direction of movement DL; degrees true; Scale: 0.',
          },
          middle_degTrue: {
            type: 'number',
            $comment:
              '0 20 054 — Direction of movement DM; degrees true; Scale: 0.',
          },
          high_degTrue: {
            type: 'number',
            $comment:
              '0 20 054 — Direction of movement DH; degrees true; Scale: 0.',
          },
        },
      },

      DirectionAndElevationOfCloud: {
        type: 'object',
        description: '3 02 048 — Direction and elevation of cloud of type C.',
        properties: {
          bearing_degTrue: {
            type: 'number',
            $comment: '0 05 021 — Bearing/azimuth Da; degrees true; Scale: 2.',
          },
          elevation_deg: {
            type: 'number',
            $comment: '0 07 021 — Elevation eC; degrees; Scale: 2.',
          },
          cloudType: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 012 — Cloud type C; Code table.',
          },
        },
      },

      StateOfGroundSnowAndMinTemp: {
        type: 'object',
        description:
          '3 02 037 — State of ground, snow depth, ground minimum temperature.',
        properties: {
          stateOfGround: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 062 — State of the ground E; Code table.',
          },
          totalSnowDepth_m: {
            type: 'number',
            $comment: '0 13 013 — Total snow depth sss; Unit: m; Scale: 2.',
          },
          groundMinTempLast12h_K: {
            type: 'number',
            $comment:
              '0 12 113 — Ground minimum temperature past 12 h; Unit: K; Scale: 2.',
          },
        },
      },

      BasicSynopticPeriodData: {
        type: 'object',
        description:
          '3 02 043 — Basic synoptic period data, composed of present/past weather, sunshine, precipitation amounts, extreme temperatures, and wind statistics.',
        properties: {
          presentAndPastWeather: {
            $ref: '#/components/schemas/PresentAndPastWeather',
          },
          sunshine: {
            type: 'array',
            description: 'Two entries are typical: 1 h and 24 h totals.',
            items: { $ref: '#/components/schemas/SunshineEntry' },
          },
          precipitation: {
            $ref: '#/components/schemas/PrecipitationMeasurement',
          },
          extremeTemperatures: {
            $ref: '#/components/schemas/ExtremeTemperatureData',
          },
          wind: { $ref: '#/components/schemas/WindData' },
        },
      },

      PresentAndPastWeather: {
        type: 'object',
        properties: {
          presentWeather: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 003 — Present weather ww.',
          },
          timePeriodHours: {
            type: 'integer',
            $comment:
              '0 04 024 — Time period or displacement (hours) for past weather context.',
          },
          pastWeather1: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 004 — Past weather (1) W1.',
          },
          pastWeather2: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment: '0 20 005 — Past weather (2) W2.',
          },
        },
      },

      SunshineEntry: {
        type: 'object',
        required: ['periodHours', 'totalMinutes'],
        properties: {
          periodHours: {
            type: 'integer',
            $comment: '0 04 024 — Time period (hours).',
          },
          totalMinutes: {
            type: 'integer',
            $comment: '0 14 031 — Total sunshine SS/SSS; minutes.',
          },
        },
      },

      PrecipitationMeasurement: {
        type: 'object',
        properties: {
          sensorHeight_m: {
            type: 'number',
            $comment:
              '0 07 032 — Height of sensor for precipitation; Unit: m; Scale: 2.',
          },
          amounts: {
            type: 'array',
            description:
              'Two replicated amounts with their periods (e.g., 1 h and 6 h).',
            items: {
              type: 'object',
              required: ['periodHours', 'totalPrecip_kg_m2'],
              properties: {
                periodHours: {
                  type: 'integer',
                  $comment: '0 04 024 — Time period (hours).',
                },
                totalPrecip_kg_m2: {
                  type: 'number',
                  $comment:
                    '0 13 011 — Total precipitation RRR; kg m^-2; Scale: 1.',
                },
              },
            },
          },
        },
      },

      ExtremeTemperatureData: {
        type: 'object',
        properties: {
          sensorHeight_m: {
            type: 'number',
            $comment:
              '0 07 032 — Height of sensor for temperature; Unit: m; Scale: 2.',
          },
          max: {
            type: 'object',
            properties: {
              periodHours_1: {
                type: 'integer',
                $comment: '0 04 024 — Time period or displacement (hours).',
              },
              periodHours_2: {
                type: 'integer',
                $comment:
                  '0 04 024 — Time period or displacement (hours); see regional Notes for RA III/IV.',
              },
              maximumTemperature_K: {
                type: 'number',
                $comment:
                  '0 12 111 — Maximum temperature over specified period; Unit: K; Scale: 2.',
              },
            },
          },
          min: {
            type: 'object',
            properties: {
              periodHours_1: {
                type: 'integer',
                $comment: '0 04 024 — Time period or displacement (hours).',
              },
              periodHours_2: {
                type: 'integer',
                $comment: '0 04 024 — Time period or displacement (hours).',
              },
              minimumTemperature_K: {
                type: 'number',
                $comment:
                  '0 12 112 — Minimum temperature over specified period; Unit: K; Scale: 2.',
              },
            },
          },
        },
      },

      WindData: {
        type: 'object',
        properties: {
          sensorHeight_m: {
            type: 'number',
            $comment:
              '0 07 032 — Height of sensor for wind; Unit: m; Scale: 2.',
          },
          instrumentation: {
            allOf: [{ $ref: '#/components/schemas/FlagTable' }],
            $comment:
              '0 02 002 — Type of instrumentation for wind measurement; Flag table iw.',
          },
          averagingMinutes: {
            type: 'integer',
            $comment:
              '0 08 021 + 0 04 025 — Time significance = time averaged; period in minutes (typically 10).',
          },
          meanDirection_degTrue: {
            type: 'number',
            $comment: '0 11 001 — Wind direction dd; deg true.',
          },
          meanSpeed_m_s: {
            type: 'number',
            $comment: '0 11 002 — Wind speed ff; m/s; Scale: 1.',
          },
          gusts: {
            type: 'array',
            maxItems: 2,
            description:
              'Two replicated entries of max gust statistics with their periods.',
            items: {
              type: 'object',
              properties: {
                periodMinutes: {
                  type: 'integer',
                  $comment: '0 04 025 — Time period/displacement (minutes).',
                },
                gustDirection_degTrue: {
                  type: 'number',
                  $comment: '0 11 043 — Maximum wind gust direction; deg true.',
                },
                gustSpeed_m_s: {
                  type: 'number',
                  $comment:
                    '0 11 041 — Maximum wind gust speed; m/s; Scale: 1.',
                },
              },
            },
          },
        },
      },

      EvaporationData: {
        type: 'object',
        description: '3 02 044 — Evaporation/evapotranspiration over a period.',
        properties: {
          periodHours: {
            type: 'integer',
            $comment: '0 04 024 — Time period (hours).',
          },
          instrumentationOrCrop: {
            allOf: [{ $ref: '#/components/schemas/CodeTable' }],
            $comment:
              '0 02 004 — Type of instrumentation for evaporation or crop type; Code table iE.',
          },
          evaporation_kg_m2: {
            type: 'number',
            $comment:
              '0 13 033 — Evaporation/evapotranspiration EEE; kg m^-2; Scale: 1.',
          },
        },
      },

      RadiationData: {
        type: 'object',
        description:
          '3 02 045 — Radiation totals integrated over 1 h and 24 h; typically replicated twice.',
        properties: {
          entries: {
            type: 'array',
            items: {
              type: 'object',
              required: ['periodHours'],
              properties: {
                periodHours: {
                  type: 'integer',
                  $comment: '0 04 024 — Time period (hours).',
                },
                longWave_J_m2: {
                  type: 'number',
                  $comment:
                    '0 14 002 — Long-wave radiation over period; J m^-2; Scale: -3.',
                },
                shortWave_J_m2: {
                  type: 'number',
                  $comment:
                    '0 14 004 — Short-wave radiation over period; J m^-2; Scale: -3.',
                },
                netRadiation_J_m2: {
                  type: 'number',
                  $comment:
                    '0 14 016 — Net radiation over period; J m^-2; Scale: -4.',
                },
                globalSolarHighAcc_J_m2: {
                  type: 'number',
                  $comment:
                    '0 14 028 — Global solar radiation (high accuracy); J m^-2; Scale: -2.',
                },
                diffuseSolarHighAcc_J_m2: {
                  type: 'number',
                  $comment:
                    '0 14 029 — Diffuse solar radiation (high accuracy); J m^-2; Scale: -2.',
                },
                directSolarHighAcc_J_m2: {
                  type: 'number',
                  $comment:
                    '0 14 030 — Direct solar radiation (high accuracy); J m^-2; Scale: -2.',
                },
              },
            },
          },
        },
      },

      TemperatureChange: {
        type: 'object',
        description: '3 02 046 — Temperature change group 54g0sndT.',
        properties: {
          periodHours_pastWeatherWindow: {
            type: 'integer',
            $comment:
              '0 04 024 — Time period or displacement (hours) covering past weather window.',
          },
          periodHours_toOccurrence: {
            type: 'integer',
            $comment:
              '0 04 024 — Time to occurrence of the change; negative hours; see Reg. B/C1.13.1.',
          },
          temperatureChange_K: {
            type: 'number',
            $comment:
              '0 12 049 — Temperature change over specified period; Unit: K; Scale: 0.',
          },
        },
      },

      CodeTable: {
        type: 'string',
        description:
          'Value from a WMO BUFR code table. Represented as the numeric code (string or integer) or mnemonic.',
        examples: ['0', '1', 'NSC', '8'],
        $comment:
          'Refer to BUFR/CREX Table B code-table referenced by descriptor context.',
      },

      FlagTable: {
        type: 'integer',
        description:
          'Bit-field according to the referenced WMO BUFR flag table. Use integer with documented bit semantics.',
        minimum: 0,
      },
    },
  },
  $defs: {
    notes: {
      nilReport:
        'Represent a NIL report by omitting all optional groups and setting fields to null, except identification and any replication counts. See WMO RegTradObs B/C1, note on NIL.',
      units:
        'Where BUFR scale is negative, numeric step is a power of 10 (e.g., Scale -1 => 10 m resolution when unit is m). This schema does not quantize values; producers should respect BUFR precision when encoding.',
      regional:
        'Regional templates (3 07 081..086, 182) extend 3 07 080. Add or override fields per region if required.',
    },
  },
  examples: [
    {
      surfaceStationIdentification: {
        wmoBlockNumber: 82,
        wmoStationNumber: 123,
        stationOrSiteName: 'EXAMPLE STATION',
        typeOfStation: '0',
        time: { year: 2025, month: 8, day: 10, hour: 12, minute: 0 },
        location: {
          latitude: -33.9249,
          longitude: 18.4241,
          stationGroundHeightMSL_m: 45.0,
          barometerHeightMSL_m: 48.5,
        },
      },
      pressureInformation: {
        stationPressure_Pa: 101_325.0,
        pressureReducedToMSL_Pa: 102_100.0,
        pressureChange3h_Pa: -200.0,
        pressureTendencyCharacteristic: '3',
        standardLevels: [{ pressure_Pa: 92_500, geopotentialHeight_gpm: 760 }],
      },
      basicSynopticInstantaneousData: {
        temperatureAndHumidity: {
          sensorHeight_m: 2.0,
          airTemperature_K: 293.15,
          dewpointTemperature_K: 290.15,
          relativeHumidity_pct: 85,
        },
        visibility: { sensorHeight_m: 2.0, horizontalVisibility_m: 9000 },
        precipitationPast24h: {
          sensorHeight_m: 1.0,
          totalPrecipitation_kg_m2: 12.3,
        },
        generalCloudInformation: {
          totalCloudCover_pct: 75,
          cloudAmountLowOrMiddle: '5',
          cloudBaseHeight_m: 600,
          cloudTypeLow: 'CU',
          cloudTypeMiddle: 'AS',
          cloudTypeHigh: 'CI',
        },
        individualCloudLayers: [
          {
            verticalSignificance: '7',
            cloudAmount: '5',
            cloudType: 'SC',
            cloudBaseHeight_m: 800,
          },
        ],
      },
      directionOfCloudDrift: {
        low_degTrue: 250,
        middle_degTrue: 260,
        high_degTrue: 270,
      },
      directionAndElevationOfCloud: {
        bearing_degTrue: 240.0,
        elevation_deg: 15.0,
        cloudType: 'CB',
      },
      stateOfGroundSnowAndMinTemp: {
        stateOfGround: '1',
        totalSnowDepth_m: 0.0,
        groundMinTempLast12h_K: 289.15,
      },
      basicSynopticPeriodData: {
        presentAndPastWeather: {
          presentWeather: '70',
          timePeriodHours: -1,
          pastWeather1: '2',
          pastWeather2: '6',
        },
        sunshine: [
          { periodHours: 1, totalMinutes: 45 },
          { periodHours: 24, totalMinutes: 720 },
        ],
        precipitation: {
          sensorHeight_m: 1.0,
          amounts: [
            { periodHours: 1, totalPrecip_kg_m2: 1.2 },
            { periodHours: 6, totalPrecip_kg_m2: 5.0 },
          ],
        },
        extremeTemperatures: {
          sensorHeight_m: 2.0,
          max: {
            periodHours_1: 24,
            periodHours_2: 0,
            maximumTemperature_K: 297.35,
          },
          min: {
            periodHours_1: 24,
            periodHours_2: 0,
            minimumTemperature_K: 287.15,
          },
        },
        wind: {
          sensorHeight_m: 10.0,
          instrumentation: 0,
          averagingMinutes: 10,
          meanDirection_degTrue: 240,
          meanSpeed_m_s: 6.7,
          gusts: [
            {
              periodMinutes: 10,
              gustDirection_degTrue: 245,
              gustSpeed_m_s: 12.3,
            },
          ],
        },
      },
      evaporationData: {
        periodHours: 24,
        instrumentationOrCrop: '1',
        evaporation_kg_m2: 3.4,
      },
      radiationData: {
        entries: [
          {
            periodHours: 1,
            shortWave_J_m2: 2.1e6,
            longWave_J_m2: 1.1e6,
            netRadiation_J_m2: 9.0e5,
          },
          {
            periodHours: 24,
            shortWave_J_m2: 1.8e7,
            longWave_J_m2: 1.0e7,
            netRadiation_J_m2: 7.0e6,
          },
        ],
      },
      temperatureChange: {
        periodHours_pastWeatherWindow: -2,
        periodHours_toOccurrence: -1,
        temperatureChange_K: 5,
      },
    },
  ],
};
