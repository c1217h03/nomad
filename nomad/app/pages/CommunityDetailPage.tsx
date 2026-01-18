import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Button from "./Button";

const closeBtnImg = require("../../assets/images/close.png");

type Member = {
  id: string;
  username: string;
  avatar: any;
  postCount: number;
};

type CommunityPost = {
  id: string;
  author: string;
  authorAvatar: any;
  image: any;
  title: string;
  description: string;
};

type Props = {
  communityName: string;
  onClose: () => void;
};

export default function CommunityDetailPage({
  communityName,
  onClose,
}: Props) {
  const [selectedTab, setSelectedTab] = useState<"posts" | "members">("posts");

  // Sample members data
  const members: Member[] = [
    {
      id: "1",
      username: "@MarioLuigi",
      avatar: require("../../assets/images/profile.png"),
      postCount: 3,
    },
    {
      id: "2",
      username: "@TheGorillaz",
      avatar: require("../../assets/images/MC2.png"),
      postCount: 17,
    },
    {
      id: "3",
      username: "@GoldSilvetta",
      avatar: require("../../assets/images/MC3.png"),
      postCount: 5,
    },
    {
      id: "4",
      username: "@PrincessPeach",
      avatar: require("../../assets/images/MC4.png"),
      postCount: 44,
    },
  ];

  // Sample posts data
  const posts: CommunityPost[] = [
    {
      id: "1",
      author: "Mario Luigi",
      authorAvatar: require("../../assets/images/profile.png"),
      image: require("../../assets/images/icon.png"),
      title: "Accidentally Found a Moment",
      description:
        "I've lived in Vancouver for years, but somehow this was my first time here. The bridge felt way higher than I expected, and the sound of the water rushing below made it surreal. I loved...",
    },
    {
      id: "2",
      author: "TheGorillaz",
      authorAvatar: require("../../assets/images/MC2.png"),
      image: require("../../assets/images/icon.png"),
      title: "Solved my boredom today ;)",
      description:
        "I literally just opened this app and I saw the NPC on the screen for today, which was perfect because I was thinking of going there to bike yesterday, just didn't have the time to do it. If anyone's here now, let's meet and get some boba together before we go home ><",
    },
    {
      id: "3",
      author: "PrincessPeach",
      authorAvatar: require("../../assets/images/MC3.png"),
      image: require("../../assets/images/icon.png"),
      title: "I found my best zen spot",
      description:
        "I've been here a hundred times, but today I actually stopped and looked around. The building is way cooler than I give it credit for, especially when it's buzzing with people between...",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.communityTitle}>{communityName}</Text>
        <View style={styles.headerButtons}>
          <Pressable
            style={[
              styles.headerTab,
              selectedTab === "posts" && styles.headerTabActive,
            ]}
            onPress={() => setSelectedTab("posts")}
          >
            <Text
              style={[
                styles.headerTabText,
                selectedTab === "posts" && styles.headerTabTextActive,
              ]}
            >
              Posts
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.headerTab,
              selectedTab === "members" && styles.headerTabActive,
            ]}
            onPress={() => setSelectedTab("members")}
          >
            <Text
              style={[
                styles.headerTabText,
                selectedTab === "members" && styles.headerTabTextActive,
              ]}
            >
              Members ({members.length})
            </Text>
          </Pressable>
        </View>
        <Button btnImage={closeBtnImg} onClick={onClose} />
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {selectedTab === "posts" && (
          <View style={styles.postsContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                {/* Author info */}
                <View style={styles.authorRow}>
                  <Image source={post.authorAvatar} style={styles.authorAvatar} />
                  <Text style={styles.authorName}>{post.author}</Text>
                </View>

                {/* Post image */}
                <Image source={post.image} style={styles.postImage} />

                {/* Post content */}
                <View style={styles.postContent}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postDescription} numberOfLines={4}>
                    {post.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedTab === "members" && (
          <View style={styles.membersContainer}>
            {members.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <Image source={member.avatar} style={styles.memberAvatar} />
                <View style={styles.memberInfo}>
                  <Text style={styles.memberUsername}>{member.username}</Text>
                  <View style={styles.postCountBadge}>
                    <Text style={styles.postCountText}>
                      {member.postCount} posts
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
    width: screenWidth,
    position: "absolute",
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  communityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  headerTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  headerTabActive: {
    backgroundColor: "#19b777",
  },
  headerTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  headerTabTextActive: {
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  postsContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: "#f0ebe3",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  postImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  postContent: {
    padding: 15,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#19b777",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  membersContainer: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberUsername: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  postCountBadge: {
    backgroundColor: "#19b777",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postCountText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
});