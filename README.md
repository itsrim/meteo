

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


# CI-CD  and Jest demo : http://itsrim.github.io/meteo
Implementing Continous Integration and Deployement , with Jest, React, Travis - circleCI


## Github-pages :

modify : package.json

add these :
```
  "homepage": "http://itsrim.github.io/meteo",
...
    "predeploy": "yarn build",
    "deploy": "gh-pages -d build"
```

select in github setthing :
github-pages

```
yarn run deploy
```

it will take the build folder and push it into the 
# TRAVIS-CLI

- link travis with your github : OAuth / just log in and authorize

- create a .travis.yml file
```
language: node_js
node_js:
  - 12.0.0
cache: yarn

install:
  - yarn install

script:
  - yarn test
  - yarn run build

deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN
  on:
    branch: gh-pages

```

configure travis and github
add github_token from github developer settings into the project of travis

a then 
git push


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


# TDD :  Test driven Development

```
npx create-react-app my-app // template-typescript

yarn add enzyme enzyme-adapter-react-16 --save
```

## 1. App.test.tsx

https://enzymejs.github.io/enzyme/docs/installation/react-16.html

```
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// setup file
import { configure, shallow } from 'enzyme';//shallow
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Counter Testing", () => {

  test('renders learn react link', () => {
    const { getByText } = render(<App />);// you load the component < App />
    const linkElement = getByText("conversion USD - EUR");// you said that the document contains this string
    expect(linkElement).toBeInTheDocument(); // you are checking that string exists great ! OK
  });
})  
```
## 2.1 Shallow
it creates an instance of the component

Exemple with App  already written :

```
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// setup file
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("Counter Testing", () => {

  test('renders learn react link', () => {
    const wrapper = shallow(<App />); // it will render the component App, not the sub component inside like Layout for example
    console.log("debug : WRAPPER ==>  ", wrapper.debug());
    expect(wrapper.find("h1").text()).toContain("conversion rate : $ USD - € EUR");
  });
})  

```
it works with this
```
import React from 'react';
import './App.css';
import { convert } from './components/utils/Currency';
import Button from './components/button/Button'

function App() {
  const [conversion, setConversion] = React.useState<string>("");


  React.useEffect(() => {
    const fetchData = async () => {
      const result: string = await convert("USD", "EUR")
      setConversion(result);
    }
    (fetchData());
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>conversion rate : $ USD - € EUR</h1>
        <h3>{conversion ? conversion : ''}</h3>
        <h2>counter</h2>
        <Button label="click me please"></Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;

```
 ### setupTest.tsx
```
import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import fetchMock from "jest-fetch-mock"
fetchMock.enableMocks();

```


now TDD :

```

describe("Counter Testing", () => {

  test('renders learn react link', () => {
    const wrapper = shallow(<App />); // it will render the component App, not the sub component inside like Layout for example
    console.log("debug : WRAPPER ==>  ", wrapper.debug());
    expect(wrapper.find("h1").text()).toContain("conversion rate : $ USD - € EUR");
  });

  // test rendering a button
  test('implement a button with a text', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("#increment-btn").text()).toBe('Increment ');
  })
})  
```

## 2.2. test will fail , because we have to create the component => TDD

The component doesn't exist, so let's create this

```

  ● Counter Testing › implement a button with a text

    Method “text” is meant to be run on 1 node. 0 found instead.

      23 |   test('implement a button with a text', () => {
      24 |     const wrapper = shallow(<App />);
    > 25 |     expect(wrapper.find("#increment-btn").text()).toBe('Increment ');
         |                                           ^
      26 |   })
      27 | })  
      28 | 

      at ShallowWrapper.single (node_modules/enzyme/src/ShallowWrapper.js:1652:13)
      at ShallowWrapper.text (node_modules/enzyme/src/ShallowWrapper.js:1093:17)
      at Object.<anonymous> (src/App.test.tsx:25:43)

Test Suites: 1 failed, 1 passed, 2 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   0 total
```

