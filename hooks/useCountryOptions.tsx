import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCountries, { CountryWithStates, StateRegion } from "@/api/countries";
import { Image } from "expo-image";
import { Text, View } from "react-native";


interface CountryOption {
  value: string;
  searchText: string;
  flagOnly: React.ReactElement;
  nameOnly: React.ReactElement;
  countryCode: React.ReactElement;
  label: React.ReactElement;
  currencyCode?: string;
  currencyName?: string;
  currencySymbol?: string;
  fullCurrency?: React.ReactElement;
  region?: string;
  subregion?: string;
  capital?: string[];
  population?: number;
  area?: number;
  languages?: Record<string, string>;
  timezones?: string[];
  states?: StateRegion[];
}

interface StateOption {
  value: string;
  searchText: string;
  nameOnly: React.ReactElement;
  label: React.ReactElement;
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
  countryName: string;
}

export default function useCountryOptions() {
  const {
    data: countries = [],
    isLoading,
    error,
  } = useQuery<CountryWithStates[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  const countryOptions = useMemo<CountryOption[]>(() => {
    return countries.map((country) => {
      const {
        name: { common },
        flags,
        idd,
        currencies,
        region,
        subregion,
        capital,
        population,
        area,
        languages,
        timezones,
        states,
      } = country;

      const root = idd?.root ?? "";
      const suffixes = idd?.suffixes ?? [];
      const fullCode = suffixes && suffixes.length > 0 ? root + suffixes[0] : root;

      let currencyCode = "";
      let currencyName = "";
      let currencySymbol = "";

      if (currencies) {
        const currencyKeys = Object.keys(currencies);
        if (currencyKeys.length > 0) {
          const firstKey = currencyKeys[0];
          const currencyInfo = currencies[firstKey];
          currencyCode = firstKey;
          currencyName = currencyInfo?.name ?? "";
          currencySymbol = currencyInfo?.symbol ?? "";
        }
      }

      // Build React Native compatible display elements
      const flagUri = flags?.png || flags?.svg || undefined;
      const flagElement = (
        <Image
          source={flagUri ? { uri: flagUri } : undefined}
          style={{ width: 24, height: 24 }}
          contentFit="contain"
        />
      );

      const nameElement = <Text>{common}</Text>;
      const countryCodeElement = <Text>{fullCode}</Text>;

      const label = (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {flagElement}
          {nameElement}
        </View>
      );

      const fullCurrency = (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {flagElement}
          <Text>{currencyName}</Text>
        </View>
      );

      const searchTextParts = [
        common,
        fullCode,
        currencyCode,
        currencyName,
        region,
        subregion,
        capital?.join(" "),
        ...(languages ? Object.values(languages) : []),
      ].filter(Boolean);
      const searchText = searchTextParts.join(" ");

      return {
        value: common,
        searchText,
        label,
        flagOnly: flagElement,
        nameOnly: nameElement,
        countryCode: countryCodeElement,
        currencyCode,
        currencyName,
        currencySymbol,
        fullCurrency,
        region,
        subregion,
        capital,
        population,
        area,
        languages,
        timezones,
        states,
      };
    });
  }, [countries]);

  // Helper function to get states for a specific country
  const getStatesForCountry = (countryName: string): StateOption[] => {
    const country = countries.find((c) => c.name.common === countryName);
    if (!country?.states || country.states.length === 0) return [];

    return country.states.map((state) => {
      const nameElement = <Text>{state.name}</Text>;

      const label = (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text>{state.name}</Text>
          {state.code && <Text>({state.code})</Text>}
        </View>
      );

      const searchTextParts = [state.name, state.code, state.type, countryName].filter(Boolean);
      const searchText = searchTextParts.join(" ");

      return {
        value: state.name,
        searchText,
        nameOnly: nameElement,
        label,
        code: state.code,
        type: state.type,
        countryName,
      };
    });
  };

  // Helper function to search countries and states
  const searchOptions = (query: string, includeStates: boolean = false) => {
    const lowerQuery = query.toLowerCase();

    const matchingCountries = countryOptions.filter((option) =>
      option.searchText.toLowerCase().includes(lowerQuery)
    );

    if (!includeStates) {
      return matchingCountries;
    }

    const matchingStates: StateOption[] = [];
    matchingCountries.forEach((country) => {
      const states = getStatesForCountry(country.value);
      const matchingCountryStates = states.filter((state) =>
        state.searchText.toLowerCase().includes(lowerQuery)
      );
      matchingStates.push(...matchingCountryStates);
    });

    return {
      countries: matchingCountries,
      states: matchingStates,
    };
  };

  // Helper function to get countries by region
  const getCountriesByRegion = (region: string) => {
    return countryOptions.filter((option) => option.region === region);
  };

  // Helper function to get popular countries (by population)
  const getPopularCountries = (limit: number = 20) => {
    return countryOptions
      .filter((option) => option.population && option.population > 0)
      .sort((a, b) => (b.population || 0) - (a.population || 0))
      .slice(0, limit);
  };

  return {
    countryOptions,
    isLoading,
    error,
    getStatesForCountry,
    searchOptions,
    getCountriesByRegion,
    getPopularCountries,
  };
}

export type { CountryOption, StateOption };
