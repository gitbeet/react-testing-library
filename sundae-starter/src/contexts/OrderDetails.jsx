import { createContext, useContext, useState } from "react";
import { PRICE_PER_ITEM } from "../constants";

const OrderDetails = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetails);
  if (!context)
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  return context;
};

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  });

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionCounts = { ...optionCounts };

    if (newItemCount === 0) {
      delete newOptionCounts[optionType][itemName];
    } else {
      newOptionCounts[optionType][itemName] = newItemCount;
    }
    setOptionCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionCounts({ scoops: {}, toppings: {} });
  };

  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalItems = countsArray.reduce((total, val) => total + val, 0);
    const totalCost = totalItems * PRICE_PER_ITEM[optionType];
    return totalCost;
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = {
    optionCounts,
    updateItemCount,
    resetOrder,
    totals,
  };

  return (
    <OrderDetails.Provider
      value={value}
      {...props}
    />
  );
}
