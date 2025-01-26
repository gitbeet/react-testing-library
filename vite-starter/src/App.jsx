import { useState } from "react";
import "./App.css";
import { kebabCaseToTitleCase } from "./helpers";

function App() {
  const [buttonClass, setButtonClass] = useState("medium-violet-red");
  const [checked, setChecked] = useState(false);

  const nextColor =
    buttonClass === "medium-violet-red" ? "midnight-blue" : "medium-violet-red";

  const toggleButtonClass = () => {
    setButtonClass(nextColor);
  };
  const toggleCheckbox = () => setChecked((prev) => !prev);

  return (
    <div>
      <button
        disabled={checked}
        onClick={toggleButtonClass}
        className={checked ? "gray" : buttonClass}
      >
        Change to {kebabCaseToTitleCase(nextColor)}
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
