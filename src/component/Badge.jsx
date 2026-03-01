const getBadge = (score) => {
  if (score <= 3) return "🌱 Climate Explorer";
  if (score <= 6) return "🌍 Climate Practitioner";
  if (score <= 8) return "🔥 Systems Thinker";
  return "🧠 Terra.do Strategist";
};
