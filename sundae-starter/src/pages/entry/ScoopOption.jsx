import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const ScoopOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) =>
    updateItemCount(name, parseInt(e.target.value), "scoops");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexGrow: "1",
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: ".5rem",
        padding: "1rem",
        cursor: "pointer",
      }}
    >
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <span style={{ fontSize: "1.2rem" }}>{name}</span>
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "0.75rem" }}
      >
        <Form.Label
          column
          xs="6"
          style={{ textAlign: "right" }}
        >
          {name}
        </Form.Label>
        <Col xs="6">
          <Form.Control
            type="number"
            min={0}
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default ScoopOption;
