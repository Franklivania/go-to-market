import React, { useMemo, useState } from 'react'
import AuthLayout from '@/layout/auth-layout';
import Typography from '@/components/typography';
import FormInput from '@/components/form-input';
import { colors } from '@/constants/Colours';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import useCountryOptions from '@/hooks/useCountryOptions';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/components/button';
import { router } from 'expo-router';

export default function CompleteOnboarding() {
  const { countryOptions, getStatesForCountry, isLoading } = useCountryOptions();
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  const [openType, setOpenType] = useState<'country' | 'state' | null>(null);
  const sheetRef = React.useRef<BottomSheet>(null);
  const [search, setSearch] = useState('');

  const snapPoints = useMemo(() => ['40%', '60%'], []);

  const options = openType === 'country'
    ? countryOptions
    : country
      ? getStatesForCountry(country)
      : [];

  const filteredOptions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt: any) => (opt.searchText || '').toLowerCase().includes(q));
  }, [options, search]);

  const handleSelect = (value: string) => {
    if (openType === 'country') {
      setCountry(value);
      setState(null); // reset state when country changes
    } else if (openType === 'state') {
      setState(value);
    }
    sheetRef.current?.close();
  };

  return (
    <AuthLayout style={{ alignItems: 'flex-start' }}>
      <Typography variant='h2' fontWeight={400} style={{ marginBottom: 32 }}>Complete Onboarding</Typography>

      <TouchableOpacity
        activeOpacity={0.7}
        style={{ width: '100%' }}
        onPress={() => {
          if (isLoading) return;
          setOpenType('country');
          setSearch('');
          sheetRef.current?.expand();
        }}
      >
        <FormInput
          type='text'
          variant='outline'
          borderPosition='bottom'
          color={colors.orange[600]}
          placeholder='Nationality'
          value={country ?? ''}
          editable={false}
          rightIcon={<Ionicons name='chevron-down' size={18} color={colors.orange[600]} />}
          style={{ width: '100%' }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={country ? 0.7 : 1}
        style={{ width: '100%', opacity: country ? 1 : 0.5 }}
        onPress={() => {
          if (!country || isLoading) return;
          setOpenType('state');
          setSearch('');
          sheetRef.current?.expand();
        }}
      >
        <FormInput
          type='text'
          variant='outline'
          borderPosition='bottom'
          color={colors.orange[600]}
          placeholder='State/Region'
          value={state ?? ''}
          editable={false}
          rightIcon={<Ionicons name='chevron-down' size={18} color={colors.orange[600]} />}
          style={{ width: '100%' }}
        />
      </TouchableOpacity>

      <FormInput type='number' variant='outline' borderPosition='bottom' color={colors.orange[600]} placeholder='House Number' style={{ width: '100%', }} />
      <FormInput type='text' variant='outline' borderPosition='bottom' color={colors.orange[600]} placeholder='Address' style={{ width: '100%', }} />

      <Button width='full' label='COMPLETE ONBOARDING' onPress={() => router.push("/(user)/dashboard")} style={{ marginTop: 12 }} />

      <Typography variant='body2' style={{ alignSelf: 'flex-end', marginTop: 48, }}>
        You can continue later...&nbsp;
        <Typography color={colors.orange[600]} onPress={() => router.push("/(user)/dashboard")}>Skip</Typography>
      </Typography>

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={(idx) => {
          if (idx === -1) {
            setOpenType(null);
            setSearch('');
          }
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          {isLoading ? (
            <View style={{ paddingVertical: 16, alignItems: 'center' }}>
              <ActivityIndicator size='small' color={colors.orange[600]} />
            </View>
          ) : (
            <FormInput
              type='search'
              variant='outline'
              radius='sm'
              color={colors.orange[600]}
              placeholder={openType === 'country' ? 'Search countries' : 'Search states/regions'}
              value={search}
              onChangeText={setSearch}
            />
          )}
        </View>

        {!isLoading && (
          <BottomSheetFlatList
            data={filteredOptions}
            keyExtractor={(item: any) => item.value}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={() => handleSelect(item.value)}
                style={{ paddingHorizontal: 16, paddingVertical: 12 }}
              >
                {item.label}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: '#eee' }} />
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </BottomSheet>
    </AuthLayout>
  )
}