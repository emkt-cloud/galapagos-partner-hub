import camila from "@/assets/user-camila.jpg";
import mateo from "@/assets/user-mateo.jpg";
import valentina from "@/assets/user-valentina.jpg";
import diego from "@/assets/user-diego.jpg";

export type PortalUser = {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  email: string;
  avatar: string;
  commission: number; // percentage
  tier: "Elite" | "Platinum" | "Gold" | "Silver";
  bookings: number;
  miles: number;
  lastActive: string;
};

export const users: PortalUser[] = [
  {
    id: "camila",
    name: "Camila Rivera",
    initials: "CR",
    role: "Sales Manager",
    email: "camila@andestravel.com",
    avatar: camila,
    commission: 14,
    tier: "Elite",
    bookings: 182,
    miles: 48250,
    lastActive: "Today · 09:42",
  },
  {
    id: "mateo",
    name: "Mateo Vásquez",
    initials: "MV",
    role: "Operations Lead",
    email: "mateo@andestravel.com",
    avatar: mateo,
    commission: 12,
    tier: "Platinum",
    bookings: 134,
    miles: 31900,
    lastActive: "Today · 08:15",
  },
  {
    id: "valentina",
    name: "Valentina Silva",
    initials: "VS",
    role: "Travel Advisor",
    email: "valentina@andestravel.com",
    avatar: valentina,
    commission: 10,
    tier: "Gold",
    bookings: 76,
    miles: 18420,
    lastActive: "Yesterday · 18:30",
  },
  {
    id: "diego",
    name: "Diego Morales",
    initials: "DM",
    role: "Reservations",
    email: "diego@andestravel.com",
    avatar: diego,
    commission: 8,
    tier: "Silver",
    bookings: 48,
    miles: 9120,
    lastActive: "2 days ago",
  },
];

export const getUserById = (id: string | null) =>
  users.find((u) => u.id === id) ?? users[0];
