import { View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/Colours'
import Typography from '@/components/typography'
import RadioGroup from '@/components/radio/group';
import Button from '@/components/button';
import { router } from 'expo-router';
import AuthLayout from '@/layout/auth-layout';

export default function RequestOTP() {
  const [selected, setSelected] = useState<string>('phone');
  return (
    <AuthLayout>

      <Typography variant='h2' fontWeight={600}>Verify your account</Typography>

      <View style={{ width: '100%', paddingVertical: 20, }}>
        <Typography variant='h5' fontWeight={600} style={{ marginBottom: 20 }}>Choose the medium to receive your OTP</Typography>

        <RadioGroup
          options={[
            { label: 'Phone number', value: 'phone' },
            { label: 'Email', value: 'email' },
          ]}
          selectedValue={selected}
          onValueChange={(value) => setSelected(value)}
          color={colors.orange[400]}
        />

        <Button
          width='full'
          label='REQUEST OTP'
          onPress={() => router.push("/(auth)/verify-otp")}
          style={{ marginTop: 32 }}
        />
      </View>
    </AuthLayout >
  )
}
