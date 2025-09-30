import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle } from "react-native";
import Typography from "@/components/typography";
import { colors } from "@/constants/Colours";

type CardProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};
export function Card({ style, children }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

type CardSectionProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export function CardHeader({ style, children }: CardSectionProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.title, style]}>{children}</View>;
}

export function CardDescription({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Typography variant="body2" style={[styles.description, style]}>
      {children}
    </Typography>
  );
}

export function CardContent({ style, children }: CardSectionProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function CardFooter({ style, children }: CardSectionProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white[100],
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: colors.white[600],
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    // additional spacing if needed
  },
  description: {
    marginTop: 2,
  },
  content: {
    marginVertical: 8,
  },
  footer: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
