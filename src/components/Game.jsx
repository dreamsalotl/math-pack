import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Feedback from "./Feedback";

function Game() {
  const location = useLocation();
  const { operators, digits, allowNegatives } = location.state || {
    operators: { addition: true, subtraction: true, multiplication: true, division: true },
    digits: 1,
    allowNegatives: false, // Default if not passed
  };

  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("");
  const [feedbackVisible, setFeedbackVisible] = useState(false); // Controls feedback visibility
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isProblemActive, setIsProblemActive] = useState(true);

  const generateProblem = () => {
    const availableOperators = [];
    if (operators.addition) availableOperators.push("+");
    if (operators.subtraction) availableOperators.push("-");
    if (operators.multiplication) availableOperators.push("*");
    if (operators.division) availableOperators.push("/");
  
    if (availableOperators.length === 0) {
      setFeedbackMessage("No operators selected. Please adjust settings.");
      setFeedbackColor("red");
      setFeedbackVisible(true);
      setTimeout(() => setFeedbackVisible(false), 1500); // Auto-hide feedback
      return;
    }
  
    // Helper function to generate numbers with or without negatives
    const generateRandomNumber = () => {
      const max = Math.pow(10, digits);
      const min = allowNegatives ? -max : 0; // Adjust minimum value for negatives
      return Math.floor(Math.random() * (max - min)) + min; // Random between min and max
    };
  
    const num1 = generateRandomNumber();
    const num2 = generateRandomNumber();
    const operator =
      availableOperators[Math.floor(Math.random() * availableOperators.length)];
  
    let answer = eval(`${num1} ${operator} ${num2}`);
    if (operator === "/") answer = Math.round(answer);
  
    setProblem({ num1, num2, operator, answer });
    setFeedbackMessage(""); // Clear feedback
    setFeedbackVisible(false);
    setUserAnswer("");
    setIsProblemActive(true);
  };
  

  const handleSubmit = () => {
    if (!isProblemActive) return;

    const numericAnswer = parseFloat(userAnswer);

    if (numericAnswer === problem.answer) {
      setFeedbackMessage("Correct!");
      setFeedbackColor("green");
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setFeedbackMessage(`Wrong! The correct answer was ${problem.answer}`);
      setFeedbackColor("red");
      setStreak(0);
    }

    setFeedbackVisible(true); // Show feedback
    setTimeout(() => setFeedbackVisible(false), 1500); // Hide feedback after 1.5 seconds

    setIsProblemActive(false);
    setTimeout(() => {
      generateProblem();
    }, 1500);
  };

  const handleSkip = () => {
    setFeedbackMessage("Skipped! Streak reset.");
    setFeedbackColor("orange");
    setFeedbackVisible(true); // Show feedback
    setTimeout(() => setFeedbackVisible(false), 1500); // Hide feedback after 1.5 seconds
    setStreak(0);
    setTimeout(() => {
      generateProblem();
    }, 1500);
  };

  if (!problem) generateProblem();

  return (
    <div>
      <h2>Arithmetic Mode</h2>
      {problem && (
        <p id="problem-box">
          {problem.num1} {problem.operator} {problem.num2} = ?
        </p>
      )}
      <div className="input-container">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Your answer"
        />
        <button
          onClick={() =>
            setUserAnswer((prev) => (prev ? -1 * parseFloat(prev) : ""))
          }
        >
          ±
        </button>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <button className="skip-button" onClick={handleSkip}>
        Skip
      </button>
      <Feedback
        message={feedbackMessage}
        color={feedbackColor}
        visible={feedbackVisible}
      />
      <p id="score-box">Score: {score}</p>
      <p id="streak-box">Streak: {streak}</p>
      <div id="game-nav-btns">
        <Link to="/settings">
          <button id="back-button">Back to Settings</button>
        </Link>
        <Link to="/">
          <button id="home-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Game;
