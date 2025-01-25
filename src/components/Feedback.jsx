function Feedback({ message, color, visible }) {
  return (
    <div
      className={`feedback ${visible ? "show" : ""}`}
      style={{ backgroundColor: color }}
    >
      {message}
    </div>
  );
}

export default Feedback;