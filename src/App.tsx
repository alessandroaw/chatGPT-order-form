import { MantineProvider } from "@mantine/core";
import { OrderPage } from "./modules/order/OrderPage";

export default function App() {
  return (
    <MantineProvider>
      <OrderPage />
    </MantineProvider>
  );
}
