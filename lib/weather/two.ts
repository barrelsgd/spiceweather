/**
 * 𝗧𝗿𝗼𝗽𝗶𝗰𝗮𝗹 𝗪𝗲𝗮𝘁𝗵𝗲𝗿 𝗢𝘂𝘁𝗹𝗼𝗼𝗸 – 08 am 29 Jul 2025
 */
export const tropWxOutlook = {
  report_type: "tropical_weather_outlook",
  issued_at: "2025-07-29T08:00:00-04:00",
  forecaster: "Johnathan Pryce",
  contact: {
    email: "meteorology@gaa.gd",
    telephones: ["+1-473-444-4142", "+1-473-444-4101"],
    fax: "+1-473-444-1574",
  },
  area_of_interest: "10–20° N, 40–65° W",
  synopsis:
    "A central Atlantic tropical wave along 40° W, south of 18° N, is moving west at ~5 kt. A 1012 mb low near 10° N 37° W has fresh-to-strong winds within 120 nm of the centre. Scattered moderate convection noted between 38°–41° W.",
  cyclone_activity_48h: "Not expected",
  next_update: "2025-07-29T14:00:00-04:00",
} as const;

export const tropWxOutlook2 = {
  rssVersion: "2.0",
  channel: {
    selfLink: {
      href: "https://www.nhc.noaa.gov/gtwo.xml",
      rel: "self",
      type: "application/rss+xml",
    },
    pubDate: "Fri, 15 Aug 2025 02:44:06 UTC",
    lastBuildDate: "Fri, 15 Aug 2025 02:44:06 UTC",
    title: "National Hurricane Center Graphical Tropical Weather Outlooks",
    description:
      "National Hurricane Center Graphical Tropical Weather Outlooks",
    link: "https://www.nhc.noaa.gov/",
    copyright: "none",
    managingEditor: "nhcwebmaster@noaa.gov (NHC Webmaster)",
    language: "en-us",
    webMaster: "nhcwebmaster@noaa.gov (NHC Webmaster)",
    image: {
      url: "https://www.nhc.noaa.gov/images/xml_logo_nhc.gif",
      link: "https://www.nhc.noaa.gov/",
      title: "National Hurricane Center Graphical Tropical Weather Outlooks",
      description: "NOAA logo",
      width: 95,
      height: 45,
    },
    items: [
      {
        title: "NHC Atlantic Outlook",
        pubDate: "Thu, 14 Aug 2025 23:54:15 UTC",
        link: "https://www.nhc.noaa.gov/gtwo.php?basin=atlc",
        guid: "https://www.nhc.noaa.gov/gtwo.php?basin=atlc&202508142354",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        descriptionHtml:
          '<br /><a href="https://www.nhc.noaa.gov/gtwo.php?basin=atlc&amp;fdays=2"> <img src="https://www.nhc.noaa.gov/xgtwo/resize/two_atl_2d0_resize.gif" alt="Atlantic 2-Day Graphical Outlook Image" width="400" height="326" /></a> <br /><a href="https://www.nhc.noaa.gov/gtwo.php?basin=atlc&amp;fdays=7"> <img src="https://www.nhc.noaa.gov/xgtwo/resize/two_atl_7d0_resize.gif" alt="Atlantic 7-Day Graphical Outlook Image" width="400" height="326" /></a> <br /><br /> <div class=\'textbackground\'><div class=\'textproduct\'><br /> ZCZC MIATWOAT ALL<br>TTAA00 KNHC DDHHMM<br><br>Tropical Weather Outlook<br>NWS National Hurricane Center Miami FL<br>800 PM EDT Thu Aug 14 2025<br><br>For the North Atlantic...Caribbean Sea and the Gulf of America:<br><br>Active Systems:<br>The National Hurricane Center is issuing advisories on Tropical <br>Storm Erin, located several hundred miles east of the northern <br>Leeward Islands.<br><br>1. Southwestern Gulf (AL98):<br>Recent geostationary and microwave satellite imagery indicates that <br>shower and thunderstorm activity is showing some signs of <br>organization with a small area of low pressure located over the <br>southwestern Gulf. An earlier Air Force reconnaissance mission found <br>that the system lacks a well-defined low-level circulation. The low <br>is forecast to move west-northwestward to northwestward across the <br>western Gulf during the next day or so, and environmental conditions <br>appear generally favorable for further development. A tropical <br>depression could form before this system moves inland over <br>northeastern Mexico or southern Texas by late Friday. Regardless of <br>development, locally heavy rainfall is possible along portions of <br>northeastern Mexico and southern Texas over the next few days. <br>Another Air Force Reserve Hurricane Hunter aircraft is scheduled to <br>investigate the system Friday morning.<br>* Formation chance through 48 hours...medium...50 percent.<br>* Formation chance through 7 days...medium...50 percent.<br><br><br><br>Forecaster Hagen/Papin<br><br></div></div><br />',
        outlookGraphics: {
          twoDayImage:
            "https://www.nhc.noaa.gov/xgtwo/resize/two_atl_2d0_resize.gif",
          sevenDayImage:
            "https://www.nhc.noaa.gov/xgtwo/resize/two_atl_7d0_resize.gif",
          twoDayPage: "https://www.nhc.noaa.gov/gtwo.php?basin=atlc&fdays=2",
          sevenDayPage: "https://www.nhc.noaa.gov/gtwo.php?basin=atlc&fdays=7",
        },
      },
      {
        title: "NHC Eastern North Pacific Outlook",
        pubDate: "Thu, 14 Aug 2025 23:03:12 UTC",
        link: "https://www.nhc.noaa.gov/gtwo.php?basin=epac",
        guid: "https://www.nhc.noaa.gov/gtwo.php?basin=epac&202508142303",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        descriptionHtml:
          '<br /><a href="https://www.nhc.noaa.gov/gtwo.php?basin=epac&amp;fdays=2"> <img src="https://www.nhc.noaa.gov/xgtwo/resize/two_pac_2d0_resize.gif" alt="Eastern North Pacific 2-Day Graphical Outlook Image" width="400" height="326" /></a> <br /><a href="https://www.nhc.noaa.gov/gtwo.php?basin=epac&amp;fdays=7"> <img src="https://www.nhc.noaa.gov/xgtwo/resize/two_pac_7d0_resize.gif" alt="Eastern North Pacific 7-Day Graphical Outlook Image" width="400" height="326" /></a> <br /><br /> <div class=\'textbackground\'><div class=\'textproduct\'><br /> ZCZC MIATWOEP ALL<br>TTAA00 KNHC DDHHMM<br><br>Tropical Weather Outlook<br>NWS National Hurricane Center Miami FL<br>500 PM PDT Thu Aug 14 2025<br><br>For the eastern and central North Pacific east of 180 longitude:<br><br>Tropical cyclone formation is not expected during the next 7 days.<br><br>$$<br>Forecaster Gibbs<br>NNNN<br><br></div></div><br />',
        outlookGraphics: {
          twoDayImage:
            "https://www.nhc.noaa.gov/xgtwo/resize/two_pac_2d0_resize.gif",
          sevenDayImage:
            "https://www.nhc.noaa.gov/xgtwo/resize/two_pac_7d0_resize.gif",
          twoDayPage: "https://www.nhc.noaa.gov/gtwo.php?basin=epac&fdays=2",
          sevenDayPage: "https://www.nhc.noaa.gov/gtwo.php?basin=epac&fdays=7",
        },
      },
      {
        title: "CPHC Central North Pacific Outlook",
        pubDate: "Thu, 14 Aug 2025 23:03:28 UTC",
        link: "https://www.nhc.noaa.gov/gtwo.php?basin=cpac",
        guid: "https://www.nhc.noaa.gov/gtwo.php?basin=cpac&202508142303",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        descriptionHtml:
          '<br /><a href="https://www.nhc.noaa.gov/gtwo.php?basin=cpac&amp;fdays=2"> <img src="https://www.nhc.noaa.gov/xgtwo/resize/two_cpac_2d0_resize.gif" alt="Central North Pacific 2-Day Graphical Outlook Image" width="400" height="326" /></a> <br /><a href="https://www.nhc.noaa.gov/gtwo.php?basin=cpac&amp;fdays=7"> <img src="https://www.nhc.noaa.gov/xgtwo/resize/two_cpac_7d0_resize.gif" alt="Central North Pacific 7-Day Graphical Outlook Image" width="400" height="326" /></a> <br /><br /> <div class=\'textbackground\'><div class=\'textproduct\'><br /> ZCZC HFOTWOCP ALL<br>TTAA00 PHFO DDHHMM<br><br>Tropical Weather Outlook<br>NWS Central Pacific Hurricane Center Honolulu HI<br>Issued by NWS National Hurricane Center Miami FL<br>200 PM HST Thu Aug 14 2025<br><br>For the central North Pacific...between 140W and 180W:<br><br>Tropical cyclone formation is not expected during the next 7 days.<br><br>$$<br>Forecaster Gibbs<br>NNNN<br><br></div></div><br />',
        outlookGraphics: {
          twoDayImage:
            "https://www.nhc.noaa.gov/xgtwo/resize/two_cpac_2d0_resize.gif",
          sevenDayImage:
            "https://www.nhc.noaa.gov/xgtwo/resize/two_cpac_7d0_resize.gif",
          twoDayPage: "https://www.nhc.noaa.gov/gtwo.php?basin=cpac&fdays=2",
          sevenDayPage: "https://www.nhc.noaa.gov/gtwo.php?basin=cpac&fdays=7",
        },
      },
    ],
  },
};

