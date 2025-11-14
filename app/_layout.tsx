import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" 
      options=
      {{
        title: "Pokedex",
        headerShown: false,

      }}>
      </Stack.Screen>
      <Stack.Screen name="details" 
      options=
      {{
        title: "Details",
        headerBackButtonDisplayMode: "minimal",
        headerShown: false,
      }}>
      </Stack.Screen>
    </Stack>
  );
}
