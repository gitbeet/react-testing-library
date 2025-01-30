import { screen, render } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("displays image for each scoop option from the server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  // check length
  expect(scoopImages).toHaveLength(2);

  // check alt text
  const altText = scoopImages.map((e) => e.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping options from the server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });

  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((e) => e.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
