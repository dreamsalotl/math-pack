import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="main-container">
      <h1>Welcome to Math Pack</h1>
      <Link to="/settings">
        <button>Start Arithmetic Mode</button>
      </Link>
    </div>
  );
}

export default Landing;