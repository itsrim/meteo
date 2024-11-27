import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import sinon from 'sinon';

// setup file
import { mount } from 'enzyme';
// import { configure, shallow } from 'enzyme';// shallow only for the 1rst node, full DOM rendering : mount
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

describe("Counter Testing", () => {

  let wrapper: any;
  beforeEach(() => {
    // /use mount instead of shallow for full DOM renderin
    wrapper = mount(<App />);
    // console.log(wrapper.debug());//full Dom rendering
    // wrapper = shallow(<App />); // it will render the component App, not the sub component inside like Layout for example
  })

  test('href present', () => {
    expect(wrapper.find("#conversionHeader").text()).toContain("Conversion")
  })
  // test('renders learn react link', () => {
  //   // console.log("debug : WRAPPER ==>  ", wrapper);
  //   expect(wrapper.find("#titleConversion").text()).toContain("conversion rate : $ USD - € EUR");
  //   // const { getByText } = render(<App />);// you load the component < App />
  //   // const linkElement = getByText("conversion rate : $ USD - € EUR");// you said that the document contains this string
  //   // expect(linkElement).toBeInTheDocument(); // you are checking that string exists great ! OK
  // });

  // test rendering a button
  // test('implement a button with a text', () => {
  //   expect(wrapper.find("#increment-btn").text()).toBe('+ Increment');
  // })

  // test('implement a button with a text', () => {
  //   expect(wrapper.find("#decrement-btn").text()).toBe('- Decrement');
  // })

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = mount(<App />);
  //   wrapper.find('#increment-btn').simulate('click');
  //   expect(onButtonClick).toHaveBeenCalledTimes(1);
  // });

  // test('implement Increment button with a text', () => {
  //   expect(wrapper.find("#increment-btn").text()).toBe('+ Increment');
  // })

  // test('check the initial state value of a div ', () => {
  //   expect(wrapper.find("#counter-value").text()).toBe("0");
  // })

  // test('it will render the click and increment the value', () => {
  //   wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
  //   expect(wrapper.find("#counter-value").text()).toBe("1");
  // })

  // // test('it will render the click increment and decrement the value', () => {
  // //   wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
  // //   expect(wrapper.find("#counter-value").text()).toBe("1");
  // //   wrapper.find("#decrement-btn").simulate("click");// simulating th click on the button
  // //   expect(wrapper.find("#counter-value").text()).toBe("0");
  // // })

  // test("it will counter let the counter to 0 when decrement and it's < 0", () => {
  //   wrapper.find("#decrement-btn").simulate("click");
  //   expect(wrapper.find("#counter-value").text()).toBe("0");
  // })

})  
