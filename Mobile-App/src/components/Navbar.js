import { MaterialIcons } from "@expo/vector-icons"
import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Navbar() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.banner}>
          <Image
            source={{ uri: "https://akcdn.detik.net.id/community/media/visual/2019/06/28/2846568b-3057-49c6-8125-ff5135d07312.png?d=1" }}
            style={styles.logo}
          />
          <View style={styles.rightIcon}>
            <MaterialIcons name="search" size={28} color="gray" />
            <MaterialIcons name="account-circle" size={28} color="gray" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "12%",
  },

  navbar: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },

  banner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 6,
    paddingRight: 6,
  },

  logo: {
    height: "100%",
    width: 130,
    objectFit: "contain",
  },

  rightIcon: {
    flexDirection: "row",
    gap: 10,
  },
})
