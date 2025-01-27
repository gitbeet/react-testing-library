import "@testing-library/jest-dom";

import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./mocks/server";

// Establish API mocking (before all tests)
beforeAll(() => server.listen());
// Reset handlers between tests
afterEach(() => server.resetHandlers());
// Close the mock server after the tests are done
afterAll(() => server.close());
