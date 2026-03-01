export function generateAIFeedback(score, total, categoryScores) {
  const percentage = (score / total) * 100;

  // Find strongest category
  const strongest = Object.keys(categoryScores).reduce((a, b) =>
    categoryScores[a] > categoryScores[b] ? a : b
  );

  // Find weakest category
  const weakest = Object.keys(categoryScores).reduce((a, b) =>
    categoryScores[a] < categoryScores[b] ? a : b
  );

  let performanceLevel = "";

  if (percentage >= 80) performanceLevel = "Expert-Level Climate Thinker 🌍";
  else if (percentage >= 60) performanceLevel = "Advanced Climate Advocate 🔥";
  else if (percentage >= 40) performanceLevel = "Emerging Climate Leader 🌱";
  else performanceLevel = "Climate Awareness Beginner 🌎";

  return `
  Based on your performance, you are an ${performanceLevel}.
  
  Your strongest area is ${strongest.toUpperCase()}, showing clear confidence 
  and awareness in this dimension of climate intelligence.
  
  However, you may want to strengthen your understanding of 
  ${weakest.toUpperCase()} to become more well-rounded.
  
  Keep building your climate literacy and stay engaged with 
  real-world climate action.
  `;
}
