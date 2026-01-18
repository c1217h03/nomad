import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import Button from "./Button";
import CommunityDetailPage from "./CommunityDetailPage";

const closeBtnImg = require("../../assets/images/close.png");
const avatarImg = require("../../assets/images/profile.png");
const coinImg = require("../../assets/images/Coin.png");
const shareImg = require("../../assets/images/icon.png");

type Post = {
  id: string;
  image: any;
  title: string;
  description: string;
  location: string;
};

type Community = {
  id: string;
  name: string;
  description: string;
  icon: any;
  members?: any[];
  joined?: boolean;
};

type CommunityTab = "explore" | "my_communities";

export default function ProfilePostsPage({
  setProfilePage,
}: {
  setProfilePage: (val: any) => void;
}) {
  const [selectedTab, setSelectedTab] = useState<"posts" | "communities">(
    "posts"
  );
  const [communityTab, setCommunityTab] = useState<CommunityTab>("explore");
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  const clickCloseBtn = () => {
    console.log("Close button clicked");
    setProfilePage(null);
  };

  // Sample posts data
  const posts: Post[] = [
    {
      id: "1",
      image: require("../../assets/images/icon.png"),
      title: "Accidentally Found a Moment",
      description:
        "I've lived in Vancouver for years, but somehow this was my first time here. The bridge? It was higher than I expected, and the sound of the water rushing below made it surreal. I loved...",
      location: "Lynn Canyon Suspension Bridge",
    },
    {
      id: "2",
      image: require("../../assets/images/icon.png"),
      title: "Why Is It So Yellow",
      description:
        "I came here out of pure curiousity and immediately asked myself, \"Why is this so... yellow?\" It definitely smells a bit sulfur-ish and I appreciate its existence in nature. There are a...",
      location: "Piles of Sulphur - North Van",
    },
    {
      id: "3",
      image: require("../../assets/images/icon.png"),
      title: "I Finally Looked Around",
      description:
        "I've been here a hundred times. For once, I finally stopped and looked around. The building is way cooler than I give it credit for, especially when it's buzzing with people between...",
      location: "The Nest - UBC Vancouver",
    },
  ];

  const exploreCommunities: Community[] = [
    {
      id: "1",
      name: "activate",
      description:
        "Group of 4 highly motivated, successful, beautiful, humble, and smart girls who happen to be slaying at nwHacks.",
      icon: require("../../assets/images/icon.png"),
      members: [
        require("../../assets/images/icon.png"),
        require("../../assets/images/icon.png"),
        require("../../assets/images/icon.png"),
      ],
    },
    {
      id: "2",
      name: "MarioKart",
      description: "Join to live your dreams",
      icon: require("../../assets/images/icon.png"),
      members: [
        require("../../assets/images/icon.png"),
        require("../../assets/images/icon.png"),
      ],
    },
    {
      id: "3",
      name: "goGOgo",
      description: "Adventure seekers unite",
      icon: require("../../assets/images/icon.png"),
      members: [
        require("../../assets/images/icon.png"),
        require("../../assets/images/icon.png"),
        require("../../assets/images/icon.png"),
      ],
    },
  ];

  const myCommunities: Community[] = [
    {
      id: "1",
      name: "nwHacks",
      description: "Group of coolest hackers ever ;)",
      icon: require("../../assets/images/icon.png"),
      joined: true,
    },
  ];

  const postCount = 3;
  const communityCount = 1;

  // If a community is selected, show its detail page
  if (selectedCommunity) {
    return (
      <CommunityDetailPage
        communityName={selectedCommunity}
        onClose={() => setSelectedCommunity(null)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with close button */}
      <View style={styles.header}>
        <Button btnImage={closeBtnImg} onClick={clickCloseBtn} />
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicContainer}>
          <Image source={avatarImg} style={styles.profilePic} />
        </View>
        <Text style={styles.profileName}>Mario Luigi</Text>
        <Text style={styles.editText}>✎ Edit your character</Text>

        <View style={styles.coinsContainer}>
          <Image source={coinImg} style={styles.coinIcon} />
          <Text style={styles.coinsText}>350</Text>
        </View>
      </View>

      {/* Stats Tabs */}
      <View style={styles.statsContainer}>
        <Pressable
          style={[
            styles.statBox,
            selectedTab === "posts" && styles.statBoxActive,
          ]}
          onPress={() => setSelectedTab("posts")}
        >
          <Text
            style={[
              styles.statNumber,
              selectedTab === "posts" && styles.statTextActive,
            ]}
          >
            {postCount}
          </Text>
          <Text
            style={[
              styles.statLabel,
              selectedTab === "posts" && styles.statTextActive,
            ]}
          >
            posts
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.statBox,
            selectedTab === "communities" && styles.statBoxActive,
          ]}
          onPress={() => setSelectedTab("communities")}
        >
          <Text
            style={[
              styles.statNumber,
              selectedTab === "communities" && styles.statTextActive,
            ]}
          >
            {communityCount}
          </Text>
          <Text
            style={[
              styles.statLabel,
              selectedTab === "communities" && styles.statTextActive,
            ]}
          >
            communities
          </Text>
        </Pressable>
      </View>

      {/* Communities Sub-tabs (only show when communities is selected) */}
      {selectedTab === "communities" && (
        <View style={styles.communityTabsContainer}>
          <Pressable
            style={[
              styles.communityTab,
              communityTab === "explore" && styles.communityTabActive,
            ]}
            onPress={() => setCommunityTab("explore")}
          >
            <Text
              style={[
                styles.communityTabText,
                communityTab === "explore" && styles.communityTabTextActive,
              ]}
            >
              Explore
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.communityTab,
              communityTab === "my_communities" && styles.communityTabActive,
            ]}
            onPress={() => setCommunityTab("my_communities")}
          >
            <Text
              style={[
                styles.communityTabText,
                communityTab === "my_communities" &&
                  styles.communityTabTextActive,
              ]}
            >
              My Communities
            </Text>
          </Pressable>
        </View>
      )}

      {/* Search Bar */}
      {selectedTab === "posts" && (
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts"
            placeholderTextColor="#999"
          />
          <Text style={styles.micIcon}>🎤</Text>
        </View>
      )}

      {selectedTab === "communities" && (
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Communities"
            placeholderTextColor="#999"
          />
          <Text style={styles.micIcon}>🎤</Text>
        </View>
      )}

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {selectedTab === "posts" && (
          <View style={styles.postsContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <Image source={post.image} style={styles.postImage} />

                <View style={styles.postContent}>
                  <View style={styles.locationTag}>
                    <Text style={styles.locationDot}>📍</Text>
                    <Text style={styles.locationTagText}>{post.location}</Text>
                  </View>

                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postDescription} numberOfLines={3}>
                    {post.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedTab === "communities" && communityTab === "explore" && (
          <View style={styles.communitiesContainer}>
            {exploreCommunities.map((community) => (
              <View key={community.id} style={styles.communityCard}>
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityDescription}>
                  {community.description}
                </Text>

                {/* Member avatars with + button */}
                <View style={styles.membersRow}>
                  {community.members?.map((member, idx) => (
                    <Image
                      key={idx}
                      source={member}
                      style={[
                        styles.memberAvatar,
                        idx > 0 && { marginLeft: -8 },
                      ]}
                    />
                  ))}
                  <View style={[styles.addButton, { marginLeft: -8 }]}>
                    <Text style={styles.addButtonText}>+</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {selectedTab === "communities" && communityTab === "my_communities" && (
          <View style={styles.communitiesContainer}>
            {myCommunities.map((community) => (
              <Pressable 
                key={community.id} 
                style={styles.communityCard}
                onPress={() => setSelectedCommunity(community.name)}
              >
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityDescription}>
                  {community.description}
                </Text>
              </Pressable>
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
    paddingTop: 40,
    height: screenHeight,
    width: screenWidth,
    position: "absolute",
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 10,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profilePicContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profilePic: {
    width: 80,
    height: 80,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  editText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  coinsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  coinIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  coinsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#e8f5f1",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  statBoxActive: {
    backgroundColor: "#19b777",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#19b777",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: "#19b777",
    fontWeight: "500",
  },
  statTextActive: {
    color: "#fff",
  },
  communityTabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
    gap: 10,
  },
  communityTab: {
    flex: 1,
    backgroundColor: "#e8f5f1",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  communityTabActive: {
    backgroundColor: "#19b777",
  },
  communityTabText: {
    fontSize: 14,
    color: "#19b777",
    fontWeight: "600",
  },
  communityTabTextActive: {
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  micIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  scrollView: {
    width: "100%",
    flex: 1,
  },
  postsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  postContent: {
    padding: 15,
  },
  locationTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#19b777",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  locationDot: {
    fontSize: 10,
    marginRight: 4,
  },
  locationTagText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "500",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#19b777",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  communitiesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  communityCard: {
    backgroundColor: "#f0ebe3",
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
  },
  communityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },
  communityDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  membersRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  addButtonText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
  },
});