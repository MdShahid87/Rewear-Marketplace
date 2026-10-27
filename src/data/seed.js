import { estimateSwapValue } from "../utils/swapValue";

// Defines supported cities and their geographic coordinates.
export const CITIES = [
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
];

// Defines the available clothing categories.
export const CATEGORIES = [
  "Tops",
  "Bottoms",
  "Dresses",
  "Outerwear",
  "Footwear",
  "Accessories",
];

// Defines the available clothing sizes.
export const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "28",
  "30",
  "32",
  "34",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Free",
];

// Defines the supported clothing conditions.
export const CONDITIONS = ["New", "Like New", "Good", "Fair"];

// Defines the possible statuses of a swap request.
export const SWAP_STATUSES = [
  "pending",
  "negotiating",
  "accepted",
  "shipped",
  "completed",
  "rejected",
];

const city = (name) => CITIES.find((c) => c.name === name);

// Provides sample user accounts for the initial application state
export const seedUsers = [
  {
    id: "u-demo",
    name: "Aisha Rahman",
    email: "demo@rewear.com",
    password: "demo123",
    role: "user",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    bio: "Slow-fashion advocate swapping pieces I have already loved.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    joinedAt: "2025-11-02T10:00:00.000Z",
  },
  {
    id: "u-admin",
    name: "Kabir Mehta",
    email: "admin@rewear.com",
    password: "admin123",
    role: "admin",
    city: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    bio: "Platform moderator keeping swaps fair and listings genuine.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    joinedAt: "2025-08-14T09:00:00.000Z",
  },
  {
    id: "u-2",
    name: "Rohan Desai",
    email: "rohan@rewear.com",
    password: "swap123",
    role: "user",
    city: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    bio: "Denim collector. Prefer local meetups near Koregaon Park.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-11d1d0b0b1a5?w=200&h=200&fit=crop",
    joinedAt: "2026-01-18T08:00:00.000Z",
  },
  {
    id: "u-3",
    name: "Meera Iyer",
    email: "meera@rewear.com",
    password: "swap123",
    role: "user",
    city: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    bio: "Workwear by day, linen by weekend.",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    joinedAt: "2026-02-03T08:00:00.000Z",
  },
  {
    id: "u-4",
    name: "Arjun Nair",
    email: "arjun@rewear.com",
    password: "swap123",
    role: "user",
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    bio: "Sneaker swaps and cotton shirts only.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd722bf5d?w=200&h=200&fit=crop",
    joinedAt: "2026-03-11T08:00:00.000Z",
  },
  {
    id: "u-5",
    name: "Sana Qureshi",
    email: "sana@rewear.com",
    password: "swap123",
    role: "user",
    city: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    bio: "Looking for festive wear in good condition.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
    joinedAt: "2026-04-21T08:00:00.000Z",
  },
  {
    id: "u-6",
    name: "Nikhil Bose",
    email: "nikhil@rewear.com",
    password: "swap123",
    role: "user",
    city: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    bio: "Vintage jackets and khadi shirts.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    joinedAt: "2026-05-09T08:00:00.000Z",
  },
  {
    id: "u-7",
    name: "Priya Shah",
    email: "priya@rewear.com",
    password: "swap123",
    role: "user",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    bio: "Neighbourhood swaps in Bandra and Andheri.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    joinedAt: "2026-06-02T08:00:00.000Z",
  },
];

const listing = (item) => ({
  ...item,
  estimatedValue: estimateSwapValue(item),
  createdAt: item.createdAt,
  status: item.status || "available",
});