Here we go
```
 return (
    <div className="App">
      <header className="App-header">
        <h1>conversion rate : $ USD - € EUR</h1>
        <h3>{conversion ? conversion : ''}</h3>  
        <h2>counter</h2>
        <Button label="click me please"></Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <button id="increment-btn">Increment</button> /////////////// HERE //////////////
    </div>
  );
```


### 2.3 UseState, value of a state

you can use a global wrapper instead of create it every time

```
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<App />);
    //  const wrapper = shallow(<App />); // it will render the component App, not the sub component inside like Layout for example
  })
```

### 2.3.1 the test
```
  test('check the initial state value of a div ', () => {
    expect(wrapper.find("#counter-value").text()).toBe(0);
  })
```

Now create the component to pass the test
```
  const [counter, setCounter] = React.useState<number>(0);

  <div id="counter-value">{counter}</div>
```

but it doesn't pass the test, you have to modify it
```
    expect(wrapper.find("#counter-value").text()).toBe("0");//////////// HERE String
```

### 2.2.3 Incrementation onClick

write the test first: 
https://enzymejs.github.io/enzyme/docs/api/shallow.html
 click event :

```
   test('it will render the click and increment the value', () => {
    wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
    expect(wrapper.find("#counter-value").text()).toBe("1");
  }) 
```


```
   expect(received).toBe(expected) // Object.is equality

    Expected: "1"
    Received: "0"

      36 |   test('it will render the click and increment the value', () => {
      37 |     wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
    > 38 |     expect(wrapper.find("#counter-value").text()).toBe("1");
         |                                                   ^
      39 |   })
      40 | })  
      41 | 

```

let's do it
```
        <button id="increment-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
          onClick={() => setCounter(counter + 1)}>Increment</button> ///////// HERE ////////
        <div id="counter-value">{counter}</div>
```

It's work easily :-)

### another one to validate the TDD

```
  test('it will render the click and decrement the value', () => {
    wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
    expect(wrapper.find("#counter-value").text()).toBe("1");
    wrapper.find("#decrement-btn").simulate("click");// simulating th click on the button
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })
```
let's do it
```
  <button id="increment-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
    onClick={() => setCounter(counter + 1)}>Increment</button>
  <button id="decrement-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
    onClick={() => setCounter(counter - 1)}>Decrement</button>
  <div id="counter-value">{counter}</div>
```

### 2.3.1 but if we don't wand counter < 0

```
  test("it will counter let the counter to 0 when decrement and it's < 0", () => {
    wrapper.find("#decrement-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })
```

solution : 
```
<button id="decrement-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
          onClick={() => setCounter(counter > 0 ? counter - 1 : 0)}>Decrement</button>
   
```


### 3. refactoring , using a component

Now, we putting all the counter in a component <Counter />


```
import React from 'react';
import './App.css';
import Counter from './components/Counter/Counter';

function App() {
  const [conversion, setConversion] = React.useState<string>("");
  const [counter, setCounter] = React.useState<number>(0);
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
```

to pass the test, just change the shallow

App.test.tsx
```
import React from 'react';
import { render } from '@testing-library/react';
import Counter from './component/Counter/Counter';
import { shallow } from 'enzyme';

describe("Counter Testing", () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Counter />);
  })

  test('renders learn react link', () => {
    console.log("debug : WRAPPER ==>  ", wrapper.debug());
    expect(wrapper.find("h1").text()).toContain("conversion rate : $ USD - € EUR");
    // const { getByText } = render(<App />);// you load the component < App />
    // const linkElement = getByText("conversion rate : $ USD - € EUR");// you said that the document contains this string
    // expect(linkElement).toBeInTheDocument(); // you are checking that string exists great ! OK
  });

  // test rendering a button
  test('implement a button with a text', () => {
    expect(wrapper.find("#increment-btn").text()).toBe('Increment');
  })

  test('check the initial state value of a div ', () => {
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })

  test('it will render the click and increment the value', () => {
    wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
    expect(wrapper.find("#counter-value").text()).toBe("1");
  })

  // test('it will render the click increment and decrement the value', () => {
  //   wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
  //   expect(wrapper.find("#counter-value").text()).toBe("1");
  //   wrapper.find("#decrement-btn").simulate("click");// simulating th click on the button
  //   expect(wrapper.find("#counter-value").text()).toBe("0");
  // })

  test("it will counter let the counter to 0 when decrement and it's < 0", () => {
    wrapper.find("#decrement-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })

})  

```


