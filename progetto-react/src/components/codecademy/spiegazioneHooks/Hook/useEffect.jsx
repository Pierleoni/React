
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


/* 
==========================
Fecth Data (Recupero Dati)
==========================
Quando si costruisce un software, spesso iniziamo con comportamenti predefiniti 
e poi li modifichiamo per migliorare le prestazioni.
Abbiamo imparato che il comportamento di defualt dell'Effect Hook è di chiamare la funzione effetto 
dopo ogni singolo render. 
Di seguito, abbiamo imparato che possiamo passare un array vuoto (dependecy array) come secondo argomento
per lo useEffect() solo se vogliamo che il nostro effetto viene chiamato dopo il primo render del componente.

Ora in questo esercizio, impareremo a usare il dependecy array per configurare con maggiore precisione quando vogliamo che il nostro effetto venga richiamato!

Quando il nostro effetto è responsabile del recupero dei dati (Fetch Data),
dobbiamo prestare maggiore attenzione a quando viene richiamato il nostro effetto.
I viaggi di andata e ritorno non necessari tra i nostri componenti React e il server possono essere costosi in termini di:
    - Elaborazione
    - Prestazioni
    - Utilizzo dei dati per gli utenti mobili
    - Commissioni per i servizi API

Quando i dati necessari al rendering del componente non cambiano, 
possiamo passare un array di dipendenze vuoto in modo che i dati vengano recuperati solo dopo il primo render.

Mentre quando riceviamo la risposta dal server, 
possiamo usare uno state setter dello State Hook per memorizzare i dati della risposta del server nel nostro stato locale del componente per i rendering futuri.
Usare lo state Hook e l'effect Hook insieme in questo modo è un pattern molto potente che salva 
i nostri componenti dal recupero di nuovi dati non necessari dopo ogni render!

Un array di dipendenze vuoto segnala all'Effect Hook che il nostro effetto non deve mai essere rieseguito, che non dipende da nulla.
Se specifichiamo zero dipendenze (dependecy array vuoto) stiamo dicendo che il risultato dell'esecuzione di quell'effetto
non cambierà e che è sufficiente richiamare il nostro effetto una sola volta.
Mentre un dependecy array non vuoto segnala all'Effect Hook che esso può saltare la chiamata al nostro effetto dopo ogni re-render,
a meno che il valore di una delle variabili nel nostro dependecy array viene cambiata.
Se il valore di una dipendenza viene cambiato, allora l'effect hook chiamerà ancora il nostro effetto 

Esempio: 
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if the value stored by count changes

Spiegazione: 
1. useEffect(()=>{...}): useEffect è l’hook che consente di eseguire effetti collaterali dopo il rendering del componente.
    Per “effetto collaterale” si intende qualsiasi operazione che interagisce con l’esterno del componente: aggiornare il titolo della pagina, effettuare richieste HTTP, impostare timer, registrare listener, ecc.

2. document.title = `You clicked ${count} times`;: qui stiamo cambiando il titolo della scheda del browser ogni volta che il valore di count viene aggiornato.
    Ricodiamo che: 
        React esegue l’effetto dopo ogni render del componente (non durante).

        Tuttavia, come vedremo, questo comportamento può essere controllato tramite il dependency array.

3. Il dependecy array: [count]: 
    L'array di dipendenze indica a React quando deve rieseguire l'effetto 
    Nel caso specifico: 
        - L'effetto viene eseguito dopo il primo render (mount).

        - Successivamente, viene rieseguito solo se il valore di count cambia rispetto al render precedente.

        - Se count rimane invariato, l’effetto viene saltato.

Questo consente di evitare lavoro inutile e di eseguire l’effetto solo quando serve.

Nota: Perché il dependency array è importante

    Il dependency array permette di:

        - controllare la frequenza con cui l’effetto viene richiamato;
        
        - sincronizzare l’effetto con lo stato e le props;
        
        - prevenire logiche ridondanti e possibili problemi di prestazioni.
*/

// Importo un componente get dal file 'fetch.js' che simula la chiamata a un server
import { get } from "../../../../mockBackend/fetch";