export const tropWxOutlook3 = {
  rssVersion: "2.0",
  channel: {
    pubDate: "Fri, 15 Aug 2025 02:44:06 GMT",
    title: "NHC Atlantic",
    description:
      "Active tropical cyclones in the Atlantic, Caribbean, and the Gulf of America",
    link: "https://www.nhc.noaa.gov/",
    copyright: "none",
    managingEditor: "nhcwebmaster@noaa.gov (NHC Webmaster)",
    language: "en-us",
    webMaster: "nhcwebmaster@noaa.gov (NHC Webmaster)",
    image: {
      url: "https://www.nhc.noaa.gov/gifs/xml_logo_nhc.gif",
      link: "https://www.nhc.noaa.gov/",
      title: "NHC Atlantic",
      description: "NOAA logo",
      width: 95,
      height: 45,
    },
    items: [
      {
        title: "Atlantic Tropical Weather Outlook",
        pubDate: "Thu, 14 Aug 2025 23:54:01 GMT",
        link: "https://www.nhc.noaa.gov/gtwo.php?basin=atlc",
        guid: "https://www.nhc.noaa.gov/gtwo.php?basin=atlc&202508142354",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        descriptionHtml:
          "000<br />ABNT20 KNHC 142353<br />TWOAT <br /><br />Tropical Weather Outlook<br />NWS National Hurricane Center Miami FL<br />800 PM EDT Thu Aug 14 2025<br /><br />For the North Atlantic...Caribbean Sea and the Gulf of America:<br /><br />Active Systems:<br />The National Hurricane Center is issuing advisories on Tropical <br />Storm Erin, located several hundred miles east of the northern <br />Leeward Islands.<br /><br />Southwestern Gulf (AL98):<br />Recent geostationary and microwave satellite imagery indicates that <br />shower and thunderstorm activity is showing some signs of <br />organization with a small area of low pressure located over the <br />southwestern Gulf. An earlier Air Force reconnaissance mission found <br />that the system lacks a well-defined low-level circulation. The low <br />is forecast to move west-northwestward to northwestward across the <br />western Gulf during the next day or so, and environmental conditions <br />appear generally favorable for further development. A tropical <br />depression could form before this system moves inland over <br />northeastern Mexico or southern Texas by late Friday. Regardless of <br />development, locally heavy rainfall is possible along portions of <br />northeastern Mexico and southern Texas over the next few days. <br />Another Air Force Reserve Hurricane Hunter aircraft is scheduled to <br />investigate the system Friday morning.<br />* Formation chance through 48 hours...medium...50 percent.<br />* Formation chance through 7 days...medium...50 percent.<br /><br />$$<br />Forecaster Hagen/Papin",
      },
      {
        title: "Summary for Tropical Storm Erin (AT5/AL052025)",
        pubDate: "Thu, 14 Aug 2025 23:53:00 GMT",
        link: "https://www.nhc.noaa.gov/text/refresh/MIATCPAT5+shtml/142352.shtml",
        guid: "summary-al052025-202508142353",
        guidIsPermaLink: false,
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        descriptionText:
          "...NOAA AIRCRAFT DATA INDICATES THAT ERIN IS NEAR HURRICANE STRENGTH... As of 8:00 PM AST Thu Aug 14 the center of Erin was located near 16.9, -51.9 with movement W at 17 mph. The minimum central pressure was 999 mb with maximum sustained winds of about 70 mph.",
        cyclone: {
          center: "16.9, -51.9",
          type: "Tropical Storm",
          name: "Erin",
          wallet: "AT5",
          atcf: "AL052025",
          datetimeLocal: "8:00 PM AST Thu Aug 14",
          movement: "W at 17 mph",
          pressure: "999 mb",
          wind: "70 mph",
          headline:
            "...NOAA AIRCRAFT DATA INDICATES THAT ERIN IS NEAR HURRICANE STRENGTH...",
        },
      },
      {
        title: "Tropical Storm Erin Public Advisory Number 14a",
        pubDate: "Thu, 14 Aug 2025 23:53:00 GMT",
        link: "https://www.nhc.noaa.gov/text/refresh/MIATCPAT5+shtml/142352.shtml",
        guid: "https://www.nhc.noaa.gov/text/refresh/MIATCPAT5+shtml/142352.shtml",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        issuedLine: "Issued at 800 PM AST Thu Aug 14 2025",
        descriptionHtml:
          "<pre>000 WTNT35 KNHC 142352 TCPAT5 BULLETIN Tropical Storm Erin Intermediate Advisory Number 14A NWS National Hurricane Center Miami FL AL052025 800 PM AST Thu Aug 14 2025 ...NOAA AIRCRAFT DATA INDICATES THAT ERIN IS NEAR HURRICANE STRENGTH... SUMMARY OF 800 PM AST...0000 UTC...INFORMATION ---------------------------------------------- LOCATION...16.9N 51.9W ABOUT 745 MI...1195 KM E OF THE NORTHERN LEEWARD ISLANDS MAXIMUM SUSTAINED WINDS...70 MPH...110 KM/H PRESENT MOVEMENT...W OR 280 DEGREES AT 17 MPH...28 KM/H MINIMUM CENTRAL PRESSURE...999 MB...29.50 INCHES WATCHES AND WARNINGS -------------------- CHANGES WITH THIS ADVISORY: None. SUMMARY OF WATCHES AND WARNINGS IN EFFECT: A Tropical Storm Watch is in effect for... * Anguilla and Barbuda * St. Martin and St. Barthelemy * Saba and St. Eustatius * Sint Maarten A Tropical Storm Watch means that tropical storm conditions are possible within the watch area, generally within 48 hours. Interests elsewhere in the northern Leeward Islands, Virgin Islands, and Puerto Rico should monitor the progress of Erin. For storm information specific to your area, please monitor products issued by your national meteorological service. DISCUSSION AND OUTLOOK ---------------------- At 800 PM AST (0000 UTC), the center of Tropical Storm Erin was located near latitude 16.9 North, longitude 51.9 West. Erin is moving toward the west near 17 mph (28 km/h). A turn toward the west-northwest is expected tonight, with this motion expected to continue into the weekend. On the forecast track, the center of Erin is likely to move near or just north of the northern Leeward Islands over the weekend. NOAA aircraft data indicates that maximum sustained winds have increased to near 70 mph (110 km/h) with higher gusts. Additional strengthening is forecast during the next few days and Erin is expected to soon become a hurricane and could become a major hurricane by the end of this weekend. Tropical-storm-force winds extend outward up to 60 miles (95 km) from the center. The minimum central pressure estimated by NOAA Hurricane Hunter dropsonde data is 999 mb (29.50 inches). HAZARDS AFFECTING LAND ---------------------- Key messages for Erin can be found in the Tropical Cyclone Discussion under AWIPS header MIATCDAT5 and WMO header WTNT45 KNHC. RAINFALL: Tropical Storm Erin is expected to produce areas of heavy rainfall beginning late Friday and continuing through the weekend across the northernmost Leeward Islands, the U.S. and British Virgin Islands, as well as southern and eastern Puerto Rico. Rainfall totals of 2 to 4 inches, with isolated totals of 6 inches, are expected. This rainfall may lead to isolated flash and urban flooding, along with landslides or mudslides. For a complete depiction of forecast rainfall and flash flooding associated with Tropical Storm Erin, please see the National Weather Service Storm Total Rainfall Graphic, available at hurricanes.gov/graphics_at5.shtml?rainqpf WIND: Tropical storm conditions are possible within the watch area by early Saturday. SURF: Swells generated by Erin will begin affecting portions of the northern Leeward Islands, the Virgin Islands and Puerto Rico by this weekend. These swells are likely to cause life-threatening surf and rip current conditions. Please consult products from your local weather forecast office. A depiction of rip current risk for the United States can be found at: hurricanes.gov/graphics_at5.shtml?ripCurrents NEXT ADVISORY ------------- Next complete advisory at 1100 PM AST. $$ Forecaster Papin</pre>",
      },
      {
        title: "Tropical Storm Erin Forecast Advisory Number 15",
        pubDate: "Fri, 15 Aug 2025 02:43:59 GMT",
        link: "https://www.nhc.noaa.gov/text/refresh/MIATCMAT5+shtml/150243.shtml",
        guid: "https://www.nhc.noaa.gov/text/refresh/MIATCMAT5+shtml/150243.shtml",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        issuedLine: "Issued at 0300 UTC FRI AUG 15 2025",
        descriptionHtml:
          "<pre>000 WTNT25 KNHC 150243 TCMAT5 TROPICAL STORM ERIN FORECAST/ADVISORY NUMBER 15 NWS NATIONAL HURRICANE CENTER MIAMI FL AL052025 0300 UTC FRI AUG 15 2025 TROPICAL STORM CENTER LOCATED NEAR 17.1N 52.7W AT 15/0300Z POSITION ACCURATE WITHIN 25 NM PRESENT MOVEMENT TOWARD THE WEST-NORTHWEST OR 285 DEGREES AT 15 KT ESTIMATED MINIMUM CENTRAL PRESSURE 998 MB MAX SUSTAINED WINDS 60 KT WITH GUSTS TO 75 KT. 50 KT....... 20NE 15SE 0SW 0NW. 34 KT....... 60NE 40SE 20SW 50NW. 4 M SEAS....120NE 30SE 0SW 60NW. ... NEXT ADVISORY AT 15/0900Z $$ FORECASTER PAPIN</pre>",
      },
      {
        title: "Tropical Storm Erin Forecast Discussion Number 14",
        pubDate: "Thu, 14 Aug 2025 20:45:14 GMT",
        link: "https://www.nhc.noaa.gov/text/refresh/MIATCDAT5+shtml/142044.shtml",
        guid: "https://www.nhc.noaa.gov/text/refresh/MIATCDAT5+shtml/142044.shtml",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        issuedLine: "Issued at 500 PM AST Thu Aug 14 2025",
        descriptionHtml:
          "<pre>267 WTNT45 KNHC 142044 TCDAT5 Tropical Storm Erin Discussion Number 14 ... $$ Forecaster Beven</pre>",
      },
      {
        title: "Tropical Storm Erin Wind Speed Probabilities Number 14",
        pubDate: "Thu, 14 Aug 2025 20:47:02 GMT",
        link: "https://www.nhc.noaa.gov/text/refresh/MIAPWSAT5+shtml/142045.shtml",
        guid: "https://www.nhc.noaa.gov/text/refresh/MIAPWSAT5+shtml/142045.shtml",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        issuedLine: "Issued at 2100 UTC THU AUG 14 2025",
        descriptionHtml:
          "<pre>379 FONT15 KNHC 142045 PWSAT5 TROPICAL STORM ERIN WIND SPEED PROBABILITIES NUMBER 14 ... $$ FORECASTER BEVEN</pre>",
      },
      {
        title: "Tropical Storm Erin Graphics",
        pubDate: "Thu, 14 Aug 2025 23:53:25 GMT",
        link: "https://www.nhc.noaa.gov/refresh/graphics_at5+shtml/235325.shtml?cone",
        guid: "https://www.nhc.noaa.gov/refresh/graphics_at5+shtml/235325.shtml?cone",
        author: "nhcwebmaster@noaa.gov (NHC Webmaster)",
        descriptionHtml:
          '<a href="https://www.nhc.noaa.gov/refresh/graphics_at5+shtml/235325.shtml?cone"> <img src="https://www.nhc.noaa.gov/storm_graphics/AT05/AL052025_5day_cone_with_line_and_wind_sm2.png" alt="Tropical Storm Erin 5-Day Uncertainty Track Image" width="500" height="400" /></a> <br />5-Day Uncertainty Track last updated Thu, 14 Aug 2025 23:53:12 GMT <br /> <br /><a href="https://www.nhc.noaa.gov/refresh/graphics_at5+shtml/235325.shtml?tswind120"> <img src="https://www.nhc.noaa.gov/storm_graphics/AT05/AL052025_wind_probs_34_F120_sm2.png" alt="Tropical Storm Erin 34-Knot Wind Speed Probabilities" width="500" height="400" /> </a> <br />Wind Speed Probabilities last updated Thu, 14 Aug 2025 21:21:41 GMT',
        graphics: {
          conePage:
            "https://www.nhc.noaa.gov/refresh/graphics_at5+shtml/235325.shtml?cone",
          coneImage:
            "https://www.nhc.noaa.gov/storm_graphics/AT05/AL052025_5day_cone_with_line_and_wind_sm2.png",
          windProbsPage:
            "https://www.nhc.noaa.gov/refresh/graphics_at5+shtml/235325.shtml?tswind120",
          windProbsImage:
            "https://www.nhc.noaa.gov/storm_graphics/AT05/AL052025_wind_probs_34_F120_sm2.png",
          coneUpdated: "Thu, 14 Aug 2025 23:53:12 GMT",
          windProbsUpdated: "Thu, 14 Aug 2025 21:21:41 GMT",
        },
      },
    ],
  },
};

export type TropWxOutlook = typeof tropWxOutlook;
export type TropWxOutlook2 = typeof tropWxOutlook2;
export type TropWxOutlook3 = typeof tropWxOutlook3;
