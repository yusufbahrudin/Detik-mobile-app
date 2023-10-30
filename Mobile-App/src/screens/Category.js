import { useEffect, useState } from "react"
import { StyleSheet, View, Text, FlatList } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export default function NewPost({ navigation, route }) {
  const { name } = route
  const [news, setNews] = useState([])

  const { useQuery, gql } = require("@apollo/client")

  const GET_CATEGORY = gql`
    query getCategory {
      category {
        id
        name
        updatedAt
        createdAt
      }
    }
  `

  const { data, loading, error } = useQuery(GET_CATEGORY)

  useEffect(() => {
    setNews(data?.category)
  }, [name, data, loading])

  const renderItem = ({ item, index }) => {
    if (index % 3 === 0) {
      return (
        <View style={styles.categoryList}>
          <Text style={styles.categoryListNumber}>#{index + 1}</Text>
          <View style={styles.categoryListInfo}>
            <Text style={styles.categoryListTitle}>{item.name}</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.categoryList}>
          <Text style={styles.categoryListNumber}>#{index + 1}</Text>
          <View style={styles.categoryListInfoWhite}>
            <Text style={styles.categoryListTitle}>{item.name}</Text>
          </View>
        </View>
      )
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#21409A" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <FlatList data={news} renderItem={renderItem} keyExtractor={(item) => item.id} maxToRenderPerBatch="4" style={{ flex: 1 }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
    backgroundColor: "white",
  },

  loading: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryList: {
    marginBottom: 10,
    height: 80,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  categoryListNumber: {
    fontSize: 35,
  },

  categoryListInfo: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    backgroundColor: "#eee",
    borderRadius: 12,
  },

  categoryListInfoWhite: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
  },

  categoryListTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "justify",
  },
})
