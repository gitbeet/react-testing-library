import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  // make sure totals start at 0.00$
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1, and check subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const user = userEvent.setup();

  // make sure totals start at 0.00$
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // add M&Ms topping and check subtotal
  const mAndMsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms" });
  await user.click(mAndMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50"); // PRICE?
  // add Cherries topping and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  // remove M&Ms topping and check subtotal
  await user.click(mAndMsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  //remove Cherries topping and check if subtotal s 0.00
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});
