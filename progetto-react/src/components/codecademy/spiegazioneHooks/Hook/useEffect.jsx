
import React, {useState, useEffect} from "react";

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
// import React, { useState, useEffect } from 'react';


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
Riprendiamo il componente visto prima: 
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


Spiegazione: 
?1. Importiamo l'Effect Hook dalla libreria 'react':
    import { useEffect } from 'react';

    !La funzione useEffect() non ha nessun valore di ritorno 
    !come l'Effect Hook è usato per chiamare un altra funzione.

?2. Passiamo la funzione di callback, o effetto, da eseguire dopo il rendering di un componente come argomento della funzione useEffect(): 
    Nel nostro esempio la funzione effect si esegue dopo ogni rendering del componente 'PageTitle'
    () => { document.title = `Hi, ${name}`;}

    Qui, assegniamo 'Hi, ${name}' come valore del document.title (del titolo del documento).

    L'event listener onChange attiva (triggera) 
    il rendering del componente 'PageTitle' ogni volta che l'utente digita nell'input.
    Di consequenza questo attiva (triggera) l'hook useEffect() e cambia il titolo del documento. 
    N.B.: 
        Da notare come viene passato lo stato corrente dentro l'effetto.
        Anche se l'effetto è chiamato dopo che il componente viene renderizzato,
        possiamo ancora accedere alle variabili nello scope (ambito) del nostro componente.
        In altre parole anche se il componente viene renderizzato possiamo accedere alle variabili dentro il nostro componente.
        Quando React esegue il rendering del nostro componente, 
        aggiornerà il DOM come al solito, quindi eseguirà il nostro effetto dopo che il DOM è stato aggiornato. 
        Questo avviene per ogni rendering, compreso il primo e l'ultimo.
    

*/

// Dichiaro il componente 
const Counter = ()=>{
    // Dichiaro e inzializzo uno stato locale chiamato 'count' e la funzione per aggiornarlo 'setCount'
    // Inizializzo lo stato 'count' a zero 
    const [count, setCount] = useState(0);

    // Chiamo useEffect() con una callback function che crea un alert con il valore corrente di count 
    useEffect(()=>{
        // Aggiungo un template literal al messaggio di alert
        alert(`Il valore corrente del contatore è: ${count}`)
    });
    // Dichiaro un event handler per gestire l'incremento del di count +1
    const handleClick = () => {
        // Richiamo lo state setter per aggiornare lo stato
        // definsco variabile prevCount che rappresenta il valore precedente del counte
        // e tramite callback function lo incremento di 1
        setCount((prevCount) =>  prevCount + 1);
    };

    // Ritorno elementi JSX
    return (
    <div>
        {/* Elemento <p> che al suo interno va visualizzare il valore dello stato 'count' */}
        <p>You clicked {count} times</p>
        {/* l'event listener 'onClick' richiama la funzione handleClick: 
            In altre parole ogni volta che il bottone viene premuto il valore dello stato incrementa di 1*/}

        <button onClick={handleClick}>
        Click me
        </button>
    </div>
    );
}



