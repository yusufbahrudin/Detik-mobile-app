import { StyleSheet, View } from "react-native"
import Navbar from "../components/Navbar"
import MainTab from "../navigator/MainTab"

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Navbar />
      <MainTab />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
})
