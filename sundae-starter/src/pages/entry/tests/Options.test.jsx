import { screen, render } from "@testing-library/react";
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
