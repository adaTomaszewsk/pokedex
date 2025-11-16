import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import PokemonHeader from "./src/details/PokemonHeader";
import AboutTab from "./src/details/tabs/AboutTab";
import EvolutionTab from "./src/details/tabs/EvolutionTab";
import MovesTab from "./src/details/tabs/MovesTab";
import StatsTab from "./src/details/tabs/StatsTab";
import Tabs from "./src/details/tabs/Tabs";
import { Pokemon } from "./types/pokemon";


export default function Details() {
    const params = useLocalSearchParams();
    const [pokemon, setPokemon] = useState<Pokemon[]>(null);
    const [activeCard, setActiveCard] = useState<"about" | "stats" | "evolution" | "moves">("about");

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
        <PokemonHeader pokemon={pokemon}/>
        <View style={{
          flex:1,
          backgroundColor: "white",
          padding: 16,
          borderTopLeftRadius: 40, 
          borderTopRightRadius: 40, 
          marginTop: -30,
          }}>

          
        <Tabs activeCard={activeCard} setActiveCard={setActiveCard} />
        {activeCard === "about" && <AboutTab pokemon={pokemon}/>}

        {activeCard === "stats" && <StatsTab pokemon={pokemon}/>}

          {activeCard === "evolution" && <EvolutionTab pokemon={pokemon}/>}

          {activeCard === "moves" && <MovesTab pokemon={pokemon}/>}

        </View>
    </>
  );
}

