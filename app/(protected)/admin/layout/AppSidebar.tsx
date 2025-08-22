"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import { Calendar, ChevronDown, Ellipsis, List, FileText } from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  // Quick access also available in header, but included here for completeness
  { icon: <Calendar />, name: "Calendar", path: "/admin/calendar" },
  { icon: <Calendar />, name: "Roster", path: "/admin/hrd/roster" },
  { icon: <FileText />, name: "Tickets", path: "/admin/tickets" },
  {
    name: "Administration",
    icon: <FileText />,
    subItems: [
      { name: "Users & Roles", path: "/error-404" },
      { name: "Permissions", path: "/error-404" },
      { name: "Settings", path: "/error-404" },
    ],
  },
  {
    name: "Forms",
    icon: <List />,
    subItems: [
      { name: "Daily Status Report", path: "/admin/hrd/dailystatus" },
      { name: "Leave Form", path: "/admin/hrd/leaves" },
      { name: "Absentee Report", path: "/admin/hrd/abscent" },
      { name: "Shift Exchange", path: "/admin/hrd/exchanges" },
      { name: "Parking Access", path: "/admin/hrd/parking" },
      { name: "Time Sheet", path: "/admin/hrd/timesheet" },
    ],
  },
  {
    name: "Alerts & Early Warning",
    icon: <FileText />,
    subItems: [
      { name: "Common Alerting Protocol (CAP)", path: "/error-404" },
      { name: "Impact-Based Forecasts", path: "/error-404" },
      { name: "Warnings & Advisories", path: "/error-404" },
      { name: "Tropical Cyclone Advisories", path: "/error-404" },
      { name: "Warning & Impact Map", path: "/error-404" },
    ],
  },
  {
    name: "Aviation Services",
    icon: <FileText />,
    subItems: [
      { name: "ATS/MET Transmission", path: "/error-404" },
      { name: "METAR/SPECI", path: "/blank" },
      { name: "TAF", path: "/error-404" },
      { name: "TAF Verification", path: "/error-404" },
      { name: "Wind Shear", path: "/error-404" },
      { name: "Pilot Briefings", path: "/error-404" },
      { name: "Flight Folder", path: "/error-404" },
      { name: "SIGMET", path: "/error-404" },
      { name: "Aviation Map", path: "/error-404" },
    ],
  },
  {
    name: "Public Weather Services",
    icon: <FileText />,
    subItems: [
      { name: "Forecasts", path: "/error-404" },
      { name: "Morning Forecast", path: "/blank" },
      { name: "Midday Forecast", path: "/error-404" },
      { name: "Evening Forecast", path: "/error-404" },
      { name: "Marine Bulletin", path: "/error-404" },
      { name: "Tropical Weather Outlook", path: "/error-404" },
      { name: "Forecast Verification", path: "/error-404" },
    ],
  },
  {
    name: "Sector Products",
    icon: <FileText />,
    subItems: [
      { name: "Health Index", path: "/error-404" },
      { name: "AgroBulletin", path: "/blank" },
      { name: "Air Quality Index", path: "/error-404" },
    ],
  },
  {
    name: "Hydrology",
    icon: <FileText />,
    subItems: [{ name: "Streamflow", path: "/error-404" }],
  },
  {
    name: "Disaster Risk Reduction",
    icon: <FileText />,
    subItems: [{ name: "DRR Dashboard", path: "/error-404" }],
  },
  {
    name: "Health",
    icon: <FileText />,
    subItems: [{ name: "Health Products", path: "/error-404" }],
  },
  {
    name: "Air Quality",
    icon: <FileText />,
    subItems: [{ name: "AQ Monitoring", path: "/error-404" }],
  },
  {
    name: "Media",
    icon: <FileText />,
    subItems: [{ name: "Press & Media", path: "/error-404" }],
  },
  {
    name: "Data & Climatology",
    icon: <FileText />,
    subItems: [
      { name: "Geonetcast / Satellite Ingestion", path: "/blank" },
      { name: "Central Meteorological Database", path: "/error-404" },
      { name: "Local Server & Storage", path: "/error-404" },
      { name: "BUFR eRegister", path: "/error-404" },
      { name: "Monthly Climate Bulletin", path: "/blank" },
    ],
  },
  {
    name: "Modeling & HPC",
    icon: <FileText />,
    subItems: [
      { name: "NWP/Ensemble Integration & Monitoring", path: "/error-404" },
    ],
  },
  {
    name: "Assets & Instruments",
    icon: <FileText />,
    subItems: [
      { name: "Digital Inventory", path: "/error-404" },
      { name: "Instrument GUI Toolkit", path: "/error-404" },
    ],
  },
  {
    name: "Communication & Dissemination",
    icon: <FileText />,
    subItems: [
      { name: "NaDMA Data-Sharing Interface", path: "/error-404" },
      { name: "Website (SpiceWeather)", path: "/error-404" },
      { name: "Social Media Portal", path: "/error-404" },
      { name: "Mobile Application", path: "/error-404" },
    ],
  },
  {
    name: "Visualization & GIS",
    icon: <FileText />,
    subItems: [
      { name: "GIS & QGIS", path: "/error-404" },
      { name: "Weather Element Map", path: "/error-404" },
      { name: "Warning & Impact Map", path: "/error-404" },
      { name: "Aviation Map", path: "/error-404" },
    ],
  },
  {
    name: "Machine Learning & Innovation",
    icon: <FileText />,
    subItems: [
      { name: "Radar-Based Nowcasting", path: "/error-404" },
      { name: "Lightning/Thunderstorm Prediction", path: "/error-404" },
      { name: "Severe Event Anomaly Detection", path: "/error-404" },
      { name: "Seasonal Outlooks & Drought Risk Modeling", path: "/error-404" },
      { name: "Flood-Risk Prediction", path: "/error-404" },
      { name: "Heatwave Health-Risk Modeling", path: "/error-404" },
    ],
  },
  {
    name: "Knowledge & Documentation",
    icon: <FileText />,
    subItems: [
      { name: "Wiki", path: "/error-404" },
      { name: "Docs", path: "/error-404" },
      { name: "Documentation System", path: "/error-404" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group  ${
                openSubmenu === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
              type="button"
              aria-expanded={openSubmenu === index}
              aria-controls={`submenu-${index}`}
            >
              <span
                className={`${
                  openSubmenu === index
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
                    openSubmenu === index ? "rotate-180 text-brand-500" : ""
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
              id={`submenu-${index}`}
              ref={(el) => {
                subMenuRefs.current[`${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu === index
                    ? `${subMenuHeight[`${index}`]}px`
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

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Auto-open submenu if a subItem matches current path
    let matchedIndex: number | null = null;
    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            matchedIndex = index;
          }
        });
      }
    });
    setOpenSubmenu(matchedIndex);
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
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
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-muted-foreground ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Modules"
                ) : (
                  <Ellipsis />
                )}
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;
