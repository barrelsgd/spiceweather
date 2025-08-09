export const wxfcsts = {
  morning: {
    edition: 'morning',
    report_date: '2025-07-29',
    forecaster: 'Johnathan Pryce',
    astronomy: { sunset_today: '18:34', sunrise_tomorrow: '05:53' },
    forecast: {
      valid_from: '06:00',
      valid_to: '06:00',
      overview:
        'Generally fair, with brief, isolated morning and night-time showers during partly cloudy spells.',
      warning: 'None',
    },
    marine: {
      wind: 'ENE to ESE 12 - 22 mph, becoming variable to calm overnight',
      seas: 'Moderate; waves 4 - 6 ft in open waters',
    },
    temperature: { max_c: 32.0 },
    tides: { low_time: '13:00', high_time: '19:00' }, // 24-h
    contact: {
      email: 'meteorology@gaa.gd',
      telephones: ['+1-473-444-4142', '+1-473-444-4101'],
      fax: '+1-473-444-1574',
      website: 'https://www.weather.gaa.gd',
    },
  },

  /** 12 pm bulletin */
  midday: {
    edition: 'midday',
    report_date: '2025-07-29',
    forecaster: 'Johnathan Pryce',
    astronomy: { sunset_today: '18:34', sunrise_tomorrow: '05:53' },
    forecast: {
      valid_from: '12:00',
      valid_to: '06:00',
      overview:
        'Generally fair with isolated showers overnight during partly cloudy spells.',
      warning: 'None',
    },
    marine: {
      wind: 'ENE to ESE 12- 22 mph, becoming variable to calm overnight',
      seas: 'Slight to moderate; waves 3 - 5 ft in open waters',
    },
    temperature: { max_c: 30.1 },
    tides: { low_time: '00:30', high_time: '18:30' },
    contact: {
      email: 'meteorology@gaa.gd',
      telephones: ['+1-473-444-4142', '+1-473-444-4101'],
      fax: '+1-473-444-1574',
      website: 'https://www.weather.gaa.gd',
    },
  },

  /** 06 pm + 3-day outlook bulletin */
  evening: {
    edition: 'evening',
    report_date: '2025-07-29',
    forecaster: 'Andre Charles',
    astronomy: { sunset_today: '18:33', sunrise_tomorrow: '05:53' },
    forecast: {
      valid_from: '18:00',
      valid_to: '06:00',
      overview: 'Partly cloudy with occasional light to moderate showers.',
      warning: 'None',
    },
    marine: {
      wind: 'E to ESE 10 - 20 mph',
      seas: 'Moderate; waves 4 - 6 ft in open waters',
    },
    temperature: { max_c: 32.0, min_c: 24.5 },
    tides: { low_time: '13:45', high_time: '06:45'}, // first high/low pair
    outlook: {
      thursday: {
        date: '2025-07-31',
        overview:
          'Generally fair, becoming partly cloudy overnight with isolated showers.',
        temperature: { max_c: 32.0, min_c: 23.5 },
        marine: {
          wind: 'E to SE 10 - 20 mph',
          seas: 'Moderate; waves ≤ 6 ft',
        },
      },
      friday: {
        date: '2025-08-01',
        overview:
          'Partly cloudy early with isolated morning showers, becoming fair as the day progresses.',
        temperature: { max_c: 32.0, min_c: 24.5 },
        marine: {
          wind: 'ENE to ESE 10 - 20 mph',
          seas: 'Moderate; waves ≤ 6 ft',
        },
      },
    },
    contact: {
      email: 'meteorology@gaa.gd',
      telephones: ['+1-473-444-4142', '+1-473-444-4101'],
      fax: '+1-473-444-1574',
      website: 'https://www.weather.gaa.gd',
    },
  },
} as const;


// Inferred types for convenient reuse
export type WxForecasts = typeof wxfcsts;


