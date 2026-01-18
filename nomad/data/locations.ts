export type MapLocation = {
  title: string;
  latitude: number;
  longitude: number;
  npc: string;
  summary: string;
};

export const LOCATIONS: MapLocation[] = [
  {
    title: "Life Sciences Centre",
    latitude: 49.26247800002638,
    longitude: -123.24456013102296,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "The Life Sciences Centre at UBC is a hub for cutting-edge research and education in the life sciences. It houses state-of-the-art laboratories, lecture halls, and collaborative spaces for students and faculty.",
  },
  {
    title: "Pacific Spirit Park",
    latitude: 49.25767195790329,
    longitude: -123.23144694825908,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "Pacific Spirit Park is a beautiful natural area located in the heart of UBC. It features walking trails, picnic areas, and a peaceful environment for relaxation and recreation.",
  },
  {
    title: "UBC Botanical Garden",
    latitude: 49.25430024855943,
    longitude: -123.24990399527051,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "The UBC Botanical Garden is a serene and educational space featuring a diverse collection of plants from around the world. It offers a peaceful retreat for students and visitors to enjoy nature and learn about botany.",
  },
  {
    title: "Acadia Beach",
    latitude: 49.28018959709751,
    longitude: -123.24078448434034,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
    summary:
      "Acadia Beach is a scenic coastal area near UBC, offering beautiful views of the ocean and a peaceful environment for relaxation and recreation.",
  },
];

export const NPC_GAME_LOCATIONS: MapLocation[] = [
  {
    title: "Nugget",
    latitude: 49.26227397998184,
    longitude: -123.24520448576409,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/nugget.png",
    summary: "",
  },
];
