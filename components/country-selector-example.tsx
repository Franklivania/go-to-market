import React, { useState, useMemo } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import useCountryOptions, { CountryOption, StateOption } from "@/hooks/useCountryOptions";


interface CountrySelectorExampleProps {
  onCountrySelect?: (country: CountryOption) => void;
  onStateSelect?: (state: StateOption) => void;
  showStates?: boolean;
  showSearch?: boolean;
  showRegions?: boolean;
}

export default function CountrySelectorExample({
  onCountrySelect,
  onStateSelect,
  showStates = true,
  showSearch = true,
  showRegions = true,
}: CountrySelectorExampleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [selectedState, setSelectedState] = useState<StateOption | null>(null);
  const [showCountryList, setShowCountryList] = useState(false);
  const [showStateList, setShowStateList] = useState(false);

  const {
    countryOptions,
    isLoading,
    error,
    getStatesForCountry,
    searchOptions,
    getCountriesByRegion,
    getPopularCountries,
  } = useCountryOptions();

  // Get unique regions for filtering
  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(countryOptions.map((c) => c.region))].filter(Boolean);
    return uniqueRegions.sort();
  }, [countryOptions]);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return getPopularCountries(50); // Show popular countries by default
    }

    const results = searchOptions(searchQuery, false);
    return Array.isArray(results) ? results : results.countries;
  }, [searchQuery, countryOptions, getPopularCountries, searchOptions]);

  // Get states for selected country
  const availableStates = useMemo(() => {
    if (!selectedCountry) return [];
    return getStatesForCountry(selectedCountry.value);
  }, [selectedCountry, getStatesForCountry]);

  const handleCountrySelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setShowCountryList(false);
    setShowStateList(showStates && country.states && country.states.length > 0);
    onCountrySelect?.(country);
  };

  const handleStateSelect = (state: StateOption) => {
    setSelectedState(state);
    setShowStateList(false);
    onStateSelect?.(state);
  };

  const renderCountryItem = ({ item }: { item: CountryOption }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handleCountrySelect(item)}>
      <View style={styles.itemContent}>
        {item.flagOnly}
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{item.value}</Text>
          <Text style={styles.itemSubtitle}>
            {item.countryCode} • {item.region}
            {item.population && ` • ${(item.population / 1000000).toFixed(1)}M`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderStateItem = ({ item }: { item: StateOption }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handleStateSelect(item)}>
      <View style={styles.itemContent}>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>{item.value}</Text>
          <Text style={styles.itemSubtitle}>
            {item.code && `${item.code} • `}
            {item.type}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRegionFilter = () => (
    <View style={styles.regionContainer}>
      <Text style={styles.sectionTitle}>Filter by Region:</Text>
      <FlatList
        horizontal
        data={regions}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.regionChip}
            onPress={() => {
              const regionCountries = getCountriesByRegion(item);
              // You could implement region-specific filtering here
            }}
          >
            <Text style={styles.regionChipText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading countries...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading countries: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Country & State Selector</Text>

      {/* Selected Country Display */}
      {selectedCountry && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected Country:</Text>
          <View style={styles.selectedItem}>
            {selectedCountry.flagOnly}
            <Text style={styles.selectedText}>{selectedCountry.value}</Text>
          </View>
        </View>
      )}

      {/* Selected State Display */}
      {selectedState && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected State:</Text>
          <View style={styles.selectedItem}>
            <Text style={styles.selectedText}>{selectedState.value}</Text>
            <Text style={styles.selectedSubtext}>({selectedState.countryName})</Text>
          </View>
        </View>
      )}

      {/* Search Input */}
      {showSearch && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setShowCountryList(true)}
        />
      )}

      {/* Region Filters */}
      {showRegions && renderRegionFilter()}

      {/* Country Selection Button */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setShowCountryList(!showCountryList)}
      >
        <Text style={styles.selectButtonText}>
          {selectedCountry ? `Change Country (${selectedCountry.value})` : "Select Country"}
        </Text>
      </TouchableOpacity>

      {/* Country List */}
      {showCountryList && (
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>Countries ({filteredCountries.length})</Text>
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.value}
            renderItem={renderCountryItem}
            style={styles.list}
            maxHeight={300}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* State Selection Button */}
      {showStates && selectedCountry && availableStates.length > 0 && (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => setShowStateList(!showStateList)}
        >
          <Text style={styles.selectButtonText}>
            {selectedState ? `Change State (${selectedState.value})` : "Select State/Region"}
          </Text>
        </TouchableOpacity>
      )}

      {/* State List */}
      {showStateList && availableStates.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.sectionTitle}>States/Regions ({availableStates.length})</Text>
          <FlatList
            data={availableStates}
            keyExtractor={(item) => item.value}
            renderItem={renderStateItem}
            style={styles.list}
            maxHeight={200}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {/* Country Info Display */}
      {selectedCountry && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Country Information:</Text>
          <Text style={styles.infoText}>Region: {selectedCountry.region}</Text>
          {selectedCountry.subregion && (
            <Text style={styles.infoText}>Subregion: {selectedCountry.subregion}</Text>
          )}
          {selectedCountry.capital && selectedCountry.capital.length > 0 && (
            <Text style={styles.infoText}>Capital: {selectedCountry.capital.join(", ")}</Text>
          )}
          {selectedCountry.population && (
            <Text style={styles.infoText}>
              Population: {(selectedCountry.population / 1000000).toFixed(1)}M
            </Text>
          )}
          {selectedCountry.area && (
            <Text style={styles.infoText}>
              Area: {(selectedCountry.area / 1000).toFixed(0)}K km²
            </Text>
          )}
          {selectedCountry.currencyCode && (
            <Text style={styles.infoText}>
              Currency: {selectedCountry.currencyCode} ({selectedCountry.currencySymbol})
            </Text>
          )}
          {selectedCountry.languages && (
            <Text style={styles.infoText}>
              Languages: {Object.values(selectedCountry.languages).join(", ")}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#ff0000",
  },
  selectedContainer: {
    backgroundColor: "#e8f5e8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectedLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d5a2d",
    marginBottom: 4,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2d5a2d",
  },
  selectedSubtext: {
    fontSize: 14,
    color: "#666",
  },
  searchInput: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  regionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  regionChip: {
    backgroundColor: "#007bff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  regionChipText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  selectButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  selectButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  list: {
    maxHeight: 300,
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  infoContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});
