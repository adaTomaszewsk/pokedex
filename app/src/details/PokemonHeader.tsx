import { Image, StyleSheet, Text, View } from "react-native";
import { ColorsByType } from "../constants/colors";

export default function PokemonHeader({ pokemon} ){
  return <View style={{paddingTop: 70, paddingHorizontal:16,  backgroundColor: ColorsByType[pokemon.types[0].name] +50}}>
            <Text style={styles.title}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
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
                style={{ width: 260 , height: 160 
                }}
                resizeMode="contain"
              />
              <Image 
              source={require('../../../assets/images/Pokeball.png')}
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                right: -40,
                top: -20,
                tintColor: "white",
                opacity: 0.15,
              }}/>
            </View>
          </View>
    
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

