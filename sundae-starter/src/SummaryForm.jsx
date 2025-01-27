import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SummaryForm = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked((prev) => !prev);

  const checkboxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          onChange={toggleChecked}
          checked={checked}
          type="checkbox"
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!checked}
      >
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
