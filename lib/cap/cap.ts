export const CommonAlertingProtocol = {
  "openapi": "3.1.0",
  "info": {
    "title": "Common Alerting Protocol v1.2 (JSON mapping)",
    "version": "1.0.0",
    "description": "OpenAPI component schemas for CAP v1.2. Field names and enums mirror the CAP XML. Date-times follow CAP's offset pattern. Geometries use WGS-84 strings."
  },
  "paths": {},
  "components": {
    "schemas": {
      "CAPAlert": {
        "type": "object",
        "required": ["identifier", "sender", "sent", "status", "msgType", "scope"],
        "properties": {
          "identifier": { "type": "string", "description": "Unique ID from sender; no spaces, commas, '<' or '&'." },
          "sender": { "type": "string", "description": "Globally unique sender ID (e.g., domain-based); no spaces, commas, '<' or '&'." },
          "sent": {
            "type": "string",
            "description": "CAP dateTime with explicit offset. No 'Z'. UTC must be '-00:00'.",
            "pattern": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[\\-\\+]\\d{2}:\\d{2}$",
            "examples": ["2002-05-30T14:30:10-00:00"]
          },
          "status": {
            "type": "string",
            "enum": ["Actual", "Exercise", "System", "Test", "Draft"]
          },
          "msgType": {
            "type": "string",
            "enum": ["Alert", "Update", "Cancel", "Ack", "Error"]
          },
          "source": { "type": "string", "description": "Free-text source (operator or device)." },
          "scope": {
            "type": "string",
            "enum": ["Public", "Restricted", "Private"]
          },
          "restriction": { "type": "string", "description": "Required when scope='Restricted'." },
          "addresses": {
            "type": "array",
            "description": "Required when scope='Private'. Intended recipients. JSON list replaces CAP space-delimited string.",
            "items": { "type": "string" }
          },
          "code": {
            "type": "array",
            "description": "User-defined flags for special handling.",
            "items": { "type": "string" }
          },
          "note": { "type": "string" },
          "references": {
            "type": "array",
            "description": "Extended IDs of referenced CAP messages as 'sender,identifier,sent'.",
            "items": { "type": "string" }
          },
          "incidents": {
            "type": "array",
            "description": "Names/identifiers collating related messages.",
            "items": { "type": "string" }
          },
          "info": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/CAPInfo" }
          },
          "xmlSignature": {
            "type": "object",
            "description": "Optional XML Digital Signature payload (enveloped). Accept but do not require validation.",
            "additionalProperties": true
          }
        },
        "allOf": [
          {
            "if": { "properties": { "scope": { "const": "Restricted" } } },
            "then": { "required": ["restriction"] }
          },
          {
            "if": { "properties": { "scope": { "const": "Private" } } },
            "then": { "required": ["addresses"] }
          }
        ]
      },

      "CAPInfo": {
        "type": "object",
        "required": ["category", "event", "urgency", "severity", "certainty"],
        "properties": {
          "language": {
            "type": "string",
            "description": "BCP-47 language tag; default 'en-US' if omitted.",
            "examples": ["en-US", "es-ES"]
          },
          "category": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "string",
              "enum": [
                "Geo","Met","Safety","Security","Rescue","Fire","Health","Env","Transport","Infra","CBRNE","Other"
              ]
            }
          },
          "event": { "type": "string", "description": "Human-readable event type." },
          "responseType": {
            "type": "array",
            "items": {
              "type": "string",
              "enum": ["Shelter","Evacuate","Prepare","Execute","Avoid","Monitor","Assess","AllClear","None"]
            }
          },
          "urgency": {
            "type": "string",
            "enum": ["Immediate","Expected","Future","Past","Unknown"]
          },
          "severity": {
            "type": "string",
            "enum": ["Extreme","Severe","Moderate","Minor","Unknown"]
          },
          "certainty": {
            "type": "string",
            "enum": ["Observed","Likely","Possible","Unlikely","Unknown"],
            "description": "Deprecated 'Very Likely' should be treated as 'Likely' by consumers."
          },
          "audience": { "type": "string" },
          "eventCode": {
            "type": "array",
            "description": "System-specific event codes.",
            "items": { "$ref": "#/components/schemas/CAPKeyValue" }
          },
          "effective": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[\\-\\+]\\d{2}:\\d{2}$"
          },
          "onset": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[\\-\\+]\\d{2}:\\d{2}$"
          },
          "expires": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[\\-\\+]\\d{2}:\\d{2}$"
          },
          "senderName": { "type": "string" },
          "headline": { "type": "string", "description": "Short actionable headline. 160 characters recommended." },
          "description": { "type": "string" },
          "instruction": { "type": "string" },
          "web": { "type": "string", "format": "uri" },
          "contact": { "type": "string" },
          "parameter": {
            "type": "array",
            "description": "System-specific parameters.",
            "items": { "$ref": "#/components/schemas/CAPKeyValue" }
          },
          "resource": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/CAPResource" }
          },
          "area": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/CAPArea" }
          }
        }
      },

      "CAPResource": {
        "type": "object",
        "required": ["resourceDesc", "mimeType"],
        "properties": {
          "resourceDesc": { "type": "string" },
          "mimeType": { "type": "string", "description": "MIME type (IANA registered)." },
          "size": { "type": "integer", "minimum": 0, "description": "Approximate bytes." },
          "uri": { "type": "string", "format": "uri", "description": "Absolute or relative URI." },
          "derefUri": {
            "type": "string",
            "description": "Base64-encoded content for one-way links.",
            "contentEncoding": "base64"
          },
          "digest": {
            "type": "string",
            "description": "SHA-1 hex digest of the resource file.",
            "pattern": "^[A-Fa-f0-9]{40}$"
          }
        }
      },

      "CAPArea": {
        "type": "object",
        "required": ["areaDesc"],
        "properties": {
          "areaDesc": { "type": "string" },
          "polygon": {
            "type": "array",
            "description": "Whitespace-separated WGS-84 coordinate pairs. Minimum 4 pairs. First equals last.",
            "items": {
              "type": "string",
              "pattern": "^-?\\d{1,2}(?:\\.\\d+)?,\\s*-?\\d{1,3}(?:\\.\\d+)?(?:\\s+-?\\d{1,2}(?:\\.\\d+)?,\\s*-?\\d{1,3}(?:\\.\\d+)?)+$"
            }
          },
          "circle": {
            "type": "array",
            "description": "WGS-84 center 'lat,lon' then space then radius in km.",
            "items": {
              "type": "string",
              "pattern": "^-?\\d{1,2}(?:\\.\\d+)?,\\s*-?\\d{1,3}(?:\\.\\d+)?\\s+\\d+(?:\\.\\d+)?$"
            }
          },
          "geocode": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/CAPKeyValue" }
          },
          "altitude": { "type": "number", "description": "Feet above MSL (WGS-84)." },
          "ceiling": { "type": "number", "description": "Feet above MSL (WGS-84). Requires 'altitude'." }
        },
        "allOf": [
          {
            "if": { "required": ["ceiling"] },
            "then": { "required": ["altitude"] }
          }
        ]
      },

      "CAPKeyValue": {
        "type": "object",
        "required": ["valueName", "value"],
        "properties": {
          "valueName": { "type": "string", "description": "Domain name for the code (e.g., SAME, FIPS, ZIP)." },
          "value": { "type": "string" }
        }
      }
    }
  }
}
 as const;

export type CommonAlertingProtocol = typeof CommonAlertingProtocol;