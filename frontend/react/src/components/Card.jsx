import React from 'react'

const Card = (props) => {
  return (
    <div style={{ border: '5px solid red',width: '400px'}}>
        <img src= {props.img} style ={{ borderRadius: '50%' }}/>
      <h3> Student Record</h3>
      <h3> studend Name: {props.name}</h3>
      <h3> student class:{props.class}</h3>
    </div>
  )
}

export default Card