export const seedListings = [
  listing({
    id: "c-1",
    ownerId: "u-2",
    title: "Levi's Trucker Jacket in Dark Indigo",
    category: "Outerwear",
    type: "Denim jacket",
    brand: "Levi's",
    size: "M",
    condition: "Good",
    description:
      "Classic Type III trucker jacket. Softened from regular wear, no stains, original buttons intact. Ideal for winter layering in Pune.",
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&h=1100&fit=crop",
    city: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    createdAt: "2026-09-12T09:00:00.000Z",
  }),
  listing({
    id: "c-2",
    ownerId: "u-3",
    title: "Uniqlo Linen Shirt in Sand",
    category: "Tops",
    type: "Shirt",
    brand: "Uniqlo",
    size: "S",
    condition: "Like New",
    description:
      "Breathable linen-cotton blend. Worn twice for office Fridays. No pilling. Looking to swap for a similar blouse or knit.",
    imageUrl:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&h=1100&fit=crop",
    city: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    createdAt: "2026-09-20T09:00:00.000Z",
  }),
  listing({
    id: "c-3",
    ownerId: "u-5",
    title: "Biba Anarkali in Ivory Gold",
    category: "Dresses",
    type: "Festive dress",
    brand: "Biba",
    size: "M",
    condition: "Like New",
    description:
      "Worn once for a wedding. Zari work is intact, inner lining clean. Prefer swapping for another festive set or a winter coat.",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d85d3f?w=900&h=1100&fit=crop",
    city: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    createdAt: "2026-08-28T09:00:00.000Z",
  }),
  listing({
    id: "c-4",
    ownerId: "u-4",
    title: "Nike Air Force 1 White",
    category: "Footwear",
    type: "Sneakers",
    brand: "Nike",
    size: "9",
    condition: "Good",
    description:
      "UK 9. Cleaned and recrafted soles. Slight crease on vamp. Happy to courier or meet in T. Nagar.",
    imageUrl:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=900&h=1100&fit=crop",
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    createdAt: "2026-09-02T09:00:00.000Z",
  }),
  listing({
    id: "c-5",
    ownerId: "u-7",
    title: "Zara Oversized Blazer in Camel",
    category: "Outerwear",
    type: "Blazer",
    brand: "Zara",
    size: "S",
    condition: "Like New",
    description:
      "Structured shoulders, still has spare buttons. From the 2025 autumn drop. Looking for trousers or a knit dress.",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&h=1100&fit=crop",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    createdAt: "2026-09-25T09:00:00.000Z",
  }),
  listing({
    id: "c-6",
    ownerId: "u-6",
    title: "Fabindia Khadi Kurta",
    category: "Tops",
    type: "Kurta",
    brand: "Fabindia",
    size: "L",
    condition: "Good",
    description:
      "Handloom khadi, indigo dye. Softened with washes. One tiny repair near the hem, barely visible.",
    imageUrl:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=900&h=1100&fit=crop",
    city: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    createdAt: "2026-08-18T09:00:00.000Z",
  }),
  listing({
    id: "c-7",
    ownerId: "u-3",
    title: "Mango Pleated Midi Skirt",
    category: "Bottoms",
    type: "Skirt",
    brand: "Mango",
    size: "S",
    condition: "New",
    description:
      "Tags removed but never worn — too long for my height. Olive green, side zip. Open to dresses or loafers.",
    imageUrl:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=900&h=1100&fit=crop",
    city: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    createdAt: "2026-09-30T09:00:00.000Z",
  }),
  listing({
    id: "c-8",
    ownerId: "u-2",
    title: "Levi's 511 Slim Jeans",
    category: "Bottoms",
    type: "Jeans",
    brand: "Levi's",
    size: "32",
    condition: "Good",
    description:
      "Medium wash, no rips. Inseam 32. Looking to rotate for chinos or a hooded jacket.",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&h=1100&fit=crop",
    city: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    createdAt: "2026-09-08T09:00:00.000Z",
  }),
  listing({
    id: "c-9",
    ownerId: "u-5",
    title: "H&M Ribbed Knit Sweater",
    category: "Tops",
    type: "Sweater",
    brand: "H&M",
    size: "M",
    condition: "Good",
    description:
      "Charcoal merino-blend. Warm for Delhi winters. One tiny pull on the cuff.",
    imageUrl:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=900&h=1100&fit=crop",
    city: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    createdAt: "2026-09-14T09:00:00.000Z",
  }),
  listing({
    id: "c-10",
    ownerId: "u-4",
    title: "Adidas Samba OG",
    category: "Footwear",
    type: "Sneakers",
    brand: "Adidas",
    size: "8",
    condition: "Like New",
    description:
      "Black gum-sole Sambas. Indoor use only. Box not included. Prefer swapping for a cotton overshirt.",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&h=1100&fit=crop",
    city: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    createdAt: "2026-09-22T09:00:00.000Z",
  }),
  listing({
    id: "c-11",
    ownerId: "u-7",
    title: "Allen Solly Oxford Shirt",
    category: "Tops",
    type: "Formal shirt",
    brand: "Allen Solly",
    size: "M",
    condition: "Good",
    description:
      "Sky blue oxford, regular fit. Office rotation piece. Collar stays included.",
    imageUrl:
      "https://images.unsplash.com/photo-1598033125813-2c21ea81f28c?w=900&h=1100&fit=crop",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    createdAt: "2026-08-30T09:00:00.000Z",
  }),
  listing({
    id: "c-12",
    ownerId: "u-6",
    title: "Woodland Leather Boots",
    category: "Footwear",
    type: "Boots",
    brand: "Woodland",
    size: "10",
    condition: "Fair",
    description:
      "Brown hiking boots, well worn but structurally sound. Recently polished. Honest wear on the toe box.",
    imageUrl:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=900&h=1100&fit=crop",
    city: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    createdAt: "2026-07-19T09:00:00.000Z",
  }),
  listing({
    id: "c-13",
    ownerId: "u-3",
    title: "Calvin Klein Crossbody Bag",
    category: "Accessories",
    type: "Bag",
    brand: "Calvin Klein",
    size: "Free",
    condition: "Like New",
    description:
      "Black pebbled leather, gold hardware. Barely used. Want a scarf or a structured belt in return.",
    imageUrl:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&h=1100&fit=crop",
    city: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    createdAt: "2026-09-18T09:00:00.000Z",
  }),
  listing({
    id: "c-14",
    ownerId: "u-demo",
    title: "Uniqlo Heattech Crew Neck",
    category: "Tops",
    type: "Base layer",
    brand: "Uniqlo",
    size: "M",
    condition: "Like New",
    description:
      "Black Heattech, size M. Worn one season. Looking for a similar knit or a pair of straight jeans.",
    imageUrl:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&h=1100&fit=crop",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    createdAt: "2026-09-05T09:00:00.000Z",
  }),
  listing({
    id: "c-15",
    ownerId: "u-demo",
    title: "H&M Floral Midi Dress",
    category: "Dresses",
    type: "Casual dress",
    brand: "H&M",
    size: "S",
    condition: "Good",
    description:
      "Cotton poplin, side pockets. Length hits mid-calf on 5'5\". Slight fade near the hem from washing.",
    imageUrl:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=900&h=1100&fit=crop",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    createdAt: "2026-09-16T09:00:00.000Z",
  }),
  listing({
    id: "c-16",
    ownerId: "u-7",
    title: "Puma Training Joggers",
    category: "Bottoms",
    type: "Joggers",
    brand: "Puma",
    size: "M",
    condition: "Good",
    description:
      "Navy tapered joggers with zip pockets. Elastic still firm. Gym-to-errand piece.",
    imageUrl:
      "https://images.unsplash.com/photo-1552902865-b72c03480563?w=900&h=1100&fit=crop",
    city: "Mumbai",
    lat: 19.076,
    lng: 72.8777,
    createdAt: "2026-09-11T09:00:00.000Z",
  }),
  listing({
    id: "c-17",
    ownerId: "u-5",
    title: "Ralph Lauren Polo Shirt",
    category: "Tops",
    type: "Polo",
    brand: "Ralph Lauren",
    size: "L",
    condition: "Good",
    description:
      "Navy polo, embroidered pony. No collar roll. Gifted, slightly oversized for me.",
    imageUrl:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=900&h=1100&fit=crop",
    city: "Delhi",
    lat: 28.6139,
    lng: 77.209,
    createdAt: "2026-08-22T09:00:00.000Z",
  }),
  listing({
    id: "c-18",
    ownerId: "u-2",
    title: "Van Heusen Wool Overcoat",
    category: "Outerwear",
    type: "Coat",
    brand: "Van Heusen",
    size: "L",
    condition: "Like New",
    description:
      "Charcoal wool blend, single breasted. Dry-cleaned last month. Prefer a leather bag or boots in return.",
    imageUrl:
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=900&h=1100&fit=crop",
    city: "Pune",
    lat: 18.5204,
    lng: 73.8567,
    createdAt: "2026-09-27T09:00:00.000Z",
  }),
];

