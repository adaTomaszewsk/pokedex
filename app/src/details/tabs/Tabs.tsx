import { StyleSheet, Text, View } from "react-native";

export default function Tabs({activeCard, setActiveCard}){
  return (
    <View style={styles.wrapper}>
      {["about", "stats", "evolution", "moves"].map((tab) => (
        <Text
          key={tab}
          style={[styles.tab, activeCard === tab && styles.active]}
          onPress={() => setActiveCard(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </Text>
      ))}
    </View>
  );

}

const styles = StyleSheet.create({
  wrapper: {
  flexDirection: "row", 
  justifyContent: "space-around", 
  marginVertical: 12
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "#777",
    fontSize: 16,
    fontWeight: "600",
  }, 
  activeTab: {
    color: "black",
    borderBottomWidth: 3,
    borderBottomColor: "#4F7", 
  }
  }
);

