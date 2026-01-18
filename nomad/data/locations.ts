import { ImageSourcePropType } from "react-native";

export type MapLocation = {
  title: string;
  latitude: number;
  longitude: number;
  npc: string;
  summary: string;
  guide: string;
  challenges: Challenge[];
  posts: Post[];
};

type Challenge = {
  title: string;
  description: string;
  isCompleted: boolean;
  reward: number;
};

type Post = {
  title: string;
  author: string;
  profilePicture: ImageSourcePropType;
  thumbnail: ImageSourcePropType | null;
  desc: string;
}

export const LOCATIONS: MapLocation[] = [
  {
    title: "Life Sciences Centre",
    latitude: 49.26247800002638,
    longitude: -123.24456013102296,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "The Life Sciences Centre at UBC is a hub for cutting-edge research and education in the life sciences. It houses state-of-the-art laboratories, lecture halls, and collaborative spaces for students and faculty.",
    guide: `
Iconic 1,000-acre urban park on Vancouver's waterfront, known for lush forests, scenic views, and easy access to nature right by downtown 🌲🌊

Highlights:
• Seawall - Famous walking & cycling path with ocean and city views
• Totem Poles - Must-see cultural landmark
• Beaches - English Bay, Second Beach & Third Beach
• Stanley Park Pavilion & Rose Garden
• Wildlife & forest trails - Quiet escapes inside the city

Perfect for biking, walking, picnics, and sunset views.
`,
    challenges: [
      {
        title: "Find Nugget!",
        description: `Nugget is hiding somewhere nearby 👀

Roam around the area and keep exploring until you get close enough to reveal him.
He won't show up on the map right away — you'll need to trust your curiosity and move around.

Within close proximity, Nugget will appear and say hi 🐾
Find him to complete the challenge and unlock your reward!

Hint: Slow down, look around, and explore places you might usually walk past.
        `,
        isCompleted: false,
        reward: 100,
      },
      {
        title: "Sharing is Caring",
        description: "Present your science fair project to the lab team.",
        isCompleted: false,
        reward: 150,
      },
      {
        title: "Just Vibe I Guess?",
        description: "Present your science fair project to the lab team.",
        isCompleted: false,
        reward: 150,
      },
      {
        title: "Hype 'em up",
        description: "Present your science fair project to the lab team.",
        isCompleted: false,
        reward: 100,
      },
    ],
    posts: [
      {
        title: "Accidentally Found a Moment",
  author: "MarioLuigi",
  profilePicture: require("../assets/images/profile.png"),
  thumbnail: require("../assets/images/capilanoBridge.png"),
desc: "I've lived in Vancouver for years, but somehow this was my first time here. The bridge felt way higher than I expected, and the sound of the water rushing below made it surreal. I loved...",
      },
      {
        title: "Solved my boredom today ;)",
  author: "TheGorrilaz",
  profilePicture: require("../assets/images/MC3.png"),
  thumbnail: null,
desc: "I literally just opened this app and I saw the NPC on the Stanley Park today...which was perfect because I was thinking of going there to bike yesterday, just didnt have the push to do it. If anyone's here now, let's meet and get some boba together before we go home ><",
      },
      {
        title: "I found my best zen spot",
  author: "PrincessPeach",
  profilePicture: require("../assets/images/MC2.png"),
  thumbnail: null,
desc: "I've been here a hundred times, but today I actually stopped and looked around. The building is way cooler than I give it credit for, especially when it's buzzing with people between...",
      }
    ]
  },
  {
    title: "Pacific Spirit Park",
    latitude: 49.25767195790329,
    longitude: -123.23144694825908,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "Pacific Spirit Park is a beautiful natural area located in the heart of UBC. It features walking trails, picnic areas, and a peaceful environment for relaxation and recreation.",
    guide: "",
    challenges: [],
    posts:[],
  },
  {
    title: "UBC Botanical Garden",
    latitude: 49.25430024855943,
    longitude: -123.24990399527051,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "The UBC Botanical Garden is a serene and educational space featuring a diverse collection of plants from around the world. It offers a peaceful retreat for students and visitors to enjoy nature and learn about botany.",
    guide: "",
    challenges: [],
    posts:[],
  },
  {
    title: "Acadia Beach",
    latitude: 49.28018959709751,
    longitude: -123.24078448434034,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "Acadia Beach is a scenic coastal area near UBC, offering beautiful views of the ocean and a peaceful environment for relaxation and recreation.",
    guide: "",
    challenges: [],
    posts:[],
  },
];

export const NPC_GAME_LOCATIONS: MapLocation[] = [
  {
    title: "Nugget",
    latitude: 49.26227397998184,
    longitude: -123.24520448576409,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/nugget.png",
    summary: "",
    guide: "",
    challenges: [],
  },
];
