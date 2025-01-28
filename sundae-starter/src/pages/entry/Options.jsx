import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

const Options = ({ optionType }) => {
  const [items, setItems] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((e) => console.log(e));
  }, [optionType]);

  const ItemComponent =
    optionType === "scoops"
      ? ScoopOption
      : optionType === "toppings"
      ? ToppingOption
      : null;

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
