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