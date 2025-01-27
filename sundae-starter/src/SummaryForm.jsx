import { useState } from "react";

const SummaryForm = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked((prev) => !prev);
  return (
    <div>
      <div>
        <label htmlFor="terms">I agree to Terms and Conditions</label>
        <input
          onChange={toggleChecked}
          checked={checked}
          type="checkbox"
          id="terms"
        />
      </div>
      <button disabled={!checked}>Confirm order</button>
    </div>
  );
};

export default SummaryForm;
