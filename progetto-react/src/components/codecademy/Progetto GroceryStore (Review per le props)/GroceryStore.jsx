import React, { useState } from 'react'
// Importo il componente figlio Butt1
import Butt1 from './Butt1'
import ButtTot from './ButtTot'
// import  arrayCibo  from './cibo';

// Definisco il componente GroceryStore
const GroceryStore = () => {
    // Dichiaro hook useState che mi servirà per aggiornare lo stato del componente per il calcolo del prezzo totale
    const [prize, setPrize] = useState(0)

    // Definisco una funzione che prende in input la prop productName
    function onAddToChart(productName, productPrezzo){
        // Questa funzione restiruisce un messaggio di alert con il nome del prodotto scelto e il suo prezzo
        alert(`Il prodotto ${productName} è stato aggiunto al carello.\nPrezzo: ${productPrezzo}`)
    };

    // Definsco una nuova funzione
    function onSumTot(prize){
        // Aggiorno lo stato del componente sommando il prezzo precedente a quello successivo del prodotto appena scelto
        setPrize(prize =>prize+prize.prezzo)
        // Viene visualizzato un messaggio di alert che dichiara il totale
        alert(`Il totale è: ${prize.prezzo}`)
        

        
    }
    // Ritorno JSX
    return (
        <div>
        <h2>Grocery Store</h2>
        

        {/* Uso il componente Butt1 e gli assegno un attributo il cui valore è la funzione onAddToChart */}
        <Butt1 onAddToChart = {onAddToChart}></Butt1> 
        {/* Renderizzo il componente ButtTot e setto il valore dell'attributo a setPrize: 
            In questo modo ogni volta che il bottone viene premuto il prezzo totale si aggiorna*/}
        <ButtTot onSumTot = {setPrize} />
        <p>Totale: {prize}</p>
        
        
        </div>
    )
}

export default GroceryStore