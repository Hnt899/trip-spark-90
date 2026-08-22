/** Travelpayouts Autocomplete API place (city or airport). */
export interface TravelpayoutsPlace {
  id: string;
  type: "city" | "airport";
  code: string;
  name: string;
  country_code: string;
  country_name: string;
  city_code?: string;
  city_name?: string;
}

// ===== ВАЖНО: ИСПОЛЬЗУЕМ HTTP, НЕ HTTPS! =====
const AUTOCOMPLETE_URL = "http://localhost:4000/travelpayouts";
const WHITE_LABEL_BASE = "https://avia.ts-trip.com/";

export interface FlightPassengers {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightSearchParams {
  fromCode: string;
  toCode: string;
  departureDate: Date;
  returnDate?: Date;
  passengers: FlightPassengers;
  flightClass: "economy" | "business";
}

export interface FlightSearchValidationError {
  field: "from" | "to" | "general";
  message: string;
}

/** Fetches city/airport suggestions from Travelpayouts Autocomplete API. */
export async function fetchTravelpayoutsPlaces(term: string, signal?: AbortSignal): Promise<TravelpayoutsPlace[]> {
  if (!term.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    term: term.trim(),
    locale: "ru",
  });
  params.append("types[]", "city");
  params.append("types[]", "airport");

  const response = await fetch(`${AUTOCOMPLETE_URL}?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error(`Autocomplete request failed (${response.status})`);
  }

  return response.json();
}

/** Formats a place for display in the dropdown. */
export function formatPlaceLabel(place: TravelpayoutsPlace): string {
  if (place.type === "airport" && place.city_name) {
    return `${place.name}, ${place.city_name}`;
  }
  return place.name;
}

/** Formats departure date as DDMM for the White Label `flightSearch` token. */
export function formatDepartureToken(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}${month}`;
}

/** Default departure date: tomorrow. */
export function defaultDepartureDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/** Validates flight search input before redirect. */
export function validateFlightSearch(
  fromCode: string | undefined,
  toCode: string | undefined,
): FlightSearchValidationError | null {
  if (!fromCode) {
    return { field: "from", message: "Укажите город вылета" };
  }
  if (!toCode) {
    return { field: "to", message: "Укажите город прибытия" };
  }
  if (fromCode === toCode) {
    return { field: "general", message: "Города вылета и прибытия не могут совпадать" };
  }
  return null;
}

/**
 * Builds the Travelpayouts White Label search URL.
 * Example: https://avia.ts-travel.online/?flightSearch=MOW2012LED2
 */
export function buildFlightWhiteLabelUrl(params: FlightSearchParams): string {
  const { fromCode, toCode, departureDate, returnDate, passengers, flightClass } = params;
  const adults = passengers.adults || 1;
  const dateToken = formatDepartureToken(departureDate);
  const flightSearch = `${fromCode}${dateToken}${toCode}${adults}`;

  const url = new URL(WHITE_LABEL_BASE);
  url.searchParams.set("flightSearch", flightSearch);

  if (passengers.children > 0) {
    url.searchParams.set("children", String(passengers.children));
  }
  if (passengers.infants > 0) {
    url.searchParams.set("infants", String(passengers.infants));
  }
  if (returnDate) {
    url.searchParams.set("returnDate", formatDepartureToken(returnDate));
  }
  if (flightClass === "business") {
    url.searchParams.set("class", "business");
  }

  return url.toString();
}

/** Redirects the browser to the White Label search results page. */
export function redirectToFlightWhiteLabel(params: FlightSearchParams): void {
  window.location.href = buildFlightWhiteLabelUrl(params);
}