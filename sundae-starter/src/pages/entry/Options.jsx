import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import AlertBanner from "../common/AlertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState();
  const [error, setError] = useState(false);
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

  if (error) return <AlertBanner />;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {items?.map((item, i) => (
        <ItemComponent
          key={i}
          name={item.name}
          imagePath={item.imagePath}
        />
      ))}
    </div>
  );
};

export default Options;
