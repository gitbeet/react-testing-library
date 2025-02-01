import { delay, http, HttpResponse } from "msw";

export const BASE_URL = "http://localhost:3030";

export const handlers = [
  http.get(`${BASE_URL}/scoops`, () =>
    HttpResponse.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ])
  ),
  http.get(`${BASE_URL}/toppings`, () =>
    HttpResponse.json([
      { name: "Cherries", imagePath: "/images/cherries.png" },
      { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
      { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
    ])
  ),
  http.post(`${BASE_URL}/order`, async () => {
    await delay(400);
    return HttpResponse.json(
      { orderNumber: Math.floor(Math.random() * 1000000000) },
      { status: 201 }
    );
  }),
];
