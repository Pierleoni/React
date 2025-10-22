import React from "react";

// Dichiaro il componente ItemList
// Tramite la destrutturizzazione prende in input:
//  - items: rappresenta i singoli valori degli array 'produce' e 'pantryItems' 
//            che vengono renderizzati come pulsanti nel componente padre GroceryCart.
//  - onItemClick: è la funzione passata dal padre (in questo caso 'addItem', 
//                 definita come valore dell'omonimo attributo in GroceryCart).
//                 Serve a comunicare verso l’alto quale elemento è stato cliccato.
const ItemList = ({ items, onItemClick }) => {

    // Funzione event handler per gestire il click sui pulsanti.
    // React passa automaticamente l’oggetto evento, da cui estraiamo la proprietà 'target'
    // che rappresenta l’elemento HTML cliccato.
    const handleClick = ({ target }) => {
        // 'target.value' contiene il valore del bottone cliccato,
        // che coincide con il nome dell’elemento di uno dei due array.
        const item = target.value;

        // Richiama la funzione fornita dal padre (onItemClick),
        // passandole come argomento il nome dell’oggetto cliccato.
        onItemClick(item);
    };

    return (
        <div>
            {/* 
            Il metodo .map() scorre tutti gli elementi dell’array 'items' e,
            per ciascun elemento e il suo indice, crea un pulsante.
            */}
            {items.map((item, index) => (
                /* 
                Ogni <button> riceve:
                    - value={item} : identifica quale valore rappresenta;
                    - onClick={handleClick} : event listener che richiama l’handler al click;
                    - key={index} : chiave necessaria a React per mantenere la coerenza
                                    tra DOM e Virtual DOM.
                */
                <button value={item} onClick={handleClick} key={index}>
                    {/* Mostra a schermo il nome dell’elemento */}
                    {item}
                </button>
            ))}
        </div>
    );
}

export default ItemList;
