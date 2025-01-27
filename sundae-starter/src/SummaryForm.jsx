import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";

const SummaryForm = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked((prev) => !prev);

  const popover = (
    <Popover>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger
        placement="bottom-start"
        overlay={popover}
      >
        <span style={{ color: "blue" }}>Terms and Conditions</span>
      </OverlayTrigger>
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