const Forecast = () =>{
    const [data, setData] = useState();
    const [notes, setNotes] = useState({});
    const [forecastType, setForecastType] = useState('/daily');

    useEffect(() => {
    alert('Requested data from server...');
    // Come per i bottoni: in questo modo i due endpoint cambiano in modo dinamico e reattivo
    get(forecastType).then((response) => {
        alert('Response: ' + JSON.stringify(response,'',2));
        // Ora per storare la response dei dati nel nostro stato aggiungo questa riga: 
            // In questo modo quando i dati vengono recuperati vengono immagazzinati nello 
            // stato del nostro componente tramite lo state setter 'setData'
        setData(response.data);
    /* Da notare come ogni volta che digitiamo qualcosa in un campo di input, il componente 
    viene re-renderizzato per mostrare il nuovo valore di quel campo. 
    Anche se non abbiamo bisogno di nuovi dati dal backend, 
    il nostro componente recupera nuovi dati dopo ogni rendering!
    Petr ovviare a questo bug usiamo una dependecy array: 
    in questo modo ci assicuriamo che i dati vengono recuperati solo do il primo render del componente*/

    
    });
    // Agguiungo la varibile di stato forecastType al dependecy array di get; in questo modo ogni volta che i due bottoni vengono premuti quindi cambia la variaible di stato 
    // L'effetto viene richiamato e quindi si ha un altra chiamata di get al server
},[forecastType]);

    const handleChange = (index) => ({ target }) =>
    setNotes((prev) => ({
        ...prev,
        [itemId]: target.value
    }));

    // Implemento condizione if per controllare se i dati hanno valori falsy
    if (!data){
        // Se cosi fosse restituisco un paragrafo con contenuto loading
        return <p>Loading...</p>
    }
    return (
    <div className='App'>
        <h1>My Weather Planner</h1>
        <div>
        {/* Questi due bottoni servono per aiutare l'utente a scegliere tra
        la pianificazione basata sulle previsioni meteorologiche giornaliere e quella basata sulle previsioni meteorologiche settimanali.
        Tuttavia quando li clicchiamo nel browser non succede nulla: questo perché non cabiano lo stato del componente
        visto che la variabile di stato 'forecastType' è settata di default sull'endpoint 'daily'. 
        Per risolvere ciò utilizziamo la variabile di stato e non i due endpoint '/daily' e '/hourly', in questo modo decidiamo in modo reattivo 
        quale endpoint il nostro effetto deve richiedere i dati
        */}
        {/* <button onClick={() => setForecastType('/daily')}>5-day</button> */}
        {/* <button onClick={() => setForecastType('/hourly')}>Today</button> */}
        <button onClick={() => setForecastType(forecastType)}>5-day</button>
        <button onClick={() => setForecastType(forecastType)}>Today</button>
        </div>
        <table>
        <thead>
        <tr>
            <th>Summary</th>
            <th>Avg Temp</th>
            <th>Precip</th>
            <th>Notes</th>
        </tr>
        </thead>
        <tbody>
            {data.map((item, i) => (
            <tr key={item.id}>
                <td>{item.summary}</td>
                <td> {item.temp.avg}°F</td>
                <td>{item.precip}%</td>
                <td>
                <input
                  value={notes[item.id] || ''}
                  onChange={handleChange(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* 
Regole degli Hooks
Ci sono 2 regole principali da tenere a mente quando si usano gli Hooks: 
!1. Chiamare gli Hook solo al livello superiore del componente 
!2. Chiamare gli Hooks solo dalle funzioni React 
Mentre ci esercitavamo con lo State Hook e l'Effect Hook, 
abbiamo seguito queste regole con facilità, 
ma è utile tenere a mente queste due regole quando si applica la nuova comprensione degli Hook e si inizia a utilizzare più Hook nelle applicazioni React.

Quando React costruisce il Virtual DOM (https://www.codecademy.com/resources/docs/react/virtual-dom), 
!la libreria chiama ripetutamente le funzioni che definiscono i nostri componenti mentre l'utente interagisce con l'interfaccia utente.
React tiene traccia dei dati e delle funzioni che gestiamo con gli Hook in base al loro ordine nella definizione della componente.
Per questo motivo, chiamiamo sempre i nostri Hooks al livello superiore; 
    ?non chiamiamo mai gli hook all'interno di loop, condizioni o funzioni nidificate.

Invece di confondere React con codice come questo:
if (userName !== '') {
  useEffect(() => {
    localStorage.setItem('savedUserName', userName);
  });
}

Possiamo raggiungere lo stesso obiettivo richiamando costantemente il nostro Hook ogni volta:
useEffect(() => {
  if (userName !== '') {
    localStorage.setItem('savedUserName', userName);
  }
});


!In secondo luogo, Hooks può essere utilizzato solo nelle funzioni React.
Abbiamo lavorato con useState() e useEffect() nei componenti funzionali, e questo è l'uso più comune.
L'unico altro posto in cui è possibile utilizzare gli hook è all'interno degli hook personalizzati.
Gli hooks personalizzati(Custom Hook: https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components)
sono incredibilmente utili per organizzare e riutilizzare la logica stateful tra i componenti delle funzioni.
*/


export {Counter, Count, Timer, Forecast}