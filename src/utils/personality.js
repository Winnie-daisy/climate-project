export function getClimatePersonality(score, total) {
  const percentage = (score / total) * 100;

  if (percentage >= 80) {
    return {
      title: "Climate Leader",
      description:
        "You have strong climate intelligence across mitigation, adaptation, and policy.",
      badge: "GOLD",
      level: "gold"
    };
  }

  if (percentage >= 50) {
    return {
      title: "Climate Advocate",
      description:
        "You have solid climate knowledge with room to deepen expertise.",
      badge: "SILVER",
      level: "silver"
    };
  }

  return {
    title: "Climate Explorer",
    description:
      "You're beginning your climate journey. Keep learning and growing!",
    badge: "BRONZE",
    level: "bronze"
  };
}