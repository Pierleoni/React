/* 
Importa la libreria React e la funzione createRoot da react-dom/client
In particolare createRoot serve per dire a React dove montare
l'applicazione nel DOM reale (nuova versione rispetto al vecchio ReactDOM.render)
*/

import React from 'react';
import { createRoot } from 'react-dom/client'


/* 
Recupera dal DOM reale (cioè la pagina HTML) l'elemento con 
l'id = "app"
Esso è il contenitore in cui React inietterà il suo contenuto
*/
const container = document.getElementById('app');

/* 
Inizializza la root React dentro il contenitore selezionato.
Da qui in poi, React controllerà tutto ciò che viene renderizzato
dentro questo nodo del DOM.
*/
const root = createRoot(container);
// Write code here:

// Creo elemento JSX (cioè un div)
// className = "big" è la stessa cosa che scrivere class = "big" in un tag HTLM
const myDiv = (<div className = "big">I AM A BIG DIV</div>)

/* 
Renderizza l'elemento React myDiv all'interno del contenitore #app
In sostanza, React aggiorna il Virtual DOM, lo confronta con il DOM reale
    e poi scrive dentro il contenitore #app il codice HTML corrispondente.
    Quindi l'expected output sarà: I AM A BIG DIV

*/
root.render(myDiv)