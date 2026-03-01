import { motion } from "framer-motion";

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
      <motion.div
        className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400 animate-pulse"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;
