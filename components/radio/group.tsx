import React from 'react';
import { View } from 'react-native';
import Radio from '.';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  size?: number;
  color?: string;
}

export default function RadioGroup({
  options,
  selectedValue,
  onValueChange,
  size,
  color,
}: RadioGroupProps) {
  return (
    <View>
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={onValueChange}
          size={size}
          color={color}
        />
      ))}
    </View>
  );
}
