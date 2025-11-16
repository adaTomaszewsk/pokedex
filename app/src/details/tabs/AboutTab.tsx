import { Text, View } from "react-native";
import styles from "./styles";

export default function AboutTab({pokemon}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Pokedex number:</Text>
        <Text style={styles.value}>{pokemon.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Height:</Text>
        <Text style={styles.value}>{pokemon.height}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{pokemon.weight}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Abilities</Text>
        <View style={styles.value}>
          {pokemon.abilities.map((a, i) => (
            <Text key={i} style={styles.value}>
              {a.name.charAt(0).toUpperCase() + a.name.slice(1)}
            </Text>
          ))}
        </View>
  
      </View>

    </View>
  )
}