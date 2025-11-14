import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";


export default function Details() {
    const params = useLocalSearchParams();

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
        console.log(JSON.stringify(data));
      }catch(e){
        console.log(e);
      }
    }

    return (
      <>
      <Stack.Screen options={{title: params.name as string}}/>
    <ScrollView
    contentContainerStyle={{
      gap: 16,
      padding: 16,
    
    }}>
      
    </ScrollView>
    </>
  );
}
  const styles = StyleSheet.create({
  }
);
