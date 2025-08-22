"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDown,
  PieChart,
  Plug,
  Plane,
  CloudSun,
  Database,
  Map,
  Megaphone,
  BookOpen,
  AlertTriangle,
  Wrench,
  Calendar as CalendarIcon,
  Users,
  LifeBuoy,
  ClipboardList,
} from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

// Narrow menu type to match each top-level group constant
type MenuType =
  | "main"
  | "aviation"
  | "publicWeather"
  | "sectoralProducts"
  | "dataObservationsClimatology"
  | "modeling"
  | "visualizationGis"
  | "assetsInstrumentation"
  | "communicationDissemination"
  | "knowledgeDocumentation"
  | "resources";

const adminNavItems: NavItem[] = [
  {
    icon: <CalendarIcon />,
    name: "Calendar",
    path: "/admin/calendar",
  },
  {
    icon: <Users />,
    name: "Roster",
    path: "/admin/hrd/roster",
  },
  {
    icon: <LifeBuoy />,
    name: "Support Desk",
    path: "/admin/support",
  },
  {
    name: "HR Forms",
    icon: <ClipboardList />,
    subItems: [
      {
        name: "Daily Status Report",
        path: "/admin/hrd/dailystatus",
        pro: false,
      },
      { name: "Leave Form", path: "/admin/hrd/leaves", pro: false },
      { name: "Absentee Report", path: "/admin/hrd/abscent", pro: false },
      { name: "Shift Exchange", path: "/admin/hrd/exchanges", pro: false },
      { name: "Parking Access", path: "/admin/hrd/parking", pro: false },
      { name: "Time Sheet", path: "/admin/hrd/timesheet", pro: false },
    ],
  },
];

const ResourceItems: NavItem[] = [
  {
    name: "Alerts",
    icon: <AlertTriangle />,
    subItems: [
      {
        name: "Common Alerting Protocol",
        path: "/admin/alerts/cap",
        pro: false,
      },
      {
        name: "Impact-Based Forecasts",
        path: "/admin/alerts/ibf",
        pro: false,
      },
      {
        name: "Warnings & Advisories",
        path: "/admin/alerts/warnings",
        pro: false,
      },
      {
        name: "Tropical Cyclone Advisories",
        path: "/admin/alerts/tc",
        pro: false,
      },
      {
        name: "Tsunami Warnings",
        path: "/admin/alerts/tsunami",
        pro: false,
      },
      {
        name: "Volcano Alerts",
        path: "/admin/alerts/volcano",
        pro: false,
      },
      {
        name: "Warning & Impact Maps",
        path: "/admin/alerts/impact-maps",
        pro: false,
      },
    ],
  },
];

const publicWeatherNavItems: NavItem[] = [
  {
    name: "Public Weather",
    icon: <CloudSun />,
    subItems: [
      {
        name: "Morning Forecast",
        path: "/admin/public-weather/morning",
        pro: false,
      },
      {
        name: "Midday Forecast",
        path: "/admin/public-weather/midday",
        pro: false,
      },
      {
        name: "Evening Forecast",
        path: "/admin/public-weather/evening",
        pro: false,
      },
      {
        name: "Marine Bulletin",
        path: "/admin/public-weather/marine-bulletin",
        pro: false,
      },
      {
        name: "Tropical Weather Outlook",
        path: "/admin/public-weather/two",
        pro: false,
      },
      {
        name: "Verification & Model Monitoring",
        path: "/admin/public-weather/verification",
        pro: false,
      },
    ],
  },
];

const aviationMeteorologyNavItems: NavItem[] = [
  {
    name: "Aviation",
    icon: <Plane />,
    subItems: [
      { name: "METAR/SPECI", path: "/admin/aviation/metar", pro: false },
      { name: "TAF", path: "/admin/aviation/taf", pro: false },
      {
        name: "TAF Verification",
        path: "/admin/aviation/taf-verification",
        pro: false,
      },
      { name: "SIGMET", path: "/admin/aviation/sigmet", pro: false },
      {
        name: "Wind Shear",
        path: "/admin/aviation/wind-shear",
        pro: false,
      },
      {
        name: "Pilot Briefings",
        path: "/admin/aviation/pilot-briefings",
        pro: false,
      },
      {
        name: "ATS/MET Transmission",
        path: "/admin/aviation/ats-met-transmission",
        pro: false,
      },
      { name: "Aviation Maps", path: "/admin/aviation/maps", pro: false },
    ],
  },
];

const sectoralProductsNavItems: NavItem[] = [
  {
    name: "Sectoral Products",
    icon: <PieChart />,
    subItems: [
      {
        name: "Health Index",
        path: "/admin/sectoral/health-index",
        pro: false,
      },
      {
        name: "AgroBulletin",
        path: "/admin/sectoral/agro-bulletin",
        pro: false,
      },
      {
        name: "Hydrology (NAWASA)",
        path: "/admin/sectoral/hydrology",
        pro: false,
      },
      {
        name: "Air Quality Index",
        path: "/admin/sectoral/aqi",
        pro: false,
      },
      {
        name: "Disaster Risk Reduction Reports",
        path: "/admin/sectoral/drr-reports",
        pro: false,
      },
      {
        name: "Media Briefings",
        path: "/admin/sectoral/media-briefings",
        pro: false,
      },
    ],
  },
];

const dataObservationsClimatologyNavItems: NavItem[] = [
  {
    name: "Data & Climatology",
    icon: <Database />,
    subItems: [
      {
        name: "Geonetcast / Satellite Data",
        path: "/admin/data/geonetcast",
        pro: false,
      },
      {
        name: "Central Meteorological Database",
        path: "/admin/data/cmd",
        pro: false,
      },
      {
        name: "BUFR & WMO Codes (eRegister)",
        path: "/admin/data/wmo-bufr",
        pro: false,
      },
      {
        name: "Monthly Climate Bulletin",
        path: "/admin/data/monthly-bulletin",
        pro: false,
      },
      {
        name: "Local Archives & Storage",
        path: "/admin/data/archives",
        pro: false,
      },
    ],
  },
];

