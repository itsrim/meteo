import React from 'react'

export default function Counter() {
  const [counter, setCounter] = React.useState<number>(0);

  return (
    <div>
      <h1>Counter</h1>
      <button id="increment-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
        onClick={() => setCounter(counter + 1)}>Increment</button>
      <button id="decrement-btn" style={{ border: "1px solid yellow", borderRadius: "8px", padding: "3px 3px" }}
        onClick={() => setCounter(counter > 0 ? counter - 1 : 0)}>Decrement</button>
      <div id="counter-value">{counter}</div>
    </div>
  )
}
