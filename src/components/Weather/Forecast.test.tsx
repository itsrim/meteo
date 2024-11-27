// import React from "react";
// import { render } from '@testing-library/react';
// import Forecast from './Forecast';

// import { shallow } from 'enzyme';

// // function to change form
// const simulateChangeInputForm = (wrapper: any, inputSelector: any, newValue: string) => {
//   let input: any = wrapper.find(inputSelector);
//   input.simulate('change', {
//     target: { value: newValue }
//   });
//   return wrapper.find(inputSelector)
// }

// describe("Forecast Testing", () => {
//   let wrapper: any;
//   beforeEach(() => {
//     wrapper = shallow(<Forecast />);
//   })

//   test('input button country name search', () => {
//     expect(wrapper.find("#btn-search").text()).toContain('Search')
//   })

//   it('has the title of the weather component', () => {
//     const title: any = wrapper.find("#titleForecast");
//     expect(title.text()).toContain("Weather in a city");
//   })

//   // it('simulate a change in a form input', () => {
//   //   const myWrapper: any = shallow(<Forecast />)
//   //   let nameInput: any = myWrapper.find('#cityInput').first();
//   //   nameInput.simulate('change', {
//   //     target: { value: 'paris' },
//   //   })
//   //   expect(nameInput.props().value).toEqual("paris")
//   // })
//   // simulate a change of input string in the 1rst form
//   it('simulate a change in a form input', () => {
//     const myWrapper: any = shallow(<Forecast />)
//     let updateInput: any = simulateChangeInputForm(myWrapper, 'input#cityInput', 'paris')
//     expect(updateInput.props().value).toEqual("paris")
//     updateInput = simulateChangeInputForm(myWrapper, 'input#cityInput2', 'paris')
//     expect(updateInput.props().value).toEqual("paris")
//   })

//   // test('it will render forecast on search click ', () => {
//   //   wrapper.find("#btn-search").simulate("click");
//   //   expect(wrapper.find(".city-temp").text()).toContain("°C");
//   // })

//   // test('Test click event', () => {
//   //   const mockCallBack = jest.fn();

//   //   const button = shallow((<button onClick={mockCallBack}>Ok!</button>));
//   //   button.find('#btn-search').simulate('click');
//   //   expect(mockCallBack.mock.calls).toContain('°C');
//   // });
// })
