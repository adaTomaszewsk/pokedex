import { StyleSheet } from "react-native";

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
  },
  boldText: {
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 20
}
}
);

export default styles;