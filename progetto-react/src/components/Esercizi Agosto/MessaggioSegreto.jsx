import React, { useState } from 'react'

const MessaggioSegreto = () => {
    const [messaggio, setMessaggio] = useState(false)
    
  return (
    <div>
        <h2>Il messaggio è:</h2>
        {/* Definisco event listenrs e prendo la sunzione setMessaggio e come arogmento
        gli do il contrario del valore corrente: 
            In questo modo se il valore di button è mostra al click dell'utente cambiare valore in "Nascondi" e mostrerà il messaggio segreto */}
        <button className='btn btn-danger' onClick={()=>{setMessaggio(!messaggio)}} > {messaggio?("Nascondi"):("Mostra")}</button>
        
        {/* Se il valore corrente è true mostra il messaggio segreto */}
        {messaggio&&<p>Messaggio Segreto</p>}
    </div>
  )
}

export default MessaggioSegreto