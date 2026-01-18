export type MapLocation = {
  title: string;
  latitude: number;
  longitude: number;
  npc: string;
};

export const LOCATIONS: MapLocation[] = [
  {
    title: "Life Sciences Centre",
    latitude: 49.26247800002638,
    longitude: -123.24456013102296,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
  },
  {
    title: "Pacific Spirit Park",
    latitude: 49.25767195790329,
    longitude: -123.23144694825908,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
  },
  {
    title: "UBC Botanical Garden",
    latitude: 49.25430024855943,
    longitude: -123.24990399527051,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
  },
  {
    title: "Acadia Beach",
    latitude: 49.28018959709751,
    longitude: -123.24078448434034,
    npc: "https://raw.githubusercontent.com/c1217h03/nomad/main/nomad/assets/images/NPC.png",
  },
];
