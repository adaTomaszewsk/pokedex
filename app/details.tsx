import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ColorsByType } from "./src/constants/colors";
import { Pokemon } from "./types/pokemon";


export default function Details() {
    const params = useLocalSearchParams();
    const [pokemon, setPokemon] = useState<Pokemon[]>(null);

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

      const mappedPokemon: Pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        base_experience: data.base_experience,
        types: data.types.map((t: any) => ({
          name: t.type.name,
          url: t.type.url,
        })),
        stats: data.stats.map((s: any) => ({
          base_stat: s.base_stat,
          name: s.stat.name,
          url: s.stat.url || "",
        })),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a: any) => ({
          name: a.ability.name,
          url: a.ability.url,
        })),
        description: data.description || "",
        genera: data.genera || "",
        pokedex_number: data.pokedex_number || "",
        gender_rate: data.gender_rate || 0,
        egg_groups: data.egg_groups || [],
      };
      setPokemon(mappedPokemon);
      //console.log(mappedPokemon);
      }catch(e){
        console.log(e);
      }
    }

    if (!pokemon) {
      return <Text style={{ color: "white", padding: 16 }}>Loading...</Text>;
    }

    return (
     <>
        <View style={{paddingTop: 70, paddingHorizontal:16,  backgroundColor: ColorsByType[pokemon.types[0].name] +50}}>
          <Text style={styles.title}>{params.name.charAt(0).toUpperCase() + params.name.slice(1)}</Text>
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-start',alignItems: 'flex-start', marginTop:16,}}>
            {pokemon.types.map((typeItem, index) => (
              <View key={index} style={styles.circle}>
                <Text style={styles}>{typeItem.name.charAt(0).toUpperCase() + typeItem.name.slice(1)}</Text>
              </View>
            ))}
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: pokemon?.image }}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{
        flex:1,
        backgroundColor: "white",
        padding: 16,
        borderTopLeftRadius: 24, 
        borderTopRightRadius: 24, 
        marginTop: -30,
        }}>
          <Text style={styles.title}>{params.name.charAt(0).toUpperCase() + params.name.slice(1)}</Text>
        </View>
     </>
  );
}
  const styles = StyleSheet.create({
    title: {
      color: "white",
      fontSize: 28,
      fontWeight: "bold",

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

