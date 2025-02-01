import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

const OrderSummary = ({ setOrderPhase }) => {
  const { totals, optionCounts } = useOrderDetails();

  const scoopsArray = Object.entries(optionCounts.scoops);
  const scoopsList = scoopsArray.map(([k, v]) => (
    <li key={k}>
      {v} {k}
    </li>
  ));
  const toppingsArray = Object.keys(optionCounts.toppings);
  const toppingsList = toppingsArray.map((t) => <li key={t}>{t}</li>);
  const formattedScoops = formatCurrency(totals["scoops"]);
  const formattedToppins = formatCurrency(totals["toppings"]);

  return (
    <div>
      <h2>Order summary</h2>
      <h2>Scoops: {formattedScoops}</h2>
      <ul>{scoopsList}</ul>
      {toppingsArray.length && (
        <>
          <h2>Toppings: {formattedToppins}</h2>
          <ul>{toppingsList}</ul>
        </>
      )}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
};

export default OrderSummary;
