import * as pizzas from '../data.json';
// import { convert } from "../components/Crud";
import { convert } from "../components/utils/Currency";
import fetch from 'jest-fetch-mock';

const globalAny: any = global;

beforeEach(() => {
  fetch.resetMocks();
});

interface IPizza {
  id: number;
  name: string;
  image: string;
  desc: string;
  price: number;
}
// snapshot for UI testing
test('the pizza data is correct', () => {
  expect(pizzas).toMatchSnapshot();
  // expect(pizzas).toHaveLength(4);
  // expect(pizzas.map((pizza: IPizza) => pizza.name)).toEqual([
  //   'Chicago Pizza',
  //   'Neapolitan Pizza',
  //   'New York Pizza',
  //   'Sicilian Pizza',
  // ])
});

// test in every value of the array
for (let index = 0; index < pizzas.length; index++) {
  test(`pizzas[${index}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[index]).toHaveProperty('id');
    expect(pizzas[index]).toHaveProperty('name');
    expect(pizzas[index]).toHaveProperty('desc');
    expect(pizzas[index]).toHaveProperty('price');
    // expect(pizzas[index]).toHaveProperty('crazy price');
  })
}


// MOCKING : mimic a get from a server
test('mock implementation of a basic function', () => {
  const mock = jest.fn(() => 'I am a mock function');
  // console.log(mock);
  // expect(mock).toBe('I am a mock function');
  // expect(mock).toHaveBeenCalledWith('Calling my mock function!');
});

test('mock return value of a fucntion one time', () => {
  const mock = jest.fn();

  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('Two');

  mock();
  mock();

  expect(mock).toHaveBeenCalledTimes(2);

  mock('Hello', 'Two', 'Yo');
  expect(mock).toHaveBeenCalledWith('Hello', 'Two', 'Yo');

  mock('Moi');
  expect(mock).toHaveBeenLastCalledWith('Moi');
})


// let's mock the return value
// difference between mockReturnValue & mockImplementation
test('mock implementation of a function', () => {
  const mock = jest.fn().mockImplementation(() => 'United Kingdom');
  expect(mock('Location')).toBe('United Kingdom');
  expect(mock).toHaveBeenCalledWith('Location');
});

// spy a sinlge foncion
// spying on a single function of an imported module, we can spy on its usage
// by default the original function gets called, we can change this
test('spying using original implementation', () => {
  const pizza = {
    name: (n: any) => `Pizza name: ${n}`,
  };
  const spy = jest.spyOn(pizza, 'name');
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
  expect(spy).toHaveBeenCalledWith('Cheese');
});

// we can mock the implementation of a function from a module
test('spying using mokcImplementation', () => {
  const pizza = {
    name: (n: any) => `Pizza name: ${n}`,
  }
  const spy = jest.spyOn(pizza, 'name');
  spy.mockRestore();
  expect(pizza.name('Cheese')).toBe('Pizza name: Cheese')
})

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ rates: { EUR: 0.842530963 } }),
//   })
// );

// my test
// creating a fake mock function :  const globalAny: any = global; replacing the global fetch
globalAny.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(3.14)
  })
})

// // reset the number of call function
// beforeEach(() => {
//   globalAny.fetch.mockClear();
// })

// it('my convert function', async () => {
//   // console.log("===>", Promise.resolve(convert('USD', 'CAD')));
//   const rate = await convert('USD', 'CAD');

//   expect(rate).toEqual(1.32);
//   expect(fetch).toHaveBeenCalledTimes(1);
// })

// testing failure try and catch
// it("handle rejection will null", async () => {
//   globalAny.fetch.mockImplementationOnce(() => Promise.reject("API Failure"))
//   const rate = await convert('USD', 'CAD');
//   expect(rate).toEqual(null);
//   expect(fetch).toHaveBeenCalledWith(
//     `https://api.exchangeratesapi.io/latest?base=USD`
//   )
// })

// globalAny.fetch = jest.fn(() => {
//   Promise.resolve({
//     json: () => Promise.resolve(3.14)
//   })
// })

// Test fetch : jest-fetch-mock
// it("converts correctly", async () => {
//   fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.32 } }));

//   const rates = await convert("USD", "CAD");
//   expect(rates).toEqual(1.32);
//   expect(rates).toHaveBeenCalledTimes(2);
//   // expect(rates).toHaveBeenCalledWith(`https://api.exchangeratesapi.io/latest?base=USD`);
// })
// it("converts correctly", async () => {
//   fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

//   const rates = await convert("USD", "CAD");

//   expect(rates).toEqual(1.42);
//   expect(fetch).toHaveBeenCalledTimes(1);
//   expect(fetch).toHaveBeenCalledWith(
//     `https://api.exchangeratesapi.io/latest?base=USD`
//   );
// });
