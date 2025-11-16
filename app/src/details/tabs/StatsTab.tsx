import { Text, View } from "react-native";
import styles from "./styles";

export default function StatsTab({ pokemon }){
  return (
      <View style={styles.container}>
      {pokemon.stats.map((s, i) => {
        const value = s.base_stat;
        const max = 100;
          const percentage = Math.min(value, max) / max;

        const barColor = value >= 50 ? "#4CAF50" : "#F44336";

        return (
        <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
            
            <Text style={styles.label}>
              {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
            </Text>

            <Text style={{ width: 40, textAlign: "right", marginRight: 8 }}>
              {value}
            </Text>

            <View style={{ flex: 1, height: 8, backgroundColor: "#EEE", borderRadius: 4 }}>
              <View
                style={{
                  height: "100%",
                  width: `${percentage * 100}%`,
                  backgroundColor: barColor,
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}