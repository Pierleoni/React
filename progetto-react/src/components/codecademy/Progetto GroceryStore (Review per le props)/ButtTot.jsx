import React from 'react';

// Importo l'array di oggetti 
import arrayCibo from './cibo';

// Definisco un nuovo componente che prende in input la funzione onSumTot definita nel componente GroceryStore
const ButtTot = ({onSumTot}) => {
    // Ritorno elementi JSX
    return (
        <div>
        {/* Itero sull'array di oggetti  */}
        {arrayCibo.map((p) =>{

            return(
            // Creo un elemento JSX e gli assegno l'indicizzazione per ciascun elemento contentuto tra i due tag in base alla chiave nome di arrayCibo
            <div key={p.nome}>
                <br />
                {/* All'attributo onSubmit assegno il metodo preventDefault:
                - Questo metodo impedisce il comportamento predefinito dell'evento form. 
                - In questo caso senza senza questo metodo ogni volta che l'utente preme il bottone
                    il form verrebbe inviato e la pagina si ricaricherebbe.
                    Con questo metodo il form non viene inviato e posso gestire l'evento con la logica JS/React*/}
                <form onSubmit={(e)=>e.preventDefault()}>
                

                    {/* All'elemento button tramite event onClick assegno l'attributo onSumTot che calcola il
                    totale precedente e lo aggiorno con il prezzo del nuovo prodotto scelto*/}
                    <button 
                    className='btn btn-primary' 
                    type='submit' 
                    onClick={()=>onSumTot(prev=> prev+p.prezzo)}>
                        Aggiungi {p.nome} al totale
                    </button>
                </form>
                
            </div>
        )}
        )}
        </div>
    )
}

export default ButtTot