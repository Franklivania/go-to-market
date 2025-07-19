import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useThemeContext } from '@/context/ThemeContext';

type SvgIconProps = {
  xml: string;
  width?: number;
  height?: number;
};

export default function SvgIcon({ xml, width = 24, height = 24 }: SvgIconProps) {
  const { theme } = useThemeContext();
  const dynamicXml = xml.replace('#000000', theme.text).replace('#FFFFFF', theme.background);
  return <SvgXml xml={dynamicXml} width={width} height={height} />;
}