import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pokemon } from "./types/pokemon";


export default function Details() {
    const params = useLocalSearchParams();
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    useEffect(()=> {
      if (params.name) {
        fetchPokemonByName(params.name as string);
      }
    },
    [])

    async function fetchPokemonByName(name: string) {
      try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        const data = await response.json();
        console.log(data);
        setPokemon(data);
      }catch(e){
        console.log(e);
      }
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen options={{title: params.name as string}}/>
        <View style={{ }}>
          <Text style={styles.title}>{params.name.charAt(0).toUpperCase() + params.name.slice(1)}</Text>
        </View>
      </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
    title: {
      color: "white",
      fontSize: 28,
      fontWeight: "bold",

    }
  }
);

