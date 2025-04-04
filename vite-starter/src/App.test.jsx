import { fireEvent, render, screen } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import App from "./App";
import { kebabCaseToTitleCase } from "./helpers";

test("button starts with the correct label and color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("medium-violet-red");
});

test("button has the correct label and color after the click", () => {
  // render
  render(<App />);
  // find button
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("medium-violet-red");
  // click button
  fireEvent.click(buttonElement);
  // check conditions
  expect(buttonElement).toHaveClass("midnight-blue");
  expect(buttonElement).toHaveTextContent(/red/i);
});

test("checkbox flow", () => {
  // render
  render(<App />);
  // find elements
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  const checkBoxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkBoxElement).not.toBeChecked();

  // click the checkbox
  fireEvent.click(checkBoxElement);
  // check conditions after the checkbox click
  expect(buttonElement).not.toBeEnabled();
  expect(buttonElement).toHaveClass("gray");
  expect(checkBoxElement).toBeChecked();

  // click chekbox again to re-enable the button
  fireEvent.click(checkBoxElement);
  // check conditions after the second checkbox click
  expect(buttonElement).toBeEnabled();
  expect(buttonElement).toHaveClass("medium-violet-red");
  expect(checkBoxElement).not.toBeChecked();
});

describe("kebabCaseToTitleCase", () => {
  test("works for no hyphens", () => {
    expect(kebabCaseToTitleCase("red")).toBe("Red");
  });
  test("works for one hyphens", () => {
    expect(kebabCaseToTitleCase("midnight-blue")).toBe("Midnight Blue");
  });
  test("works for multiple hyphens", () => {
    expect(kebabCaseToTitleCase("medium-violet-red")).toBe("Medium Violet Red");
  });
});
