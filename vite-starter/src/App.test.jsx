import { render, screen } from "@testing-library/react";
import App from "./App";

test("button starts with the correct color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /blue/i });
  expect(buttonElement).toHaveClass("red");
});
// test("button starts with the correct initial text", () => {});
// test("button has the correct color after the click", () => {});
// test("button has the correct text after the click", () => {});
