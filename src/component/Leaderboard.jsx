import { useEffect, useState } from "react";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("climateLeaderboard")) || [];
    const sorted = stored.sort((a, b) => b.score - a.score);
    setPlayers(sorted);
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>🏆 Climate Leaderboard</h2>
      {players.length === 0 ? (
        <p>No scores yet.</p>
      ) : (
        <ol>
          {players.map((player, index) => (
            <li key={index}>
              {player.name} — {player.score}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
