import React, { useState } from 'react'

const Termostato = () => {
    const [temp, setTemp] = useState(0)
    const raise = ()=>setTemp(temp+1)
    const decrease = ()=>setTemp(temp -1)
    return (
        <div>
            <h1>Temperatura : {temp}</h1>
            <button className='btn btn-success' onClick={raise}>+</button>
            <button className='btn btn-success' onClick={decrease}>-</button>
        </div>
    )
}

export default Termostato