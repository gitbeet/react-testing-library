import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";
import { PRICE_PER_ITEM } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState();
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch(() => setError(true));
  }, [optionType]);

  const ItemComponent =
    optionType === "scoops"
      ? ScoopOption
      : optionType === "toppings"
      ? ToppingOption
      : null;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  if (error) return <AlertBanner />;

  return (
    <section>
      <h2>{title}</h2>
      <p>{formatCurrency(PRICE_PER_ITEM[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {items?.map((item, i) => (
          <ItemComponent
            key={i}
            name={item.name}
            imagePath={item.imagePath}
          />
        ))}
      </div>
    </section>
  );
};

export default Options;
