import { screen, render } from "@testing-library/react";
import SummaryForm from "./SummaryForm";
import { userEvent } from "@testing-library/user-event";

test("checkbox flow", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkboxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const buttonElement = screen.getByRole("button", { name: /confirm order/i });

  // checkbox is unchecked by default and button is disabled by default
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();

  // checking the box enables the button
  await user.click(checkboxElement);
  expect(checkboxElement).toBeChecked();
  expect(buttonElement).toBeEnabled();

  // unchecking again disables the button
  await user.click(checkboxElement);
  expect(checkboxElement).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test("popover response to hover", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears when we hover the checkbox
  const termsAndConditionsElement = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditionsElement);
  const popOver = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popOver).toBeInTheDocument();

  // popover disappears when we unhover the checkbox
  await user.unhover(termsAndConditionsElement);
  expect(popOver).not.toBeInTheDocument();
});
