import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import { MapLocation } from "../../data/locations";

type Props = {
  posts: MapLocation["posts"];
};

export default function Posts({ posts }: Props) {
  return (
    <View>
      {/* Page Title */}
      <Text style={styles.pageTitle}>Posts</Text>

      {/* Posts List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
            <View key={index} style={styles.postCard}>
              {/* Author Badge */}
              <View style={styles.authorBadge}>
                <Image
                  source={post.profilePicture}
                  style={styles.profilePicture}
                />
                <Text style={styles.authorName}>{post.author}</Text>
              </View>

              {/* Thumbnail Image (if exists) */}
              {post.thumbnail && (
                <Image
                  source={post.thumbnail}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              )}

              {/* Post Title */}
              <Text style={styles.postTitle}>{post.title}</Text>

              {/* Post Description */}
              <Text style={styles.postDescription}>{post.desc}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
            <Text style={styles.emptySubtext}>
              Be the first to share your experience!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: "#EFE7DA",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  authorBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#005F4B",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginBottom: 14,
  },
  profilePicture: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  authorName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 14,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#005F4B",
    marginBottom: 10,
    lineHeight: 28,
  },
  postDescription: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
});
