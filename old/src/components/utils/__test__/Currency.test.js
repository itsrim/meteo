import { convert } from "../Currency";
import fetch from 'jest-fetch-mock';

beforeEach(() => {
  fetch.resetMocks();
});

it("finds exchange", async () => {
  // we are faking the answer of the fetch doing this : fetch.mockResponse(... the result) ! JSON stringify is important
  fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

  const rate = await convert("USD", "CAD");

  expect(rate).toEqual(1.42);
  expect(fetch).toHaveBeenCalledTimes(1);
});