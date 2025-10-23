/* 
=========================
Perché usare lo useEffect?
==========================

Prima degli Hooks (https://www.codecademy.com/resources/docs/react/hooks) i componenti funzionali venivano utilizzati 
solo per accettare dati sotto forma di props (https://www.codecademy.com/resources/docs/react/props) e per ritornare 
elementi JSX che dovevano essere renderizzate.
Tuttavia, come abbiamo imparato nella lezione precedente, 
!lo State Hook ci permette di gestire dati dinamici, 
!sotto forma di stato dei componenti, all'interno dei nostri componenti funzionali.
In questa lezione, vedremo come usare l'Effect Hook per runnare codice JavaScript dopo ogni render per:
!- recuperare (fetch) dati da un servizio di back-end
!- iscriversi a un flusso di dati.
!- Gestire timer e intervalli 
!- Leggere e apportare modifiche al DOM.

I componenti verranno re-renderizzati più volte attraverso il loro tempo di vita.
Questi momenti chiave presentano le perfette opportunità per eseguire questi "side effects". 

Ci sono tre momenti chiave in cui è possibile utilizzare l'Effect Hook:

    !1. Quando il componente viene aggiunto o montato per la prima volta al DOM e viene renderizzato.
    !2. Quando lo stato o le proprietà cambiano, causando il re-renderizzazione del componente.
    !3. Quando il componente viene rimosso o smontato dal DOM.


Più avanti in questa lezione impareremo come ottimizzare ulteriormente il momento esatto in cui viene eseguito l'Effect Hook.

Guardiamo a questo esempio: 
*/
// 1. import standard in un file React 
    // importa la libreria React
    //e i due Hook: 
        // useState → per lo stato locale 
        // useEffect → per gli effetti collaterali (side effects)
import React, { useState, useEffect } from 'react';
 

// 2. Definisce un componente funzionale chiamato 'PageTitle':
    //l'export default rende questo componente l'esportazione predefinita del file, così può essere importato con import PageTitle from './PageTitle'.
    //
export default function PageTitle() {

    // Dichiara uno stato locale chiamato 'name' e la funzione per aggiornarlo 'setName'. 
    // Inzializza lo stato 'name' come stringa vuota. 
    // Quindi quando si chiama il setName, React programma un re-render del componente con il nuovo valore di name. 

    const [name, setName] = useState('');
    

    /* 
    !- Inizia la definizione di un effect: 
        Gli effect servono per eseguire codice che ha effetti collaterali rispetto al rendering 
        (es. modificare il DOM, fare fetch, iscriversi a eventi, aggiornare il document title, ecc.).

    !- La funzione passata a useEffect viene eseguita dopo che React ha aggiornato il DOM (dopo il render).
    */
    useEffect(() => {
        // Qui l'effetto imposta il titolo della pagina (<title> della scheda browser)
        // concatenando il valore di 'name'
        // In altre parole: 
            //! Ogni volta che l'effect viene eseguito, il titolo del tab cambierà in base al valore corrente di name.
        document.title = `Hi, ${name}`;

        // Questa è la dependency array dell'effect.
        // Il suo significato: esegui l'effetto solo quando il valore di 'name' cambia.
        // Se la lista fosse vuota ('[]'), l'effetto verrebbe eseguito solo una volta al montaggio del componente;
        // Senza array (nessuna dipendenza) l'effetto verrebbe eseguito ad ogni render — cosa spesso indesiderata.
    }, [name]);
    
    
    // È l'output JSX del componente (l'interfaccia che verrà renderizzata)
    return (
    <div>
        {/* Ritorna un elemento <p> che contiene il valore corrente dello stato */}
        <p>Use {name} input field below to rename this page!</p>
        <input 

        // Event listener: 
            // Qui si usa destructuring nell'argomento: ({ target }) estrae la proprietà target dall'evento. 
            // target.value è il valore corrente dell'input.
            // setName(target.value) aggiorna lo stato name col testo inserito, facendo ripartire un re-render.
        onChange={({target}) => setName(target.value)}


        // Questo attributo rende l'input un controlled component: 
        //!  il valore mostrato nell'input è sempre legato allo stato name.

        // Ogni cambiamento visibile nell'input deve passare tramite setName. 
        // Questo permette a React di avere il controllo completo sul valore del campo (utile per validazioni, formattazioni, ecc.).
        value={name} 
        
        // Specifica il comportamento del campo di input 
        type='text' />
    </div>
    );
}


/* 
=================================
Effetti dei componenti funzionali
=================================
L'effect hook dice al tuo componente di fare qualcosa ogni volta che viene renderizzato (o re-renderizzato).
In combinazione con gli stati, possiamo usare l'effect hook per creare cambiamenti dinamici interessati nella nostra pagina web.

Supponiamo di voler permettere all'utente di cambiare il titolo della tab della pagina web ogni volta che scrive su tastiera:
    Possiamo 
Riprendiamo il componente visto prima visto prima: 
import React, { useState, useEffect } from 'react';
 
function PageTitle() {
  const [name, setName] = useState('');
 
  useEffect(() => {
    document.title = `Hi, ${name}`;
  });
 
  return (
    <div>
      <p>Use the input field below to rename this page!</p>
      <input onChange={({target}) => setName(target.value)} value={name} type='text' />
    </div>
  );
}

*/