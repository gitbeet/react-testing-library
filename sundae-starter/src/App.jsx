import { useEffect, useState } from "react";
import { OrderDetailsProvider, useOrderDetails } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import axios from "axios";
import { BASE_URL } from "./mocks/handlers";

const ConfirmationPage = ({ setOrderPhase }) => {
  const [orderNumber, setOrderNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resetOrder } = useOrderDetails();

  const handleNewOrder = () => {
    resetOrder();
    setOrderPhase("inProgress");
  };

  useEffect(() => {
    axios
      .post(`${BASE_URL}/order`)
      .then((res) => res.data)
      .then((data) => setOrderNumber(data.orderNumber))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {loading && <p>loading...</p>}
      {!loading && (
        <>
          <h1>Thanks for ordering from out page</h1>
          <h2>Order number: {orderNumber}</h2>
          <button onClick={handleNewOrder}>New order</button>
        </>
      )}
    </div>
  );
};

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  return (
    <OrderDetailsProvider>
      <h1>Sundaes on Demand</h1>
      {orderPhase === "inProgress" && (
        <OrderEntry setOrderPhase={setOrderPhase} />
      )}
      {orderPhase === "review" && (
        <OrderSummary setOrderPhase={setOrderPhase} />
      )}
      {orderPhase === "complete" && (
        <ConfirmationPage setOrderPhase={setOrderPhase} />
      )}
    </OrderDetailsProvider>
  );
}

export default App;
