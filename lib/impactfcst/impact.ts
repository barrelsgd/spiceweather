export const ImpactFcst = {
  openapi: "3.1.0",
  info: {
    title: "Impact-Based Forecasting (IBF) – WMO 1150 aligned",
    version: "1.0.0",
    description:
      "OpenAPI component schemas for IBF v1.0. Field names and enums mirror the IBF XML. Date-times follow IBF's offset pattern. Geometries use WGS-84 strings.",
  },
  paths: {},
  components: {
    schemas: {
      IBFProduct: {
        type: "object",
        required: [
          "id",
          "issued",
          "issuer",
          "hazard",
          "riskAssessment",
          "areas",
          "impacts",
        ],
        properties: {
          id: { type: "string", description: "Unique product identifier." },
          issued: { type: "string", format: "date-time" },
          validFrom: { type: "string", format: "date-time" },
          validTo: { type: "string", format: "date-time" },
          issuer: { $ref: "#/components/schemas/Organization" },
          status: {
            type: "string",
            enum: ["Draft", "Operational", "Exercise", "Test", "Cancelled"],
          },
          language: { type: "string", description: "BCP-47 tag." },

          hazard: { $ref: "#/components/schemas/HazardSpec" },
          exposureModel: { $ref: "#/components/schemas/ExposureModelRef" },
          vulnerabilityModel: {
            $ref: "#/components/schemas/VulnerabilityModelRef",
          },

          riskAssessment: { $ref: "#/components/schemas/RiskAssessment" },

          areas: {
            type: "array",
            minItems: 1,
            items: { $ref: "#/components/schemas/AreaTarget" },
          },

          impacts: {
            type: "array",
            minItems: 1,
            items: { $ref: "#/components/schemas/ImpactStatement" },
          },

          actions: {
            type: "array",
            items: { $ref: "#/components/schemas/ActionGuidance" },
          },

          confidence: { $ref: "#/components/schemas/Confidence" },

          partners: {
            type: "array",
            description: "Participating DRCPAs and stakeholders.",
            items: { $ref: "#/components/schemas/PartnerRole" },
          },

          dissemination: { $ref: "#/components/schemas/Dissemination" },

          monitoring: { $ref: "#/components/schemas/ImpactMonitoringPlan" },

          validation: { $ref: "#/components/schemas/PostEventValidation" },

          governance: { $ref: "#/components/schemas/Governance" },

          capReferences: {
            type: "array",
            description:
              "CAP sender,identifier,sent triplets or message IDs if published via CAP.",
            items: { type: "string" },
          },

          attachments: {
            type: "array",
            items: { $ref: "#/components/schemas/Attachment" },
          },

          notes: { type: "string" },
          version: { type: "string" },
          parameters: {
            type: "array",
            items: { $ref: "#/components/schemas/KeyValue" },
          },
        },
      },

      HazardSpec: {
        type: "object",
        required: ["type", "description", "leadTime"],
        properties: {
          type: {
            type: "string",
            description:
              "Hazard type (hydrometeorological, geophysical, or human-induced).",
          },
          description: { type: "string" },
          leadTime: {
            type: "string",
            description: "ISO 8601 duration (e.g., P2D, PT6H).",
          },
          forecastWindow: {
            type: "object",
            properties: {
              start: { type: "string", format: "date-time" },
              end: { type: "string", format: "date-time" },
            },
          },
          method: {
            type: "string",
            enum: ["Deterministic", "Probabilistic", "Ensemble"],
          },
          meteorologicalSummary: { type: "string" },
          thresholdsUsed: {
            type: "array",
            description:
              "Thresholds may vary in space/time to reflect vulnerability differences.",
            items: { $ref: "#/components/schemas/Threshold" },
          },
          dataSources: {
            type: "array",
            items: { $ref: "#/components/schemas/DataSource" },
          },
        },
      },

      ExposureModelRef: {
        type: "object",
        properties: {
          datasets: {
            type: "array",
            items: { $ref: "#/components/schemas/DataSource" },
          },
          timeSlice: { type: "string", format: "date-time" },
          notes: { type: "string" },
        },
        description:
          "Who/what is in harm’s way; varies with time and location.",
      },

      VulnerabilityModelRef: {
        type: "object",
        properties: {
          datasets: {
            type: "array",
            items: { $ref: "#/components/schemas/DataSource" },
          },
          version: { type: "string" },
          notes: { type: "string" },
        },
        description: "Susceptibility of exposed elements; situation-specific.",
      },

      RiskAssessment: {
        type: "object",
        required: ["likelihood", "impactLevel", "riskLevel"],
        properties: {
          likelihood: {
            type: "string",
            enum: ["VeryLow", "Low", "Medium", "High"],
            description: "Forecast likelihood.",
          },
          impactLevel: {
            type: "string",
            enum: ["VeryLow", "Low", "Medium", "High"],
            description: "Expected severity of consequences.",
          },
          riskLevel: {
            type: "string",
            enum: ["Green", "Yellow", "Orange", "Red"],
            description: "Color per likelihood × impact matrix.",
          },
          matrixRationale: { type: "string" },
        },
      },

      AreaTarget: {
        type: "object",
        required: ["areaName", "geometry"],
        properties: {
          areaName: { type: "string" },
          adminCodes: {
            type: "array",
            items: { type: "string" },
          },
          populationEstimate: { type: "integer", minimum: 0 },
          geometry: { $ref: "#/components/schemas/GeoJSONGeometry" },
          geocodes: {
            type: "array",
            items: { $ref: "#/components/schemas/KeyValue" },
          },
        },
      },

      ImpactStatement: {
        type: "object",
        required: ["headline", "audience"],
        properties: {
          headline: {
            type: "string",
            description: "Actionable, plain-language impact.",
          },
          audience: {
            type: "array",
            items: {
              type: "string",
              description: "Population segments or sectors.",
            },
          },
          sectors: { type: "array", items: { type: "string" } },
          details: { type: "string" },
          confidenceNote: { type: "string" },
          expectedEffects: {
            type: "array",
            items: { $ref: "#/components/schemas/Effect" },
          },
        },
      },

      ActionGuidance: {
        type: "object",
        required: ["action", "audience"],
        properties: {
          action: { type: "string", description: "What to do." },
          audience: { type: "string" },
          urgency: {
            type: "string",
            enum: ["Immediate", "Soon", "Prepare", "Monitor"],
          },
          sourceAgency: { $ref: "#/components/schemas/Organization" },
        },
      },

      Confidence: {
        type: "object",
        properties: {
          summary: { type: "string" },
          ensembleSupport: { type: "number", minimum: 0, maximum: 1 },
          keyUncertainties: { type: "array", items: { type: "string" } },
        },
        description:
          "Expresses forecast uncertainty relevant to risk communication.",
      },

      Dissemination: {
        type: "object",
        properties: {
          channels: {
            type: "array",
            items: {
              type: "string",
              enum: [
                "CAP",
                "Web",
                "Email",
                "SMS",
                "Broadcast",
                "Social",
                "GIS",
              ],
            },
          },
          capFeed: {
            type: "object",
            properties: {
              endpoint: { type: "string", format: "uri" },
              alertIds: { type: "array", items: { type: "string" } },
            },
          },
          gisLayers: {
            type: "array",
            items: { $ref: "#/components/schemas/GISLayer" },
          },
        },
      },

      ImpactMonitoringPlan: {
        type: "object",
        properties: {
          observationChannels: {
            type: "array",
            items: {
              type: "string",
              description:
                "e.g., social media, crowdsourcing, webcams, transport feeds",
            },
          },
          metrics: { type: "array", items: { type: "string" } },
        },
        description: "Real-time impact monitoring and feedback.",
      },

      PostEventValidation: {
        type: "object",
        properties: {
          eventId: { type: "string" },
          observedImpacts: { type: "string" },
          evaluationNotes: { type: "string" },
          stakeholderFeedback: { type: "string" },
          improvementActions: { type: "string" },
          meetingsHeld: { type: "boolean" },
        },
        description: "System-level evaluation after significant events.",
      },

      PartnerRole: {
        type: "object",
        required: ["organization", "role"],
        properties: {
          organization: { $ref: "#/components/schemas/Organization" },
          role: {
            type: "string",
            description: "e.g., DRCPA lead, sector partner, media.",
          },
          mouRef: { type: "string" },
        },
      },

      Governance: {
        type: "object",
        properties: {
          sopRef: { type: "string" },
          changeManagement: {
            type: "string",
            description: "Phase or notes aligned with ADKAR stages.",
          },
        },
      },

      Threshold: {
        type: "object",
        properties: {
          name: { type: "string" },
          metric: { type: "string" },
          value: { type: "number" },
          duration: {
            type: "string",
            description: "ISO 8601 duration if applicable.",
          },
          spatialQualifier: {
            type: "string",
            description: "e.g., low-lying areas, elevations >1500 m",
          },
          temporalQualifier: {
            type: "string",
            description: "e.g., rush hour, early season",
          },
        },
      },

      Effect: {
        type: "object",
        properties: {
          type: {
            type: "string",
            description:
              "e.g., road closures, power outages, transport cancellations",
          },
          severity: {
            type: "string",
            enum: ["Minor", "Moderate", "Major", "Severe"],
          },
          probability: { type: "number", minimum: 0, maximum: 1 },
        },
      },

      GISLayer: {
        type: "object",
        properties: {
          name: { type: "string" },
          uri: { type: "string", format: "uri" },
          format: { type: "string", enum: ["GeoJSON", "WMS", "WFS", "KML"] },
        },
      },

      GeoJSONGeometry: {
        type: "object",
        description: "Subset of RFC 7946.",
        oneOf: [
          { $ref: "#/components/schemas/GeoJSONPoint" },
          { $ref: "#/components/schemas/GeoJSONPolygon" },
          { $ref: "#/components/schemas/GeoJSONMultiPolygon" },
        ],
      },
      GeoJSONPoint: {
        type: "object",
        properties: {
          type: { const: "Point" },
          coordinates: {
            type: "array",
            items: { type: "number" },
            minItems: 2,
            maxItems: 3,
          },
        },
        required: ["type", "coordinates"],
      },
      GeoJSONPolygon: {
        type: "object",
        properties: {
          type: { const: "Polygon" },
          coordinates: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "array",
                items: { type: "number" },
                minItems: 2,
                maxItems: 3,
              },
            },
            minItems: 1,
          },
        },
        required: ["type", "coordinates"],
      },
      GeoJSONMultiPolygon: {
        type: "object",
        properties: {
          type: { const: "MultiPolygon" },
          coordinates: {
            type: "array",
            items: {
              type: "array",
              items: {
                type: "array",
                items: {
                  type: "array",
                  items: { type: "number" },
                  minItems: 2,
                  maxItems: 3,
                },
              },
            },
          },
        },
        required: ["type", "coordinates"],
      },

      Organization: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          unit: { type: "string" },
          contact: { type: "string" },
          web: { type: "string", format: "uri" },
          country: { type: "string" },
        },
      },

      DataSource: {
        type: "object",
        properties: {
          name: { type: "string" },
          type: {
            type: "string",
            description: "e.g., NWP, crowd-sourced, remote sensing",
          },
          uri: { type: "string", format: "uri" },
          version: { type: "string" },
        },
      },

      Attachment: {
        type: "object",
        properties: {
          description: { type: "string" },
          mimeType: { type: "string" },
          uri: { type: "string", format: "uri" },
        },
      },

      KeyValue: {
        type: "object",
        required: ["key", "value"],
        properties: {
          key: { type: "string" },
          value: { type: "string" },
        },
      },
    },
  },
};
