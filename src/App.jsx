import { useState, useEffect } from "react";
import questions from "./data/questions";
import QuestionCard from "./component/QuestionCard";
import ProgressBar from "./component/ProgressBar";
import { motion } from "framer-motion";
import { getClimatePersonality } from "./utils/personality";
import { getRecommendations } from "./utils/recommendation";
import Leaderboard from "./component/Leaderboard";
import PolicyRadar from "./component/PolicyRadar";
import jsPDF from "jspdf";
import { generateAIFeedback } from "./utils/aiFeedback";
import confetti from "canvas-confetti";

function App() {
  const [screen, setScreen] = useState("intro"); 
  // intro | quiz | result

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [timeLeft, setTimeLeft] = useState(20);
  const [name, setName] = useState("");

  const [categoryScores, setCategoryScores] = useState({
    adaptation: 0,
    mitigation: 0,
    policy: 0,
    justice: 0,
    finance: 0,
  });

  const isFinished = current >= questions.length;
  const result =
    screen === "result"
      ? getClimatePersonality(score, questions.length)
      : null;

  // 🎉 Confetti on Gold
  useEffect(() => {
    if (screen !== "result" || !result) return;

    if (result.level === "gold") {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [screen, result]);

  // ⏳ Timer
  useEffect(() => {
    if (screen !== "quiz") return;

    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, screen]);

  // ✅ Handle Answer
  const handleAnswer = (selectedIndex) => {
    const currentQuestion = questions[current];

    if (selectedIndex === currentQuestion.answer) {
      setScore((prev) => prev + 1);
      setCategoryScores((prev) => ({
        ...prev,
        [currentQuestion.category]:
          prev[currentQuestion.category] + 1,
      }));
    }

    setTimeLeft(20);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setScreen("result");
    }
  };

  // 🔄 Restart Quiz
  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setTimeLeft(20);
    setName("");
    setCategoryScores({
      adaptation: 0,
      mitigation: 0,
      policy: 0,
      justice: 0,
      finance: 0,
    });
    setScreen("intro");
  };

  // 💾 Save Leaderboard
  const saveScore = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const stored =
      JSON.parse(localStorage.getItem("climateLeaderboard")) || [];

    stored.push({ name, score });
    stored.sort((a, b) => b.score - a.score);

    localStorage.setItem(
      "climateLeaderboard",
      JSON.stringify(stored)
    );

    alert("Score Saved!");
  };

  // 📄 Generate Certificate
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Climate Intelligence Certificate", 20, 30);

    doc.setFontSize(16);
    doc.text(`Awarded to: ${name || "Participant"}`, 20, 50);
    doc.text(`Score: ${score} / ${questions.length}`, 20, 65);
    doc.text(`Climate Personality: ${result.title}`, 20, 80);

    const aiFeedback = generateAIFeedback(
      score,
      questions.length,
      categoryScores
    );

    doc.text("AI Feedback:", 20, 100);
    doc.text(aiFeedback, 20, 110, { maxWidth: 170 });

    doc.save("climate_certificate.pdf");
  };

  // =========================
  // 🌍 INTRO SCREEN
  // =========================
  if (screen === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-slate-900 to-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl"
        >
          <h1 className="text-4xl font-bold mb-6">
            🌍 Climate Intelligence Benchmark
          </h1>

          <p className="mb-6 text-lg text-gray-300">
            Test your climate knowledge, policy awareness,
            and sustainability intelligence.
            Discover your Climate Personality Type.
          </p>

          <button
            onClick={() => setScreen("quiz")}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-lg font-semibold shadow-xl"
          >
            Start Benchmark 🚀
          </button>
        </motion.div>
      </div>
    );
  }

  // =========================
  // 🧠 QUIZ SCREEN
  // =========================
  if (screen === "quiz") {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-6 ${
          darkMode
            ? "bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 text-white"
            : "bg-gradient-to-br from-emerald-50 to-white text-slate-900"
        }`}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-3xl w-full">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-4 px-4 py-2 bg-emerald-500 rounded-full"
          >
            Toggle Mode
          </button>

          <h1 className="text-2xl font-bold mb-4">
            Question {current + 1} of {questions.length}
          </h1>

          <ProgressBar current={current} total={questions.length} />

          <p className="mt-2 font-semibold">
            ⏳ {timeLeft}s remaining
          </p>

          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <QuestionCard
              question={questions[current].question}
              options={questions[current].options}
              onAnswer={handleAnswer}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // =========================
  // 🎯 RESULT SCREEN
  // =========================
  const recommendations = getRecommendations(categoryScores);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-green-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-4">
          🎉 Your Climate Result
        </h1>

        <h2 className="text-2xl text-green-600 font-semibold">
          {result.title}
        </h2>

        <p className="mt-2">{result.description}</p>

        <h3 className="mt-4 font-bold">
          Score: {score} / {questions.length}
        </h3>

        <PolicyRadar categoryScores={categoryScores} />

        <h3 className="mt-6 font-bold">
          🎯 Recommended Learning
        </h3>

        <ul className="list-disc ml-6 mt-2">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>

        <div className="mt-6 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />

          <button
            onClick={saveScore}
            className="px-5 py-2 bg-green-600 text-white rounded-lg"
          >
            Save Score
          </button>

          <button
            onClick={generatePDF}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Download Certificate
          </button>

          <button
            onClick={restartQuiz}
            className="px-5 py-2 bg-slate-800 text-white rounded-lg"
          >
            Restart Quiz 🔄
          </button>
        </div>

        <div className="mt-8">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default App;