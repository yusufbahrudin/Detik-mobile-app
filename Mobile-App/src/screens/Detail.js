import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native-paper"

import { useQuery, gql } from "@apollo/client"

const getDetail = gql`
  query getDetail($slug: String) {
    getNewsDetail(slug: $slug) {
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
        createdAt
        id
        name
        postId
        updatedAt
      }
      User {
        _id
        username
        email
        phoneNumber
        address
        role
      }
    }
  }
`

export default function Detail({ navigation, route }) {
  const [news, setNews] = useState({})
  const { slug } = route.params

  const { loading, error, data } = useQuery(getDetail, {
    variables: {
      slug: slug,
    },
  })

  const formatTime = (timestamp) => {
    const inputDate = new Date(timestamp)
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Asia/Jakarta",
    }

    return inputDate.toLocaleDateString("id-ID", options)
  }

  useEffect(() => {
    setNews(data)
    console.log(data)
  }, [slug, loading, error])

  if (error) {
    console.log("📌 error: ", error)
    alert("Failed to get news, connection failed..")
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color="#21409A" />
      </View>
    )
  } else {
    return (
      <ScrollView style={styles.container}>
        <Image source={{ uri: `${news?.getNewsDetail?.imgUrl}` }} style={styles.detailNewsImg} />

        <View style={styles.detailInfo}>
          <Text style={styles.detailMedia}>detikNews</Text>
          <Text style={styles.detailNewsTitle}>{news?.getNewsDetail?.title}</Text>
          <Text style={styles.detailUpdated}>
            Admin ( {news?.getNewsDetail?.User?.email} / {news?.getNewsDetail?.User?.username} ) - detikNews
          </Text>
          <Text style={styles.detailUpdated}>{formatTime(news?.getNewsDetail?.createdAt)} WIB</Text>
          <Text style={styles.detailUpdated}>Category: {news?.getNewsDetail?.Category?.name}</Text>
          <Text style={styles.detailNewsContent}>{news?.getNewsDetail?.content}</Text>
          <View style={styles.detailNewsTags}>
            {news?.getNewsDetail?.Tags?.map((item) => (
              <Text key={item.id} style={styles.detailNewsTagText}>
                #{item.name}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  detailInfo: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  detailNewsImg: {
    height: 280,
    objectFit: "cover",
  },

  detailMedia: {
    color: "#21409A",
    fontSize: 16,
    fontWeight: "bold",
  },

  detailUpdated: {
    color: "#bbb",
    fontSize: 12,
    fontWeight: "bold",
  },

  detailNewsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 18,
  },

  detailNewsContent: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "justify",
    lineHeight: 27,
  },

  detailNewsTags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },

  detailNewsTagText: {
    fontWeight: "bold",
    color: "#21409A",
  },
})
