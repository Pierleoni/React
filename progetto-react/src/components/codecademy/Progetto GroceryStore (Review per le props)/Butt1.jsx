import React from 'react';
// Importo l'array di oggetti arrayCibo
import arrayCibo from './cibo'


// Definisco il componente Butt1 che prende in input l'attributo 'onAddToChart' definita nel componente padre Butt1 in GroceryStore
const Butt1 = ({ onAddToChart }) => {
    // Importante: bisogna restituire il JSX con un return!
    return (
    <div>
        {/* Utilizzo la funzione .map() per iterare sulle coppie chiave-valore dell'array di oggetti */}
        {arrayCibo.map((m) => (
            // Al outer tag div passo come valore dell'attributo key la chiave nome dell'array di oggetti arrayCibo
            <div key={m.nome}>
                <br />
            {/* Passiamo la funzione con l'argomento corretto */}
                {/* Nel tag button uso l'event listener onClick e gli assegno il nome dell'attributo 
                'onAddToChart' definito nel componente GroceryStore, e gli assegno come argomento la chiave nome*/}
                <button className = "btn btn-success" onClick={() => onAddToChart(m.nome, m.prezzo)}>
                    {m.nome}
                </button>
            </div>
        ))}
    </div>
    )
}

export default Butt1
