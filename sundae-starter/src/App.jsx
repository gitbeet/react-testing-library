import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import SummaryForm from "./pages/summary/SummaryForm";

function App() {
  return (
    <OrderDetailsProvider>
      <h1>Sundaes on Demand</h1>
      <OrderEntry />
      <SummaryForm />
    </OrderDetailsProvider>
  );
}

export default App;
