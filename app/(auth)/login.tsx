import { View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '@/constants/Colours';
import Button from '@/components/button';
import FormInput from '@/components/form-input';
import Typography from '@/components/typography';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import AuthLayout from '@/layout/auth-layout';

export default function Login() {
  let user = 'Franklin';

  const [hasHardware, setHasHardware] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  // check device capability once on mount
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasHardware(compatible);

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(enrolled);

      // optional: automatically prompt when user lands on login page
      if (compatible && enrolled) {
        handleBiometricAuth();
      }
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        Alert.alert('Success', 'You are authenticated!');
        router.push('/(user)/dashboard')
      } else {
        Alert.alert('Authentication failed', 'Please try again.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    router.push('/(user)/dashboard')
  }
  const handleRegsiter = () => {
    router.push('/(auth)/register')
  }

  return (
    <AuthLayout>

      <Typography
        variant='h3'
        style={{ alignSelf: 'flex-start', marginVertical: 20 }}
        fontWeight='300'
      >
        Welcome back {user}
      </Typography>

      <View style={{ width: '100%', display: 'flex', gap: 8 }}>
        <FormInput
          variant='outline'
          type='password'
          color={colors.orange[500]}
          placeholder='Password'
          borderPosition='bottom'
          backgroundColor={colors.black[50]}
        />

        <Button
          label='LOGIN'
          width='full'
          onPress={handleLogin}
        />

        <Button
          variant='plain'
          label='Register'
          width='fit'
          onPress={handleRegsiter}
        />

        {hasHardware && biometricAvailable && (
          <Button
            variant='plain'
            label='Authenticate with biometrics'
            width='fit'
            style={{ alignSelf: 'flex-start', marginTop: 32 }}
            onPress={handleBiometricAuth}
          />
        )}
      </View>
    </AuthLayout>
  );
}
