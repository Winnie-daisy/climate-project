
function QuestionCard({ question, options, onAnswer }) {
  return (
    <div>
      <h2>{question}</h2>

      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(index)}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
