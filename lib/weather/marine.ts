/**
 * 𝗠𝗮𝗿𝗶𝗻𝗲 𝗕𝘂𝗹𝗹𝗲𝘁𝗶𝗻 / 𝗔𝗱𝘃𝗶𝘀𝗼𝗿𝘆 – 05 am 30 Jul 2025
 */
export const marineBulletin = {
  report_type: 'marine_bulletin',
  issued_at: '2025-07-30T05:00:00-04:00',
  status_color: 'GREEN',
  synopsis:
    'Moderate winds will push a band of shallow moisture across the southern Windward Islands.',
  weather:
    'Partly cloudy with brief daytime showers; increasing in cloudiness overnight with light to moderate showers.',
  likelihood: 'High',
  impact: 'Minimal',
  response: 'No Action',
  sea_state: 'Slight to moderate; waves 3 – 5 ft in open waters',
  visibility: 'Good (≥ 5 NM)',
  wind: 'E to SE 8–18 kt',
  tide: { high_time: '06:30', low_time: '13:45' },
  moon: {
    last_phase: 'New Moon (24 Jul)',
    next_phase: 'New Moon (01 Aug)',
    moonrise: '10:38',
    moonset: '22:40',
  },
  sun: { sunrise: '05:53', sunset: '18:33' },
  valid_for_hours: 24,
  forecaster: 'Fimber Frank',
  contact: {
    email: 'meteorology@gaa.gd',
    telephones: ['+1-473-444-4142', '+1-473-444-4101'],
    fax: '+1-473-444-1574',
  },
} as const;

export type MarineBulletin = typeof marineBulletin;
