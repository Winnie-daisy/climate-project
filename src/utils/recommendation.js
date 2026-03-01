export function getRecommendations(categoryScores) {
  const recommendations = [];

  if (categoryScores.policy < 2) {
    recommendations.push(
      "Deepen knowledge in African Union climate governance and NDC implementation."
    );
  }

  if (categoryScores.finance < 2) {
    recommendations.push(
      "Explore climate finance mechanisms like the Green Climate Fund and Loss & Damage frameworks."
    );
  }

  if (categoryScores.adaptation < 2) {
    recommendations.push(
      "Study climate resilience systems and community-based adaptation strategies."
    );
  }

  if (categoryScores.justice < 2) {
    recommendations.push(
      "Understand climate justice, loss & damage debates, and vulnerable population impacts."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Excellent cross-domain climate intelligence. Consider climate leadership roles."
    );
  }

  return recommendations;
}
