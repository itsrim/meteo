import React from 'react';
import { render } from '@testing-library/react';
import Counter from '../Counter';

// setup file
import { shallow } from 'enzyme';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

describe("Counter Testing", () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Counter />);
  })

  test('renders learn react link', () => {
    // console.log("debug : WRAPPER ==>  ", wrapper.debug());
    expect(wrapper.find("h1").text()).toContain("Counter");
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

  test("it will counter let the counter to 0 when decrement and it's < 0", () => {
    wrapper.find("#decrement-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })

})  
