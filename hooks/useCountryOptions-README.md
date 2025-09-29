# useCountryOptions Hook Documentation

A comprehensive React Native hook for managing country and state/region data with optimized performance, search capabilities, and extensive functionality.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
- [Features](#features)
- [Advanced Usage](#advanced-usage)
- [Performance Considerations](#performance-considerations)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)

## Overview

The `useCountryOptions` hook provides a complete solution for country and state/region selection in React Native applications. It includes:

- **Comprehensive Country Data**: 195+ countries with detailed information
- **State/Region Support**: States, provinces, and regions for major countries
- **React Native Optimized**: Uses `expo-image` and React Native components
- **Advanced Search**: Multi-field search including languages, regions, capitals
- **Performance Optimized**: Memoized calculations and efficient data structures
- **TypeScript Support**: Full type safety and IntelliSense

## Installation

The hook requires the following dependencies (already included in your project):

```bash
npm install @tanstack/react-query expo-image
```

## Basic Usage

```tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import useCountryOptions from "@/hooks/useCountryOptions";

export default function CountrySelector() {
  const { countryOptions, isLoading, error } = useCountryOptions();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={countryOptions}
      keyExtractor={(item) => item.value}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => console.log("Selected:", item.value)}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: 12 }}>
            {item.flagOnly}
            <Text style={{ marginLeft: 8 }}>{item.value}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
```

## API Reference

### Hook Return Value

```tsx
const {
  countryOptions, // Array of CountryOption objects
  isLoading, // Boolean loading state
  error, // Error object if fetch failed
  getStatesForCountry, // Function to get states for a country
  searchOptions, // Function to search countries and states
  getCountriesByRegion, // Function to filter by region
  getPopularCountries, // Function to get popular countries
} = useCountryOptions();
```

### CountryOption Interface

```tsx
interface CountryOption {
  value: string; // Country name (e.g., "United States")
  searchText: string; // Combined searchable text
  flagOnly: React.ReactElement; // Flag image component
  nameOnly: React.ReactElement; // Country name text component
  countryCode: React.ReactElement; // Country code text component
  label: React.ReactElement; // Combined flag + name component
  currencyCode?: string; // Currency code (e.g., "USD")
  currencyName?: string; // Currency name (e.g., "US Dollar")
  currencySymbol?: string; // Currency symbol (e.g., "$")
  fullCurrency?: React.ReactElement; // Flag + currency component
  region?: string; // Geographic region
  subregion?: string; // Geographic subregion
  capital?: string[]; // Capital cities
  population?: number; // Population count
  area?: number; // Area in square kilometers
  languages?: Record<string, string>; // Languages spoken
  timezones?: string[]; // Timezones
  states?: StateRegion[]; // States/provinces/regions
}
```

### StateOption Interface

```tsx
interface StateOption {
  value: string; // State name (e.g., "California")
  searchText: string; // Combined searchable text
  nameOnly: React.ReactElement; // State name text component
  label: React.ReactElement; // State name + code component
  code?: string; // State code (e.g., "CA")
  type:
    | "state"
    | "province"
    | "region"
    | "territory"
    | "federal district"
    | "country"
    | "municipality"
    | "autonomous region";
  countryName: string; // Parent country name
}
```

## Features

### 1. Comprehensive Country Data

- **195+ Countries**: Complete list with official names
- **Rich Metadata**: Population, area, capitals, languages, timezones
- **Currency Information**: Codes, names, and symbols
- **Geographic Data**: Regions, subregions, and coordinates

### 2. State/Region Support

States/regions are only present if the upstream API returns them. This hook does not inject local defaults. If `states` is missing, `getStatesForCountry` will return an empty array.

### 3. Advanced Search Capabilities

```tsx
const { searchOptions } = useCountryOptions();

// Search countries only
const countries = searchOptions("united", false);

// Search countries and states
const results = searchOptions("california", true);
console.log(results.countries); // Countries matching "california"
console.log(results.states); // States matching "california"
```

Search includes:

- Country names
- Country codes
- Currency codes and names
- Regions and subregions
- Capital cities
- Languages
- State/province names and codes

### 4. Region Filtering

```tsx
const { getCountriesByRegion } = useCountryOptions();

const europeanCountries = getCountriesByRegion("Europe");
const asianCountries = getCountriesByRegion("Asia");
```

### 5. Popular Countries

```tsx
const { getPopularCountries } = useCountryOptions();

// Get top 20 countries by population
const popularCountries = getPopularCountries(20);
```

## Advanced Usage

### Custom Search Implementation

```tsx
import React, { useState, useMemo } from "react";
import { TextInput, FlatList } from "react-native";
import useCountryOptions from "@/hooks/useCountryOptions";

export default function AdvancedCountrySearch() {
  const [query, setQuery] = useState("");
  const { countryOptions, searchOptions } = useCountryOptions();

  const searchResults = useMemo(() => {
    if (!query.trim()) return countryOptions.slice(0, 20);

    const results = searchOptions(query, true);
    return Array.isArray(results) ? results : results.countries;
  }, [query, countryOptions, searchOptions]);

  return (
    <>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search countries, states, currencies..."
        style={{ padding: 12, borderWidth: 1, margin: 16 }}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
            {item.flagOnly}
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>{item.value}</Text>
              <Text style={{ fontSize: 14, color: "#666" }}>
                {item.countryCode} • {item.region}
                {item.population && ` • ${(item.population / 1000000).toFixed(1)}M`}
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
}
```

### State Selection Component

```tsx
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import useCountryOptions from "@/hooks/useCountryOptions";

export default function CountryStateSelector() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const { countryOptions, getStatesForCountry } = useCountryOptions();

  const availableStates = selectedCountry ? getStatesForCountry(selectedCountry.value) : [];

  return (
    <View>
      {/* Country Selection */}
      <FlatList
        data={countryOptions}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCountry(item)}>
            <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
              {item.flagOnly}
              <Text style={{ marginLeft: 8 }}>{item.value}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* State Selection */}
      {selectedCountry && availableStates.length > 0 && (
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", margin: 16 }}>
            States/Regions in {selectedCountry.value}
          </Text>
          <FlatList
            data={availableStates}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedState(item)}>
                <View style={{ padding: 12 }}>
                  <Text>{item.value}</Text>
                  {item.code && <Text style={{ color: "#666" }}>({item.code})</Text>}
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
```

### Region-Based Filtering

```tsx
import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import useCountryOptions from "@/hooks/useCountryOptions";

export default function RegionFilter() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const { countryOptions, getCountriesByRegion } = useCountryOptions();

  // Get unique regions
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(countryOptions.map((c) => c.region))].filter(Boolean);
    return uniqueRegions.sort();
  }, [countryOptions]);

  const filteredCountries = selectedRegion ? getCountriesByRegion(selectedRegion) : countryOptions;

  return (
    <View>
      {/* Region Filter */}
      <FlatList
        horizontal
        data={regions}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 8,
              margin: 4,
              backgroundColor: selectedRegion === item ? "#007bff" : "#f0f0f0",
              borderRadius: 16,
            }}
            onPress={() => setSelectedRegion(selectedRegion === item ? null : item)}
          >
            <Text style={{ color: selectedRegion === item ? "white" : "black" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Countries List */}
      <FlatList
        data={filteredCountries}
        renderItem={({ item }) => (
          <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
            {item.flagOnly}
            <Text style={{ marginLeft: 8 }}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

## Performance Considerations

### 1. Memoization

The hook uses `useMemo` to prevent unnecessary recalculations:

- Country options are memoized based on the countries data
- Search results should be memoized in your components
- Region lists are computed once and cached

### 2. Data Caching

- React Query caches country data for 5 minutes
- Failed requests are retried up to 2 times
- Data persists across component unmounts

### 3. Efficient Rendering

- Use `FlatList` for large lists instead of `ScrollView`
- Implement `keyExtractor` for optimal list performance
- Consider virtualization for very large datasets

### 4. Memory Management

- Country data is loaded once and reused
- State data is computed on-demand
- Search results are not cached (implement your own caching if needed)

## TypeScript Support

The hook is fully typed with TypeScript:

```tsx
import useCountryOptions, { CountryOption, StateOption } from '@/hooks/useCountryOptions';

// Type-safe usage
const MyComponent: React.FC = () => {
  const { countryOptions } = useCountryOptions();

  const handleCountrySelect = (country: CountryOption) => {
    // country is fully typed
    console.log(country.value, country.population, country.states);
  };

  return (
    // Component JSX
  );
};
```

## Examples

### Complete Country Selector

See `components/country-selector-example.tsx` for a comprehensive example that demonstrates:

- Country selection with flags
- State/region selection
- Search functionality
- Region filtering
- Country information display
- Responsive design
- Error handling
- Loading states

### Integration with Forms

```tsx
import React from "react";
import { View, Text } from "react-native";
import useCountryOptions from "@/hooks/useCountryOptions";

export default function UserProfileForm() {
  const { countryOptions, getStatesForCountry } = useCountryOptions();
  const [formData, setFormData] = useState({
    country: "",
    state: "",
  });

  const availableStates = formData.country ? getStatesForCountry(formData.country) : [];

  return <View>{/* Your form implementation */}</View>;
}
```

## Best Practices

1. **Always handle loading and error states**
2. **Use memoization for expensive operations**
3. **Implement proper key extraction for lists**
4. **Consider accessibility with proper labels**
5. **Test with different screen sizes**
6. **Handle edge cases (no states, empty search results)**

## Troubleshooting

### Common Issues

1. **Images not loading**: Ensure `expo-image` is properly configured
2. **Performance issues**: Check if you're re-rendering unnecessarily
3. **Search not working**: Verify search query is properly formatted
4. **States not showing**: Check if the country has state data

### Debug Mode

Enable debug logging by setting the query key with debug info:

```tsx
const { countryOptions } = useCountryOptions();
console.log("Countries loaded:", countryOptions.length);
console.log("Sample country:", countryOptions[0]);
```
