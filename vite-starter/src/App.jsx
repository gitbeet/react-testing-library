import { useState } from "react";
import "./App.css";

function App() {
  const [buttonClass, setButtonClass] = useState("red");
  const toggleButtonClass = () => {
    setButtonClass((prev) => (prev === "red" ? "blue" : "red"));
  };
  return (
    <div>
      <button
        onClick={toggleButtonClass}
        className={buttonClass}
      >
        Change to {buttonClass === "red" ? "blue" : "red"}
      </button>
    </div>
  );
}

export default App;
