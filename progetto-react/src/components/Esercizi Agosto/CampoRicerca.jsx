import React, { useState } from 'react'

const CampoRicerca = () => {
    const [testoRicerca, setTestoRicerca] = useState("")
    function handleChange ({target}){
        const newRicerca = target.value
        setTestoRicerca(newRicerca)
    }
    return (
    <div>
        <h2>Campo Ricerca</h2> 
        <form action="">
            <input type="text" value={testoRicerca} onChange={handleChange} />

            <p>Stai cercando: {testoRicerca}</p>
        </form>
        
    </div>
    )
}

export default CampoRicerca