// Provides sample swap requests for demonstrating the swap workflow.
export const seedSwaps = [
  {
    id: "s-1",
    fromUserId: "u-demo",
    toUserId: "u-7",
    offeredItemId: "c-14",
    requestedItemId: "c-5",
    status: "negotiating",
    meetingType: "local",
    createdAt: "2026-10-08T11:20:00.000Z",
    updatedAt: "2026-10-10T16:40:00.000Z",
  },
  {
    id: "s-2",
    fromUserId: "u-3",
    toUserId: "u-demo",
    offeredItemId: "c-2",
    requestedItemId: "c-15",
    status: "pending",
    meetingType: "courier",
    createdAt: "2026-10-12T08:15:00.000Z",
    updatedAt: "2026-10-12T08:15:00.000Z",
  },
  {
    id: "s-3",
    fromUserId: "u-4",
    toUserId: "u-2",
    offeredItemId: "c-4",
    requestedItemId: "c-1",
    status: "completed",
    meetingType: "courier",
    createdAt: "2026-08-02T10:00:00.000Z",
    updatedAt: "2026-08-19T10:00:00.000Z",
  },
];

// Provides sample messages linked to swap conversations.
export const seedMessages = [
  {
    id: "m-1",
    swapId: "s-1",
    senderId: "u-demo",
    text: "Hi Priya — the camel blazer would pair well with my work trousers. I can offer the Heattech plus a local meetup in Bandra.",
    createdAt: "2026-10-08T11:22:00.000Z",
  },
  {
    id: "m-2",
    swapId: "s-1",
    senderId: "u-7",
    text: "I like the crew neck. Could we meet at Linking Road on Saturday around 4pm?",
    createdAt: "2026-10-09T09:05:00.000Z",
  },
  {
    id: "m-3",
    swapId: "s-1",
    senderId: "u-demo",
    text: "Saturday 4pm works. I will bring a tote so we can try lengths on the spot.",
    createdAt: "2026-10-10T16:40:00.000Z",
  },
  {
    id: "m-4",
    swapId: "s-2",
    senderId: "u-3",
    text: "Your floral midi is exactly my size. Happy to courier the linen shirt from Bengaluru if the values feel fair.",
    createdAt: "2026-10-12T08:16:00.000Z",
  },
];

// Creates the initial application store using the seed data.
export function createSeedStore() {
  return {
    users: seedUsers,
    listings: seedListings,
    swaps: seedSwaps,
    messages: seedMessages,
    sessionUserId: null,
  };
}

// Exposes the city lookup helper for use in other modules.
export { city };
