import { useEffect, useState } from "react"
import { StyleSheet, Image, View, Text, TouchableNativeFeedback, FlatList } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { useQuery, gql } from "@apollo/client"

const GET_NEWS = gql`
  query getNews {
    news {
      id
      title
      slug
      content
      imgUrl
      categoryId
      authorId
      userMongoId
      createdAt
      updatedAt
      Category {
        id
        name
        updatedAt
        createdAt
      }
      Tags {
        id
        postId
        name
        updatedAt
        createdAt
      }
    }
  }
`

export default function NewPost({ navigation, route }) {
  const { name } = route
  const [news, setNews] = useState()
  const [highlight, setHighlight] = useState(0)
  const { data, error, loading } = useQuery(GET_NEWS)

  const getNews = async () => {
    setNews(data?.news)
    setHighlight(Math.floor(Math.random() * data?.news?.length))
  }

  function formatTimeAgo(timestamp) {
    const currentDate = new Date()
    const inputDate = new Date(timestamp)

    const timeDifference = currentDate - inputDate
    const minutesAgo = Math.floor(timeDifference / (1000 * 60))
    const hoursAgo = Math.floor(minutesAgo / 60)
    const daysAgo = Math.floor(hoursAgo / 24)

    if (minutesAgo < 1) {
      return "kurang dari 1 menit yang lalu"
    } else if (minutesAgo < 60) {
      return `${minutesAgo} menit yang lalu`
    } else if (hoursAgo < 24) {
      return `${hoursAgo} jam yang lalu`
    } else {
      return `${daysAgo} hari yang lalu`
    }
  }

  const HighlightNews = () => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("Detail", { slug: news[highlight]?.slug })
        }}
      >
        <View style={styles.highlightBox}>
          <Image source={{ uri: `${news[highlight]?.imgUrl}` }} style={styles.hightlightImg} />
          <View style={styles.highlightInfo}>
            <Text style={styles.highlightTitle}>{news[highlight]?.title}</Text>
            <Text style={styles.highlightDetail}>detikInet . {formatTimeAgo(new Date(news[highlight]?.createdAt))}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return <HighlightNews />
    } else {
      return (
        <TouchableNativeFeedback
          onPress={() => {
            navigation.navigate("Detail", { slug: item.slug })
          }}
        >
          <View style={styles.newsList}>
            <Image source={{ uri: `${item.imgUrl}` }} style={styles.newsListImg} />
            <View style={styles.newsListInfo}>
              <Text style={styles.newsListTitle}>{item.title}</Text>
              <Text style={styles.newsListDetail}>detikInet . {formatTimeAgo(new Date(item.createdAt))}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      )
    }
  }

  useEffect(() => {
    getNews()
  }, [name, data])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#21409A" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <FlatList data={news} renderItem={renderItem} keyExtractor={(item) => item.id} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  loading: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  highlightBox: {
    height: 280,
    backgroundColor: "#21409A",
    borderRadius: 10,
    marginBottom: 10,
  },

  highlightInfo: {
    padding: 10,
  },

  highlightTitle: {
    color: "white",
    fontSize: 20,
    textAlign: "justify",
  },

  highlightDetail: {
    color: "#ccceee",
  },

  hightlightImg: {
    height: "70%",
    width: "100%",
    objectFit: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  newsList: {
    marginBottom: 10,
    height: 110,
    flexDirection: "row",
  },

  newsListImg: {
    width: "30%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 10,
  },

  newsListInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  newsListTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "justify",
  },

  newsListDetail: {
    color: "#2C2C2C",
  },
})
