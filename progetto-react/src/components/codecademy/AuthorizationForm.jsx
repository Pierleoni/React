import React, { useState } from 'react';
// Importa React e lo useState, che serve a gestire lo stato interno del componente

// Definizione del componente Contact (funzione che restituisce del JSX)
function Contact() {
    // Variabile che setta la password corretta
    // Serve come riferimento per verificare l'input dell'utente.
    const password = 'swordfish';

    // Hook useState che definisce una variabile di stato "authorized".
        //! - authorized: indica se l’utente è autorizzato o meno (true/false)
        //! - setAuthorized: funzione che aggiorna lo stato "authorized"
        // Inizialmente lo stato è false, cioè non autorizzato.
    const [authorized, setAuthorized] = useState(false);

    // Funzione interna che si attiva quando viene inviato il form (onSubmit).
    // Riceve come parametro l’evento "e".
    function handleSubmit(e) {

    //! Recupera il valore dell’input di tipo password dal form inviato.
    const enteredPassword = e.target.querySelector(
        'input[type="password"]').value;
    
    //! Confronta la password inserita con quella corretta.
    //! Restituisce true se coincidono, altrimenti false.
    const auth = enteredPassword == password;

    // Aggiorna lo stato authorized in base al risultato del confronto.
    setAuthorized(auth)
    }

    /* 2. Se l'utente non è autorizzato deve essere visualizzato un login form nel quale è possbilie
        - inserire la password*/
    // Dichiaro una variabile login in cui salvo un form con un solo attributo

    const login = (<form action="#" onSubmit={handleSubmit}>

        {/* All'interno del tag form aggiungo due tag input con relativi atributi */}
        <input type = "password" placeholder = "Password" />
        <input type = "submit" />
    </form>);

    {/* 3. Ora dobbiamo nascondere le info del contatto */}
    // Dichiaro variabile in cui salvo una lista non ordinata con l'email e il numero di telefono del contatto
    const contactInfo = (<ul>
                <li>client@example.com</li>
                <li>555.555.5555</li>
            </ul>);
    // La funzione Contact deve restituire del JSX, cioè l’interfaccia grafica da mostrare.
    return (
        <div id="authorization">
        {/* 1. Fare in modo che all'interno del tag h1 venga mostrato 'Contact'
        se l'utente è autorizzato, altrimenti deve essere visualizzato 'Enter the Password'*/}
        <h1>Contact</h1>
        {/* Uso un operatore ternario: 
            - Valuto il valore di autohrized: 
                Se authorized è true allora ritorna il valore della della variabile contanctInfo(cioè l'email e il numero di cell dell'utente loggato)
                Se è false rimane il form per loggarsi 
            */}
            
        {authorized ?(contactInfo):(login)}
    </div>
    );
}

export default Contact;