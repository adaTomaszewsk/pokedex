import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorsByType } from "./src/constants/colors";
import { Pokemon } from "./types/pokemon";

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(()=>{
    fetchPokemons();
  }, [])

  async function fetchPokemons() {
      try{
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=80"
        );

        const data = await response.json();

        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
              name: pokemon.name,
              image: details.sprites.front_default,
              imageBack: details.sprites.back_default,
              types: details.types,
            }
          })
        )

        setPokemons(detailedPokemons);

      }catch(e) {
        console.log(e);
      }
    }
    
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Pokedex</Text>
      <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      
      }}>
        <View 
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}>
          {pokemons.map((pokemon) => (
            <Link key={pokemon.name}
            href={{pathname: "/details", params: {name: pokemon.name}}}
            style={{
                // @ts-ignore
                backgroundColor: ColorsByType[pokemon.types[0].type.name] +50,
                padding: 12,
                borderRadius: 20,
                marginBottom: 16, 
                width: "48%",
                }}
            >
              <View style={{
                  flexDirection: "column",
                }}> 
                  <Text style={styles.name}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginTop: 8,
                    }}
                  >
                    <View style={{ flexDirection: 'column', gap: 8, justifyContent: 'flex-start',alignItems: 'flex-start'}}>
                      {pokemon.types.map((typeItem, index) => (
                        <View key={index} style={styles.circle}>
                          <Text style={styles.type}>{typeItem.type.name.charAt(0).toUpperCase() + typeItem.type.name.slice(1)}</Text>
                        </View>
                      ))}
                    </View>
                    <Image
                      source={{ uri: pokemon.image }}
                      style={{ width: 80, height: 80 }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Link>
        ))
      }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,  
  },
  name: {
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'white',
    marginBottom: 8,
  },
  type: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  circle: {
    width: 80,
    height: 30,
    borderRadius: 40,
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: "center",
  }
}
);
