import { screen, render, fireEvent } from "@testing-library/react";
import SummaryForm from "./SummaryForm";

test("checkbox flow", () => {
  render(<SummaryForm />);
  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const buttonElement = screen.getByRole("button", { name: /confirm order/i });

  // checkbox is unchecked by default and button is disabled by default
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
  // checking the box enables the button
  fireEvent.click(checkboxElement);
  expect(checkboxElement).toBeChecked();
  expect(buttonElement).toBeEnabled();
  // unchecking again disables the button
  fireEvent.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test("hovering on terms and condition flow", async () => {
  // const user =
});
