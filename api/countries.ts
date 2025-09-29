export interface StateRegion {
  name: string;
  code?: string;
  type:
    | "state"
    | "province"
    | "region"
    | "territory"
    | "federal district"
    | "country"
    | "municipality"
    | "autonomous region";
}

export interface CountryWithStates {
  name: { common: string };
  flags: { png?: string; svg?: string };
  idd: { root?: string; suffixes?: string[] };
  currencies?: Record<string, { name?: string; symbol?: string }>;
  region?: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  area?: number;
  languages?: Record<string, string>;
  timezones?: string[];
  cca2?: string;
  cca3?: string;
  states?: StateRegion[];
}

// Keep fields lean and only what we actually use
const REST_COUNTRIES_FIELDS = [
  "name",
  "flags",
  "idd",
  "currencies",
  "region",
  "subregion",
  "capital",
  "cca2",
  "cca3",
].join(",");

// CountriesNow (free, no key) types
interface CountriesNowStateItem { name: string; state_code?: string; }
interface CountriesNowCountryStates {
  name: string; // country name
  iso2?: string;
  iso3?: string;
  states: CountriesNowStateItem[];
}
interface CountriesNowStatesResponse {
  error: boolean;
  msg: string;
  data: CountriesNowCountryStates[];
}

const fetchCountries = async (): Promise<CountryWithStates[]> => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=${REST_COUNTRIES_FIELDS}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CountryWithStates[] = await response.json();
    // Normalize flags for RN and build base list
    const base = data.map((country) => ({
      ...country,
      flags: {
        png: country.flags?.png,
        svg: country.flags?.svg,
      },
    }));

    // Try to enrich with states from CountriesNow
    const enriched = await mergeWithCountriesNowStates(base).catch(() => base);
    return enriched;
  } catch (error) {
    console.error(`Error fetching countries: ${error}`);
    throw error;
  }
};

async function mergeWithCountriesNowStates(countries: CountryWithStates[]): Promise<CountryWithStates[]> {
  // Fetch all countries + states from CountriesNow
  // Docs: https://documenter.getpostman.com/view/1134062/T1LJjU52
  const resp: Response = await fetch('https://countriesnow.space/api/v0.1/countries/states');
  if (!resp.ok) {
    return countries; // graceful skip
  }
  const json: CountriesNowStatesResponse = await resp.json();
  if (json.error || !Array.isArray(json.data)) {
    return countries;
  }

  // Build quick lookup by name and ISO code
  const nameToIndex = new Map<string, number>();
  const iso2ToIndex = new Map<string, number>();
  const iso3ToIndex = new Map<string, number>();
  countries.forEach((c, idx) => {
    if (c.name?.common) nameToIndex.set(c.name.common.toLowerCase(), idx);
    if (c.cca2) iso2ToIndex.set(c.cca2.toUpperCase(), idx);
    if (c.cca3) iso3ToIndex.set(c.cca3.toUpperCase(), idx);
  });

  const result = countries.map((c) => ({ ...c, states: c.states || [] }));

  for (const entry of json.data) {
    const byIso2 = entry.iso2 ? iso2ToIndex.get(entry.iso2.toUpperCase()) : undefined;
    const byIso3 = !byIso2 && entry.iso3 ? iso3ToIndex.get(entry.iso3.toUpperCase()) : undefined;
    const byName = byIso2 === undefined && byIso3 === undefined ? nameToIndex.get(entry.name.toLowerCase()) : undefined;
    const idx = byIso2 ?? byIso3 ?? byName;
    if (idx === undefined) continue;

    const mapped: StateRegion[] = (entry.states || []).map((s) => ({
      name: s.name,
      code: s.state_code,
      type: 'state',
    }));
    if (mapped.length > 0) {
      result[idx].states = mapped.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return result;
}

export default fetchCountries;