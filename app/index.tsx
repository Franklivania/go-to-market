import Button from "@/components/button";
import { colors } from "@/constants/Colours";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white[100]
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button variant="primary" label="Click Me" onPress={() => {}} />
    </View>
  );
}