/* 
====================
Pulisci gli effetti
====================

Alcuni effetti richiedono una pulizia.
Ad esempio, vorremmo aggiungere degli event listeners ad alcuni elementi nel DOM, 
oltre al JSX nel nostro componente 
Quando aggiungiamo dei event listeners al DOM, 
è IMPORTANTE rimuoverli una volta terminato il loro utilizzo per evitare perdite di memoria. 

Consideriamo il seguente effetto:
useEffect(()=>{
    document.addEventListener('keydown', handleKeyPress);
    /Specifica come ripulire dopo l'effetto:
    return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
        })
        
        !Se il nostro effetto non restituisse una funzione di pulizia, 
        !ogni volta che il nostro componente viene nuovamente renderizzato 
        !verrebbe aggiunto un nuovo listener di eventi all'oggetto documento del DOM. 
        ?Ciò non solo causerebbe bug, 
        ?ma potrebbe anche ridurre le prestazioni della nostra applicazione e persino provocarne il crash!
        
        Poiché gli effetti vengono eseguiti dopo ogni rendering e non solo una volta, 
        React chiama la nostra funzione di pulizia prima di ogni nuovo rendering e prima dello smontaggio per ripulire ogni chiamata di effetto.
        Se il nostro effetto restituisce una funzione, allora l'
        useEffect()Hook la tratta sempre come funzione di pulizia. 
        React chiamerà questa funzione di pulizia prima che il componente venga nuovamente renderizzato o smontato. 
        !Poiché questa funzione di pulizia è opzionale, è nostra responsabilità restituire una funzione di pulizia dal nostro effetto quando il codice dell'effetto potrebbe creare perdite di memoria.
        */
       
       
       // Dichiaro il componente 
       const Count = ()=>{
           // Dichiaro uno stato locale chiamato 'clickCount' e la funzione per aggiornarlo chiamata 'setClickCount'
           // Inizializzo lo stato a 0 
           const [clickCount, setClickCount] = useState(0);
           // Dichiaro event handler per incrementa il valore dello stato di una unità
           // trmaite callback function richiamo lo state setter e gli passo come argomento la variabile prevClickCount:
           // questa variabile rappresenta il valore precedente del counter che viene aggiornato di una unità
           const increment = ()=>setClickCount(prevClickCount =>prevClickCount+1);
           
           // uso useEffect() hook e lo chiamo con un effetto che serve per aggiungere un event listener
           // per gli eventi 'mousedown' all' oggetto 'document'
           useEffect(()=>{
               
               // Quando un evento 'mousedown' si verifica in qualsiasi punto del documento, 
               // viene anche chiamato l'event handler increment
               
               
               /*  
               L’evento mousedown nel DOM viene generato quando un pulsante del dispositivo di puntamento (es. mouse o touchpad) viene premuto su un elemento.
               
               🔹 Si attiva nel momento in cui il pulsante viene premuto, non quando viene rilasciato.
               🔹 Se vuoi rilevare il rilascio del pulsante, devi invece usare l’evento mouseup.
               🔹 È comunemente utilizzato per avviare operazioni che devono iniziare al clic (ad esempio il drag & drop o l’inizio di un disegno su canvas).
               🔹 Viene seguito, se non viene bloccato, da un evento click quando il pulsante viene premuto e poi rilasciato sullo stesso elemento. */
               document.addEventListener('mousedown', increment)
               
               /* 
               Ritornando al discorso di prima per cui se nel nostro useEffect() non aggiungessimo
               una funzione di pulizia ogni volta che il nostro componente viene re-rendirizzato 
               viene aggiunto, automaticamente, un altro event listener all'oggetto 'document' del DOM. 
               In questo caso, di conseguenza ogni volta che si scatena l'evento viene aggiunto un altro event listener al document 
               */
              // Aggiungo una funzione di pulizia all'hook useEffect()
                return ()=>{
            /* senza questa funzione quando il componente viene renderizzato a ogni click sul documento il valore del contatore viene 
            aggiornato in modo apparentemente randomico: 
                In realtà ogni volta che lo stato cambia (quindi dopo ogni click), React re-renderizza il componente; 
                quindi dopo ogni re-render: 
                    !- viene ricreata una versione della funzione increment (poiché è definita nel corpo del componente);
                    !- viene eseguito l'useEffect()
                    !- Di consequenza viene aggiunto un nuovo event listener al documento che punta alla nuova versione di increment.
            Da qui il comportamento "randomico": 
                Il document ha più listener registrati; uno per ogni render precedente
                quindi cliccando una volta React esegue tutti i listener registrati quindi ad ogni nuovo click 
                lo stato si incrementa di 2,3,4...
                A seconda di quante volte il componente è stato renderizzato.*/
            document.removeEventListener('mousedown', increment)
                }
            });
            
            return (
                <h1>Document Clicks: {clickCount}</h1>
            )
        }
        





