import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  return (
    <OrderDetailsProvider>
      <h1>Sundaes on Demand</h1>
      <OrderEntry />
      {/* <OrderSummary /> */}
    </OrderDetailsProvider>
  );
}

export default App;
