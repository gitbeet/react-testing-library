import { useState } from "react";
import "./App.css";

function App() {
  const [buttonClass, setButtonClass] = useState("red");
  const [checked, setChecked] = useState(false);
  const toggleButtonClass = () => {
    setButtonClass((prev) => (prev === "red" ? "blue" : "red"));
  };
  const toggleCheckbox = () => setChecked((prev) => !prev);

  return (
    <div>
      <button
        disabled={checked}
        onClick={toggleButtonClass}
        className={checked ? "gray" : buttonClass}
      >
        Change to {buttonClass === "red" ? "blue" : "red"}
      </button>
      <label htmlFor="checkbox">Check to disable button</label>
      <input
        id="checkbox"
        onClick={toggleCheckbox}
        type="checkbox"
        checked={checked}
      />
    </div>
  );
}

export default App;
