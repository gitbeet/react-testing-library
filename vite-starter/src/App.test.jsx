import { fireEvent, render, screen } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import App from "./App";

test("button starts with the correct label and color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red");
});
test("button has the correct label and color after the click", () => {
  // render
  render(<App />);
  // find button
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red");
  // click button
  fireEvent.click(buttonElement);
  // check conditions
  expect(buttonElement).toHaveClass("blue");
  expect(buttonElement).toHaveTextContent("red");
});
