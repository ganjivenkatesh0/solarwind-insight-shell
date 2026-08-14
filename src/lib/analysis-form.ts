/**
 * New Analysis workflow presentation data + draft state helpers.
 * All values mirror the supplied reference screen and can later be replaced
 * 1:1 by the real analysis API payload without touching any JSX.
 */

export type AnalysisDraft = {
  latitude: string;
  longitude: string;
  searchQuery: string;
  landArea: string;
  budget: string;
  landUseType: string;
};

export const defaultAnalysisDraft: AnalysisDraft = {
  latitude: "17.3850",
  longitude: "78.4867",
  searchQuery: "",
  landArea: "40.0",
  budget: "5,000,000",
  landUseType: "open-land",
};

export const landUseOptions = [
  { value: "open-land", label: "Open Land" },
  { value: "barren-land", label: "Barren Land" },
  { value: "agricultural", label: "Agricultural" },
  { value: "industrial", label: "Industrial" },
  { value: "urban", label: "Urban / Built-up" },
  { value: "forest", label: "Forest / Protected" },
] as const;

export const analysisSteps = [
  { id: 1, label: "Site Details" },
  { id: 2, label: "Project Parameters" },
  { id: 3, label: "Preferences" },
  { id: 4, label: "Review & Submit" },
] as const;

export type AnalysisFactorIcon =
  | "solar"
  | "wind"
  | "terrain"
  | "infrastructure"
  | "feasibility"
  | "financial"
  | "ai";

export const analysisFactors: {
  icon: AnalysisFactorIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: "solar",
    title: "Solar Resource",
    description: "Solar irradiance, temperature, humidity & more",
  },
  {
    icon: "wind",
    title: "Wind Resource",
    description: "Wind speed, direction, density & classification",
  },
  {
    icon: "terrain",
    title: "Terrain Analysis",
    description: "Elevation, slope, terrain ruggedness",
  },
  {
    icon: "infrastructure",
    title: "Infrastructure & Access",
    description: "Roads, power lines, substations & proximity",
  },
  {
    icon: "feasibility",
    title: "Technical Feasibility",
    description: "Constraints, regulations & site suitability",
  },
  {
    icon: "financial",
    title: "Energy & Financial",
    description: "Generation estimates, costs & ROI analysis",
  },
  {
    icon: "ai",
    title: "AI Insights",
    description: "ML predictions and feature importance",
  },
];

export const analysisTips = [
  "Use precise coordinates for accurate results",
  "Ensure land area and budget are realistic",
  "Open land or barren land types give better suitability",
  "More data availability leads to higher accuracy",
];

/** Selected-location metadata shown next to the map. */
export const selectedLocationInfo = {
  name: "Hyderabad, Telangana, India",
  elevation: "607 m",
  terrainType: "Urban / Semi-Urban",
  timezone: "Asia/Kolkata (UTC +5:30)",
};

export function formatCoordinates(latitude: string, longitude: string) {
  const lat = Number(latitude);
  const lon = Number(longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return "—";
  return `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(4)}° ${
    lon >= 0 ? "E" : "W"
  }`;
}

/** Numeric-only input sanitising (allows a single decimal point and minus sign). */
export function sanitizeDecimal(value: string) {
  const cleaned = value.replace(/[^\d.-]/g, "");
  const negative = cleaned.startsWith("-");
  const digits = cleaned.replace(/-/g, "");
  const parts = digits.split(".");
  const joined = parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : digits;
  return (negative ? "-" : "") + joined;
}

/** Thousands-separated integer formatting for the budget field. */
export function formatThousands(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

const STORAGE_KEY = "swdi:new-analysis-draft";

export function loadDraft(): AnalysisDraft {
  if (typeof window === "undefined") return defaultAnalysisDraft;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAnalysisDraft;
    return { ...defaultAnalysisDraft, ...(JSON.parse(raw) as Partial<AnalysisDraft>) };
  } catch {
    return defaultAnalysisDraft;
  }
}

export function saveDraft(draft: AnalysisDraft) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* storage unavailable — draft is kept in memory only */
  }
}
