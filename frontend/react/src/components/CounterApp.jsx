import React from 'react'

const CounterApp = () => {
    const [count, setCount] = useSate(0)
  return (
    <div style={{border: '5px solid red'}}>
      <h1 style={{ color: 'lightblue'}}>CounterApp</h1>
      <br/>
      <button style={{padding: '10px', margin:'20px'}}>Increment</button>
      <span>0</span>
      <button style={{padding: '10px', margin: '20px'}}>Decrement</button>
      </div>
  )
}

export default CounterApp