import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

function PolicyRadar({ categoryScores }) {
  const data = Object.entries(categoryScores).map(([key, value]) => ({
    category: key.toUpperCase(),
    score: value,
  }));

  return (
    <RadarChart outerRadius={120} width={500} height={350} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="category" />
      <PolarRadiusAxis />
      <Radar
        name="Score"
        dataKey="score"
        stroke="#10b981"
        fill="#10b981"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}

export default PolicyRadar;
