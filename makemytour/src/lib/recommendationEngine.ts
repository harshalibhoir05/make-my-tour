//6
export interface Recommendation {
  id: number;
  title: string;
  type: "hotel" | "flight";
  reason: string;
}

export const getRecommendations = (): Recommendation[] => {
  if (typeof window === "undefined") return [];

  const history = JSON.parse(localStorage.getItem("userHistory") || "[]");

  if (history.includes("beach")) {
    return [
      { id: 1, title: "Goa Beach Resort", type: "hotel", reason: "You liked beaches!" },
      { id: 2, title: "Bali Ocean View Hotel", type: "hotel", reason: "You liked beaches!" },
      { id: 3, title: "Maldives Water Villa", type: "hotel", reason: "You liked beaches!" },
    ];
  }

  if (history.includes("mountain")) {
    return [
      { id: 4, title: "Manali Snow Retreat", type: "hotel", reason: "You searched mountain destinations." },
      { id: 5, title: "Shimla Hills Hotel", type: "hotel", reason: "You searched mountain destinations." },
    ];
  }

  return [
  {
    id: 6,
    title: "Dubai Flight Special",
    type: "flight",
    reason: "Popular among travelers like you",
  },
  {
    id: 7,
    title: "Goa Resort Deal",
    type: "hotel",
    reason: "Trending destination",
  },
  {
    id: 8,
    title: "Bangkok Flight Offer",
    type: "flight",
    reason: "Top booked route this week",
  },
];

};