OR other solution if you want to kee the Shallow(<App />)

use mount instead of shallow :

import { mount } from 'enzyme';






# TESTING

# Testing your code with JEST

tuto :
https://www.youtube.com/watch?v=NHMIn723hQY
https://www.youtube.com/watch?v=D9DdY2WmM-s

tuto : TDD
https://www.youtube.com/watch?v=-bmdf1oATQo
https://www.leighhalliday.com/mock-fetch-jest

1. create a data.json in /src
```
[
  {
    "id": 1,
    "name": "Chicago Pizza",
    "image": "/images/chicago-pizza.jpg",
    "desc": "The pan in which it is baked gives the pizza its characteristically high edge which provides ample space for large amounts of cheese and a chunky tomato sauce.",
    "price": 9
  },
  {
    "id": 2,
    "name": "Neapolitan Pizza",
    "image": "/images/neapolitan-pizza.jpg",
    "desc": "This style of pizza is prepared with simple and fresh ingredients: a basic dough, raw tomatoes, fresh mozzarella cheese, fresh basil, and olive oil. A fantastic original pizza.",
    "price": 7
  },
  {
    "id": 3,
    "name": "New York Pizza",
    "image": "/images/ny-pizza.jpg",
    "desc": "New York-style pizza has slices that are large and wide with a thin crust that is foldable yet crispy. It is traditionally topped with tomato sauce and mozzarella cheese.",
    "price": 8
  },
  {
    "id": 4,
    "name": "Sicilian Pizza",
    "image": "/images/sicilian-pizza.jpg",
    "desc": "Sicilian pizza is pizza prepared in a manner that originated in Sicily, Italy. Sicilian pizza is also known as sfincione or focaccia with toppings. A great tasteful pizza all around.",
    "price": 9
  }
]
```

1.1. Modify tsconfig.json
add :
```
{
  "compilerOptions": {
    "target": "es2015",
    "module": "commonjs",
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true ///
  }
}

```


https://mariusschulz.com/articles/importing-json-modules-in-typescript


2. Folder __test__

create a folder :
/src/__test__

create a file :


```
import * as pizzas from '../data.json';
interface IPizza {
  id: number;
  name: string;
  image: string;
  desc: string;
}
// snapshot for UI testing
test('the pizza data is correct', () => {
  expect(pizzas).toMatchSnapshot();
  expect(pizzas).toHaveLength(4);
  expect(pizzas.map((pizza: IPizza) => pizza.name)).toEqual([
    'Chicago Pizza',
    'Neapolitan Pizza',
    'New York Pizza',
    'Sicilian Pizza',
  ])
});
```

```
yarn test
```

2.1. another test

same file  test.js
```
for (let index = 0; index < pizzas.length; index++) {
  test(`pizzas[${index}] should have properties (id, name, image, desc, price)`, () => {
    expect(pizzas[index]).toHaveProperty('id');
    expect(pizzas[index]).toHaveProperty('name');
    expect(pizzas[index]).toHaveProperty('desc');
    expect(pizzas[index]).toHaveProperty('price');
    // expect(pizzas[index]).toHaveProperty('crazy price'); // TO REMOVE : my failed cause doesn't exist
  })
}
```
run the test
```
yarn test

yarn run v1.22.1
$ jest
 PASS  src/__tests__/my_test.spec.tsx (9.949s)
  ✓ the pizza data is correct (12ms)
  ✓ pizzas[0] should have properties (id, name, image, desc, price) (2ms)
  ✓ pizzas[1] should have properties (id, name, image, desc, price) (1ms)
  ✓ pizzas[2] should have properties (id, name, image, desc, price) (1ms)
  ✓ pizzas[3] should have properties (id, name, image, desc, price) (1ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        11.744s
Ran all test suites.
```


