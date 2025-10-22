import React from 'react';

/* 
1. step: 
    Aggiungere un attributo onClick all'elemento button nel return statement.
    Ricorda di rinominare la prop in talk e di usare la talk property delle props come valore dell'attributo onClick
*/

// Definisco un componente Button a cui passo props come parametro
function Button(props) {
    // Restitusco un elemento button a cui aggiungo un onClick 
    // e come valore passo la proprietà talk definita nel componente padre Talker in props.jsx
    // A cui accedo tramite dot notation
    return (
    <button onClick = {props.talk}>
        Click me!
    </button>
    );
}


// Definsco un nuovo componente Button che prende in input una props
function Button2(props){

    return(
        // Restituisco un elemento button e tramite la props accedo alla proprietà onClick specificata nella componente padre 
        // v. componente Button2 nel componente Speecher in Props.jsx
        /* 
        Quando diamo all'elemento button l'attributo onClick, questo acquiscisce uno scopo particolare:
            - Come gia detto in precedenza, 
                !questo attributo onClick crea un event listener che intercetta i click sul elemento <button> 
        */
        //! In sostanza: l'attributo onClick crea un event listener 
        <button onClick={props.onClick}>
            Clicca Qui
        </button>
    )
}


export {Button2}
export default Button;