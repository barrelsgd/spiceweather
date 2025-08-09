/**
 * 𝗧𝗿𝗼𝗽𝗶𝗰𝗮𝗹 𝗪𝗲𝗮𝘁𝗵𝗲𝗿 𝗢𝘂𝘁𝗹𝗼𝗼𝗸 – 08 am 29 Jul 2025
 */
export const tropWxOutlook = {
  report_type: 'tropical_weather_outlook',
  issued_at: '2025-07-29T08:00:00-04:00',
  forecaster: 'Johnathan Pryce',
  contact: {
    email: 'meteorology@gaa.gd',
    telephones: ['+1-473-444-4142', '+1-473-444-4101'],
    fax: '+1-473-444-1574',
  },
  area_of_interest: '10–20° N, 40–65° W',
  synopsis:
    'A central Atlantic tropical wave along 40° W, south of 18° N, is moving west at ~5 kt. A 1012 mb low near 10° N 37° W has fresh-to-strong winds within 120 nm of the centre. Scattered moderate convection noted between 38°–41° W.',
  cyclone_activity_48h: 'Not expected',
  next_update: '2025-07-29T14:00:00-04:00',
} as const;

export type TropWxOutlook = typeof tropWxOutlook;