/* 
===============================================
Controllo quando vengono richiamati gli effetti
===============================================
La funzione useEffect() chiama il suo primo argomento (l'effetto) dopo ogni rendering di un componente. 
Abbiamo imparato come restituire una funzione di pulizia in modo da non creare problemi di prestazioni 
e altri bug, ma a volte vogliamo saltare del tutto la chiamata al nostro effetto sui re-rendering.

È comune, quando si definisce un componente funzionale, runnare un effetto: 
    - solo quando il componente viene montato (viene renderizzato la prima volta)
    - ma non quando il componente viene re-renderizzato

L'Effect Hook ci viene incontro e facilita questa cosa per noi!
Se volessimo chiamare il nostro effetto dopo il primo render,
!basta passargli un array vuoto all'useEffect() come secondo argomento.
Questo argomento è detto dependency array (matrice di dipendenza):
    il dependecy array è usato per:
        !- dire al metodo useEffect() quando chiamare il nostro effetto e quando saltarlo (skip).
    Il nostro effetto viene sempre richiamato dopo il primo rendering, 
    ma viene richiamato nuovamente solo se qualcosa nel nostro array di dipendenze ha cambiato valore tra un rendering e l'altro.

Continueremo a parlare approfonditamente di questi dependecy array ma per ora concentriamoci
sull'uso di un array di dipendenze vuoto per richiamare un effetto 
quando un componente viene montato per la prima volta e, se il nostro effetto restituisce una funzione di pulizia, 
richiameremo tale funzione quando il componente viene smontato.

Esempio: 
useEffect(() => {
    alert("component rendered for the first time");
    return () => {
    alert("component is being removed from the DOM");
    };
}, []); 

Senza passare un array vuoto come secondo argomento alla funzione useEffect() definita sopra: 
    ?i messaggi di alert verrebbero visualizzati prima e dopo ogni rendering del nostro componente, 
    il che chiaramente non è il momento in cui tali messaggi dovrebbero essere visualizzati. 
    Quindi:
        !è sufficiente passare '[]' alla funzione 'useEffect()' per configurare quando vengono chiamate le funzioni di effetto e pulizia!

*/


// Dichiaro il componente
const Timer = () =>{
    // Dichiaro uno stato locale 'time' e la funzione per aggiornarlo 'setTime'
    // Inizializzo time a 0 tramite l'hook useState. 
    const [time, setTime] = useState(0);

    // Dichiaro uno stato locale 'name' e la sua funzione per aggiornarlo 'setName'
    // Inizializzo name come stringa vuota tramite l'hook useState
    // Serve per gestire il valore del campo di input
    const [name, setName] = useState("");



    // Rispetto alle forme viste nei casi con altri useState questa forma è più compatta ma fa la stessa cosa di: 
    /* const handleChange = ({target}) =>{
        const value = target.value
        setName(value)
        }; */
    const handleChange = ({target})=>{setName(target.value)}

    // Uso l'hook useEffect per aggiornare lo scorrere del timer
    useEffect(() => {
        // Dichiaro una variabile in cui salvo il metodo setInterval:  
            // questo metodo chiama una funzione a uno specifico intervallo in millisecondi
        const intervalId = setInterval(()=>{
            // Difatti tramite callback function richiamo lo state setter e aggiorno il valore precedente incrementadolo di una unità
            setTime((prevTime) =>prevTime+1);
        }, 1000);

        
        // Ora il nostro valore di time si aggiorna troppo velocemente 
        // perché l'Effect Hook chiama l'effetto a ogni render
        // In sintesi: Il nostro effetto è quello di creare un nuovo intervallo che aggiorna il valore del tempo ogni secondo.
        // Continuiamo ad aggiungere sempre più intervalli che aggiornano continuamente la stessa variabile temporale. 
        // Dobbiamo ripulire i nostri vecchi intervalli prima di aggiungerne di nuovi!

        // Aggiungo la funzione di pulizia dell'effetto: 
        // Uso il metodo clearInterval():
            // Questo metodo pulisce un timer settato con il metodo setInterval()
            // Siccome questa funzione deve sapere quale intervallo pulire li passo la variabile intervalId
        return () =>{
            clearInterval((intervalId))
        };
    // uso l'array dependecy vuoto cosicchè l'effetto viene eseguito una sola volta (al mount del componente)
    },[])

    // Ritorno elementi JSX
    return(
        <>
            {/* l'elemento h1 mostra il valore in tempo reale di time  */}
            <h1>Time: {time}</h1>

            <input 
            type="text" 
            // Creo un controlled component:
                // il valore visualizzato nel campo di input deve essere sempre quello contenuto nella variabile di stato 'name'
                // Difatti il valore corrente dello stato
            value={name}
            onChange={handleChange}/>
        </>
    )
}

export {Counter, Count, Timer}