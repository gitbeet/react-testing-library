import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";

import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";
import { BASE_URL } from "../../../mocks/handlers";

test.only("handles errors for scoops and toppings routes", async () => {
  // reset the handlers so they return an error in order to test
  server.resetHandlers(
    http.get(`${BASE_URL}/scoops`, () => HttpResponse(null, { status: 500 })),
    http.get(`${BASE_URL}/toppings`, () => HttpResponse(null, { status: 500 }))
  );

  // render
  render(<OrderEntry />);

  // get the alert element
  const alerts = await screen.findAllByText(
    "An unexpected error occured. Please try again later."
  );
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: "An unexpected error occured. Please try again later.",
  //   });

  // expect 2 alerts (scoops and toppings)
  expect(alerts).toHaveLength(2);
});

test("my test 2", () => {});
test("my test 3", () => {});
