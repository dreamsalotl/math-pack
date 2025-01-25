import { useState } from "react";
import { Link } from "react-router-dom";

function Settings() {
  const [settings, setSettings] = useState({
    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
  });

  const [digits, setDigits] = useState(1); // Digit range (default: 1)

  const [errorMessage, setErrorMessage] = useState("");

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const validateAndNavigate = () => {
    const hasAtLeastOneOperator =
      settings.addition || settings.subtraction || settings.multiplication || settings.division;

    if (!hasAtLeastOneOperator) {
      setErrorMessage("Please select at least one operator to start the game.");
      return false; // Prevent navigation
    }

    setErrorMessage(""); // Clear any previous error
    return true; // Allow navigation
  };

  return (
    <div className="main-container">
              <Link to="/">
          <button>Back to Home</button>
        </Link>
      <h2>Arithmetic Settings</h2>
      <div id="checkbox-box">
      <label>
        <input
          type="checkbox"
          checked={settings.addition}
          onChange={() => toggleSetting("addition")}
        />{" "}
        Addition
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.subtraction}
          onChange={() => toggleSetting("subtraction")}
        />{" "}
        Subtraction
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.multiplication}
          onChange={() => toggleSetting("multiplication")}
        />{" "}
        Multiplication
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.division}
          onChange={() => toggleSetting("division")}
        />{" "}
        Division
      </label>
      </div>
      <div id="digit-bar">
        <label>
          Number of Digits: <strong>{digits}</strong>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={digits}
          onChange={(e) => setDigits(parseInt(e.target.value))}
        />
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <Link
          to="/game"
          state={{ operators: settings, digits }}
          onClick={(e) => {
            if (!validateAndNavigate()) {
              e.preventDefault(); // Stop navigation
            }
          }}
        >
          <button>Start Game</button>
        </Link>
      </div>
    </div>
  );
}

export default Settings;
