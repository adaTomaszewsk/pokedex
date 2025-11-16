import { StyleSheet, Text, View } from "react-native";

export default function AboutTab({pokemon}) {
  return (
    <View style={styles.container}>

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%"
  },
  label: {
    width: "40%",
    color: "#777",
    fontWeight: "600",
    fontSize: 16,
  },
  value: {
    width: "60%",
    color: "#333",
    fontSize: 16,
    fontWeight: "500"
  }
}
);