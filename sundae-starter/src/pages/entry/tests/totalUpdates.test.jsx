import { screen, render } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

  await user.type(chocolateInput, "0");
  await user.type(vanillaInput, "0");
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

describe("grand total", () => {
  test("grand total starts at 0.00", () => {
    render(<OrderEntry />);
    const grandTotalElement = screen.getByText(/grand total/i);
    expect(grandTotalElement).toHaveTextContent("0.00");
  });
  test("grand total updates correctly if scoop is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const grandTotalElement = screen.getByText(/grand total/i);
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, "1");
    expect(grandTotalElement).toHaveTextContent("2.00");
    await user.type(vanillaScoopInput, "0");
  });
  test("grand total updates correctly if topping is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const grandTotalElement = screen.getByText(/grand total/i);
    const cherriesToppingCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(cherriesToppingCheckbox);
    expect(grandTotalElement).toHaveTextContent("1.50");
    await user.click(cherriesToppingCheckbox);
  });
  test("grand total updats properly if item is removed", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const grandTotalElement = screen.getByText(/grand total/i);
    const vanillaScoopInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaScoopInput);
    await user.type(vanillaScoopInput, "1");
    expect(grandTotalElement).toHaveTextContent("2.00");
    await user.type(vanillaScoopInput, "0");
    expect(grandTotalElement).toHaveTextContent("0.00");
  });
});
