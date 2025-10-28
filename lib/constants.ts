/**
 * API Configuration
 */
export const API_CONFIG = {
  OPEN_ELEVATION: "https://api.open-elevation.com/api/v1/lookup",
  NOMINATIM_SEARCH: "https://nominatim.openstreetmap.org/search",
  NOMINATIM_REVERSE: "https://nominatim.openstreetmap.org/reverse",
} as const

/**
 * Altitude Zones
 */
export const ALTITUDE_ZONES = {
  DRYLAND: { min: 0, max: 1000, label: "Dryland Altitude" },
  TRANSITIONAL: { min: 1000, max: 1500, label: "Transitional Altitude" },
  MEDIUM: { min: 1500, max: 2000, label: "Medium Altitude" },
  HIGHLAND: { min: 2000, max: 2500, label: "Highland Altitude" },
} as const

/**
 * Supported Languages
 */
export const SUPPORTED_LANGUAGES = {
  EN: "en",
  SW: "sw",
  FR: "fr",
} as const

/**
 * Chrome AI Availability
 */
export const CHROME_AI_FEATURES = {
  PROMPT: "languageModel",
  TRANSLATION: "translation",
} as const

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  GEOLOCATION_DENIED: "Location access denied. Please enable location services or try manual entry.",
  INVALID_ALTITUDE: "Invalid altitude. Please provide a valid number.",
  LOCATION_NOT_FOUND: "Location not found. Please try a different name or use coordinates.",
  API_ERROR: "Failed to fetch data. Please try again.",
  NO_SEEDS_FOUND: "No seeds found for this altitude. Try a different area.",
} as const

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  LOCATION_DETECTED: "Location detected successfully",
  RECOMMENDATIONS_LOADED: "Seed recommendations loaded",
  ADVICE_GENERATED: "Farming advice generated",
} as const

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  HISTORY_LIMIT: 10,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 2000,
} as const