2.2 Mocking

```
// MOCKING : mimic a get from a server
test('mock return value of a fucntion one time', () => {
  const mock = jest.fn();

  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('Two');

  mock();
  mock();

  expect(mock).toHaveBeenCalledTimes(2);

  mock('Hello', 'Two', 'Yo');
  expect(mock).toHaveBeenCalledWith('Hello', 'Two', 'Yo');
})
```


2.2.1. toHaveBeenCalledTimes

```
  mock.mockReturnValueOnce('Hello').mockReturnValueOnce('Two');

  mock();
  mock();
  expect(mock).toHaveBeenCalledTimes(2);
```

your function have really be called 2 times


```
  mock('Hello', 'Two', 'Yo');
  expect(mock).toHaveBeenCalledWith('Hello', 'Two', 'Yo');
})
```

- toHaveBennCalled :
called  by these 3 arg : 

```
  mock('Moi');
  expect(mock).toHaveBeenLastCalledWith('Moi');
```

- toHaveBeenLastCalledWith
same  : just check who called last time



fetch : mock
```
// my test
// creating a fake mock function :  const globalAny: any = global; replacing the global fetch
globalAny.fetch = jest.fn(() => {
  Promise.resolve({
    json: () => Promise.resolve(3.14)
  })
})

// reset the number of call function
beforeEach(() => {
  globalAny.fetch.mockClear();
})

it('my convert function', async () => {
  // console.log("===>", Promise.resolve(convert('USD', 'CAD')));
  const rate = await convert('USD', 'CAD');

  // expect(rate).toEqual(1.32);
  expect(fetch).toHaveBeenCalledTimes(1);
})

it("handle rejection will null", async () => {
  globalAny.fetch.mockImplementationOnce(() => Promise.reject("API Failure"))
  const rate = await convert('USD', 'CAD');
  expect(rate).toEqual(null);
  expect(fetch).toHaveBeenCalledWith(
    `https://api.exchangeratesapi.io/latest?base=USD`
  )
})
```



3. Jest-fetch-mock

```
  yarn add jest-fetch-mock --dev @types/jest-fetch-mock
```

addin setupTest.ts
```
// import fetchMock from 'jest-fetch-mock/types';
// import fetchMock from "fetch-jest-mock";
import fetchMock from "jest-fetch-mock"

fetchMock.enableMocks();
OR

global.fetch = require('jest-fetch-mock');
```






## SNAPSHOT :

```
import React from "react";
import ReactDOM from 'react-dom';
import Button from '../Button';
import { render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it("renders without crash", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
})


// we are test a component in a DIV, passing a label should render the same text inside
it('render button correctly', () => {
  const { getByTestId } = render(<Button label="click me please"></Button>);
  // expect(getByTestId('button').toHaveTextContent("click me")); // OLD VERSION with // import "jest-dom/extend-expect"; https://github.com/testing-library/react-testing-library/issues/379
  expect(getByTestId('button').textContent).toBe('click me please')
})

it('render button correctly', () => {
  const { getByTestId } = render(<Button label="save"></Button>);
  expect(getByTestId('button').textContent).toBe('save')
})

// snapshot testing
it("match snapshot", () => {
  const tree = renderer.create(<Button label="save"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
})
```
https://jestjs.io/docs/en/snapshot-testing
create a snapshot of the dom then compare it, you can update it : W + U in the terminal



### 3. MOCK : working

install ``

```
yarn add jest-fetch-mock
```

add this in setupTest.tsx
```
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
// import fetchMock from 'jest-fetch-mock/types';
// import fetchMock from "fetch-jest-mock";
// global.fetch = require('jest-fetch-mock');
import fetchMock from "jest-fetch-mock"
fetchMock.enableMocks();
```

```
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
```


### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


https://www.youtube.com/watch?v=6oAkxDg0rAU
https://www.youtube.com/watch?v=PNM22ITv1JA
https://www.youtube.com/watch?v=1-dTAPCSxD0
https://www.youtube.com/watch?v=47kwx7h48dA
