import { Button } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();
  const grandTotal = totals["scoops"] + totals["toppings"];
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>
      <Button onClick={() => setOrderPhase("review")}>Order now</Button>
    </div>
  );
};

export default OrderEntry;
