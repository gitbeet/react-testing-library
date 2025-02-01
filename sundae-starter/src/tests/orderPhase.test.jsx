// rendering app, no need for a wrapper (no need for a custom render method)
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);
  const user = userEvent.setup();

  // add scoops and toppings
  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const chocolateScoopInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.clear(vanillaScoopInput);
  await user.type(vanillaScoopInput, "2");

  await user.clear(chocolateScoopInput);
  await user.type(chocolateScoopInput, "1");

  await user.click(cherriesToppingCheckbox);

  const grandTotal = screen.getByText("Grand total: $", { exact: false });
  expect(grandTotal).toHaveTextContent("7.50");

  // find and click the order button on the order entry page
  const orderButtonElement = screen.getByRole("button", { name: "Order now" });
  await user.click(orderButtonElement);

  // check that the summary info is correct based on the order
  const scoopsSubtotal = screen.getByText("Scoops: $", { exact: false });
  const toppingsSubtotal = screen.getByText("Toppings: $", {
    exact: false,
  });

  expect(scoopsSubtotal).toHaveTextContent("6.00");
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // accept terms and conditions and press the button to confirm the order
  const termsAndConditionsCheckbox = screen.getByRole("checkbox", {
    name: /terms/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: "Confirm order",
  });

  await user.click(termsAndConditionsCheckbox);
  await user.click(confirmOrderButton);

  // expect "loading" element to show (while placing the order)
  const loadingElement = screen.getByText("loading...");
  expect(loadingElement).toBeInTheDocument();

  const thankYouMessage = await screen.findByText(/thanks/i);
  expect(thankYouMessage).toBeInTheDocument();

  // on the confirmation page confirm that we have the order number
  const orderNumber = await screen.findByText(/order number: /i);
  expect(orderNumber).toBeInTheDocument();

  // click the new order button on the confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: "New order",
  });
  await user.click(newOrderButton);

  // check that the scoops and toppings are reset
  const grandTotalLast = await screen.findByText(/grand total/i);
  await expect(grandTotalLast).toHaveTextContent("0.00");
  // do we need to await anything to avoid test errors
});

test("toppings header is not on the summary page if no toppings are ordered", async () => {
  const user = userEvent.setup();
  render(<App />);

  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const chocolateScoopInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(vanillaScoopInput);
  await user.clear(chocolateScoopInput);

  await user.type(vanillaScoopInput, "2");
  await user.type(chocolateScoopInput, "1");

  const orderButton = await screen.findByRole("button", { name: "Order now" });
  await user.click(orderButton);

  const scoopsHeader = await screen.findByText("Scoops: $6.00");
  expect(scoopsHeader).toBeInTheDocument();

  const toppingsHeader = screen.queryByText(/toppings: /i);
  expect(toppingsHeader).not.toBeInTheDocument();
});
