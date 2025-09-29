import { colors } from "@/constants/Colours";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface RadioProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
  size?: number;
  color?: string;
}

export default function Radio({
  label,
  value,
  selected,
  onPress,
  size = 20,
  color = `${colors.orange[600]}`,
}: RadioProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(value)} activeOpacity={0.7}>
      <View
        style={[
          styles.outerCircle,
          {
            width: size,
            height: size,
            borderColor: `${selected ? color : colors.white[600]}`,
            borderRadius: size / 2,
          },
        ]}
      >
        {selected && (
          <View
            style={[
              styles.innerCircle,
              {
                backgroundColor: color,
                width: size / 2,
                height: size / 2,
                borderRadius: size / 4,
              },
            ]}
          />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  outerCircle: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  innerCircle: {},
  label: {
    fontSize: 16,
    color: `${colors.black[300]}`,
  },
});