const modelingNavItems: NavItem[] = [
  {
    name: "Modeling",
    icon: <Plug />,
    subItems: [
      {
        name: "NWP & Ensemble Integration",
        path: "/admin/modeling/nwp-ensemble",
        pro: false,
      },
      {
        name: "Radar-Based Nowcasting",
        path: "/admin/modeling/nowcasting",
        pro: false,
      },
      {
        name: "Lightning/Thunderstorm Prediction",
        path: "/admin/modeling/lightning",
        pro: false,
      },
      {
        name: "Seasonal Outlooks & Drought Modeling",
        path: "/admin/modeling/seasonal",
        pro: false,
      },
      {
        name: "Severe Event Detection (Flood, Heatwave, etc.)",
        path: "/admin/modeling/severe-events",
        pro: false,
      },
    ],
  },
];

const visualizationGisNavItems: NavItem[] = [
  {
    name: "Visualization & GIS",
    icon: <Map />,
    subItems: [
      {
        name: "GIS & QGIS Tools",
        path: "/admin/visualisation/qgis",
        pro: false,
      },
      {
        name: "Weather Element Maps",
        path: "/admin/visualisation/weather-maps",
        pro: false,
      },
      {
        name: "Aviation Maps",
        path: "/admin/visualisation/aviation-maps",
        pro: false,
      },
      {
        name: "Warning & Impact Maps",
        path: "/admin/visualisation/warning-maps",
        pro: false,
      },
    ],
  },
];

const assetsInstrumentationNavItems: NavItem[] = [
  {
    name: "Instrumentation",
    icon: <Wrench />,
    subItems: [
      {
        name: "Automatic Weather Stations",
        path: "/admin/instruments/aws",
        pro: false,
      },
      {
        name: "Digital Instrument Inventory",
        path: "/admin/instruments/inventory",
        pro: false,
      },
    ],
  },
];

const communicationDisseminationNavItems: NavItem[] = [
  {
    name: "Media",
    icon: <Megaphone />,
    subItems: [
      { name: "Website (SpiceWeather)", path: "/", pro: false },
      {
        name: "Mobile Application",
        path: "/admin/media/mobile",
        pro: false,
      },
      {
        name: "Social Media Portal",
        path: "/admin/media/social",
        pro: false,
      },
      {
        name: "NaDMA Data Sharing Interface",
        path: "/admin/media/nadma",
        pro: false,
      },
    ],
  },
];

const knowledgeDocumentationNavItems: NavItem[] = [
  {
    name: "Resources",
    icon: <BookOpen />,
    subItems: [
      { name: "Wiki", path: "/admin/resources/wiki", pro: false },
      {
        name: "Technical Documentation",
        path: "/admin/resources/docs",
        pro: false,
      },
      {
        name: "Training Material",
        path: "/admin/resources/training",
        pro: false,
      },
    ],
  },
];

const othersNavItems: NavItem[] = [
  ...aviationMeteorologyNavItems,
  ...publicWeatherNavItems,
  ...sectoralProductsNavItems,
  ...dataObservationsClimatologyNavItems,
  ...modelingNavItems,
  ...visualizationGisNavItems,
  ...assetsInstrumentationNavItems,
  ...communicationDisseminationNavItems,
  ...knowledgeDocumentationNavItems,
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (adminNavItems: NavItem[], menuType: MenuType) => (
    <ul className="flex flex-col gap-4">
      {adminNavItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group  ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
              type="button"
            >
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge `}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: MenuType;
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    const groups: { type: MenuType; items: NavItem[] }[] = [
      { type: "main", items: adminNavItems },
      { type: "resources", items: ResourceItems },
      { type: "aviation", items: aviationMeteorologyNavItems },
      { type: "publicWeather", items: publicWeatherNavItems },
      { type: "sectoralProducts", items: sectoralProductsNavItems },
      {
        type: "dataObservationsClimatology",
        items: dataObservationsClimatologyNavItems,
      },
      { type: "modeling", items: modelingNavItems },
      { type: "visualizationGis", items: visualizationGisNavItems },
      { type: "assetsInstrumentation", items: assetsInstrumentationNavItems },
      {
        type: "communicationDissemination",
        items: communicationDisseminationNavItems,
      },
      { type: "knowledgeDocumentation", items: knowledgeDocumentationNavItems },
    ];
    groups.forEach(({ type, items }) => {
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type, index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: MenuType) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-background text-foreground h-screen transition-all duration-300 ease-in-out z-50 border-r border-border 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col">
            <div>{renderMenuItems(adminNavItems, "main")}</div>
            <div className="my-3 border-t border-border" aria-hidden="true" />
            <div className="">
              {renderMenuItems(ResourceItems, "resources")}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(aviationMeteorologyNavItems, "aviation")}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(publicWeatherNavItems, "publicWeather")}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(sectoralProductsNavItems, "sectoralProducts")}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(
                dataObservationsClimatologyNavItems,
                "dataObservationsClimatology"
              )}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(modelingNavItems, "modeling")}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(visualizationGisNavItems, "visualizationGis")}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(
                assetsInstrumentationNavItems,
                "assetsInstrumentation"
              )}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(
                communicationDisseminationNavItems,
                "communicationDissemination"
              )}
            </div>
            <div className="my-3 border-t border-border" aria-hidden="true" />

            <div className="">
              {renderMenuItems(
                knowledgeDocumentationNavItems,
                "knowledgeDocumentation"
              )}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
