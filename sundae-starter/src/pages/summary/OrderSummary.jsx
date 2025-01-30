import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

const OrderSummary = () => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopsArray = Object.entries(optionCounts.scoops);
  const scoopsList = scoopsArray.map(([k, v]) => (
    <li key={k}>
      {v} {k}
    </li>
  ));
  const toppingsArray = Object.keys(optionCounts.toppings);
  const toppingsList = toppingsArray.map((t) => <li key={t}>{t}</li>);

  return (
    <div>
      <h2>Order summary</h2>
      <h2>Scoops: {formatCurrency(totals["scoops"])}</h2>
      <ul>{scoopsList}</ul>
      <h2>Toppings: {formatCurrency(totals["toppings"])}</h2>
      <ul>{toppingsList}</ul>
      <SummaryForm />
    </div>
  );
};

export default OrderSummary;
