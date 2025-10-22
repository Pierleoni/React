import { questions } from "./Questions";
import ItemList from "./ItemList";
import { produce, pantryItems } from "./storeItem";

/* 
==========================
Perché usare gli Hooks?
==========================
Cosa dovremmo fare se vogliamo aggiungere uno stato al nostro componente?
O, meglio, come fare se volessimo che la nostra app risponda ai cambiamenti dei dati?

Per rispondere a queste domande dobbiamo introdurre gli *Hooks* di React.

In parole semplici, i React Hooks sono funzioni che:
    !✅ ci permettono di gestire lo stato interno dei componenti;
    !✅ ci consentono di gestire gli effetti collaterali successivi al rendering,
        !direttamente all’interno dei componenti funzionali.

Utilizzando gli Hooks:
    ✅ possiamo determinare cosa mostrare agli utenti,
    ✅ dichiarando come dovrebbe apparire la nostra interfaccia utente 
        in base allo stato.

React offre diversi Hooks integrati (*built-in*). I più comunemente usati sono:
    1. useState()
    2. useEffect()
    3. useContext()
    4. useReducer()
    5. useRef()

In questa sezione vedremo come:
    - Costruire un componente "stateful"
    - Usare l'hook useState()
    - Inizializzare e aggiornare uno stato
    - Definire event handler
    - Usare funzioni di callback per aggiornare lo stato
    - Usare lo state hook con array e oggetti


==============================
Modificare un Componente con lo State Hook
==============================
Iniziamo con `useState()`: 
    è l’hook più comune per gestire lo stato nei componenti React.

Questo hook viene esportato dalla libreria di React tramite un *named export*, 
quindi va importato tramite destrutturazione come segue:

    import React, { useState } from 'react';

Quando richiamiamo la funzione `useState()`, 
    essa restituisce un **array con due valori**:

        !1️⃣ Lo stato corrente → il valore attuale di quello stato.  
        !2️⃣ La funzione setter dello stato → una funzione che consente di aggiornare il valore dello stato.

Possiamo utilizzare questi due valori per tenere traccia dello stato di un dato
e aggiornarlo quando necessario.

Per estrarre i due valori dall’array restituito da `useState()`, possiamo usare
la destrutturazione degli array, ad esempio:

    const [currentState, setCurrentState] = useState();

dove:
    - `currentState` rappresenta il valore attuale dello stato;
    - `setCurrentState` è la funzione usata per modificarlo.


==============================
Esempio pratico
============================== */

// Importiamo React e l'hook useState
import React, { useState } from "react";

// Definiamo una function component 'Toggle'
function Toggle() {
    // Assegniamo useState a una costante ed estraiamo i due valori
    // Inizializziamo lo stato con valore undefined:
        //? N.B.: questo perchè non si sa a priori che tipo di dato lo stato conterrà
    const [toggle, setToggle] = useState();

    // Ritorniamo elementi JSX 
    return (
        <div>
            <p>The toggle is {toggle}</p>
            {/* La funzione setter dello stato viene chiamata all'evento onClick */}
            <button onClick={() => setToggle("On")}>On</button>
            <button onClick={() => setToggle("Off")}>Off</button>
        </div>
    );
}



export default function ColorPicker() {
//1. richiamare lo useState e assegnare il suo valore di ritorno a 'color' e 'setColor'
    // Ex 2: Inzializza lo useState con il colore 'Tomato' quando appare per la prima volta sullo schermo
    const [color, setColor] = useState("Tomato")
    
    //2. Inzializzo variabile divStyle con valore coppia chiave-valore per settare il colore di background della pagina
    // 4. Aggiornare l'oggetto divStyle in modo che la proprietà backgroundColor
    // è settata al valore corrente dello stato invece di far visualizzare sempre viola
    const divStyle = {backgroundColor: color};
    console.log(divStyle)

    return (
    // Aggiungo variabile divStyle come valore dell'attributo style nel outer div
    <div style={divStyle}>
        <p>The color is {color}</p>
        {/* 3. usare l'event listeners onClick per richiamare la setter function setColor() 
        con il colore appropriato quando l'utente cliccka su ciascuno di questi bottoni*/}
        <button type="button" className="btn btn-success" onClick={()=>setColor("Aquamarine")}>
        Aquamarine
        </button>
        <button type="button" className="btn btn-success" onClick={()=>setColor("BlueViolet")}>
        BlueViolet
        </button>
        <button type="button" className="btn btn-success" onClick={()=>setColor('Chartreuse')}>
        Chartreuse
        </button>
        <button type="button" className="btn btn-success" onClick={()=>setColor('CornflowerBlue')}>
        CornflowerBlue
        </button>
    </div>
    );
}


/* 
===============================
Inizializza lo stato
==============================
Cosi come possiamo usare l'hook State per maneggiare 
una variabile con valori di tipo stringa,
possiamo usare lo State Hook per maneggiare il valore 
di un qualsiasi tipo di dato primitivo e anche collezioni di dati come array e oggetti.

Es: 
Diamo un occhiata al seguente componente: quale tipo di dato questa variabile di stato manipola?
import React, { useState } from 'react';

function ToggleLoading() {
    const [isLoading, setIsLoading] = useState();

    return (
    <div>
        <p>The data is {isLoading ? 'Loading' : 'Not Loading'}</p>
        <button onClick={() => setIsLoading(true)}>
        Turn Loading On
        </button>
        <button onClick={() => setIsLoading(false)}>
        Turn Loading Off
        </button>
    </div>
    );
}

Qui la function component ToggleLoading usa il più semplice dei tipo di dato: 
un booleano.
I booleani sono frequentemente usati nella applicazioni React per rappresentare
qualsiasi dato che è stato caricato oppure no.
Nell'esempio sopra: 
 possiamo vedere che i valori true e false sono passati al setter dello stato (setIsLoading()).

Questo codice funziona bene così com’è, 
ma cosa succede se vogliamo che il nostro componente inizi con isLoading impostato a true?

Per inizializzare lo stato con qualsiasi valore desideriamo, 
basta passare il valore iniziale come argomento alla chiamata della funzione useState().

Es: 
const [isLoading, setIsLoading] = useState(true);


Ci sono tre effetti di questo codice sul componente:

    !1. Durante il primo render, viene usato l’argomento dello stato iniziale.

    !2. Quando viene chiamata la funzione setter dello stato, 
        ?React ignora l’argomento iniziale e usa il nuovo valore.

    !3. Quando il componente viene ri-renderizzato per qualsiasi altro motivo, 
        ?React continua a usare lo stesso valore proveniente dal render precedente.

!Se non passiamo un valore iniziale quando chiamiamo useState(), 
!il valore corrente dello stato durante il primo render sarà undefined. 
Spesso questo va bene per il computer che esegue il codice, 
ma può risultare poco chiaro per chi legge il codice.
Per questo motivo, è preferibile inizializzare esplicitamente lo stato. 
Se non abbiamo un valore disponibile durante il primo render, 
?possiamo passare esplicitamente null invece di lasciare passivamente il valore come undefined.

N.B: la prassi è la seguente: 
    Se non si sa a priori che tipo di dato lo stato conterrà, 
        !inizializzare lo useState come undefined
        Perché :
            1. Esplicita che il valore non è ancora definito.
                Serve a distinguere tra “non ancora impostato” e 
                “impostato a null/0/''” in modo chiaro.

            2. Flessibilità.
                Lo stato può diventare qualsiasi tipo di dato in seguito 
                (stringa, numero, oggetto, array…) senza conflitti con il tipo iniziale.

            3. Chiarezza nel debugging.
                Quando guardi il valore iniziale in React DevTools o in console, 
                undefined indica subito che il componente non ha ancora ricevuto dati.

Mentre se il valore deve essere sempre di un certo tipo (es: stringa, bool, int, float, array, object, ecc.)
è meglio inizializzare con i relativi tipi di dati invece di undefined.
es: 
const [items, setItems] = useState([]); // sempre array, evita controlli extra
const [user, setUser] = useState({}); // sempre oggetto

*/


/* ====================================
Utilizzare il setter state fuori da JSX
=======================================
Vediamo un esempio di gestione del valore variabile di una stringa 
mentre un utente digita in un campo di input di testo:
import React, { useState } from 'react';

export default function EmailTextInput() {
    const [email, setEmail] = useState('');
    const handleChange = (event) => {
        const updatedEmail = event.target.value;
        setEmail(updatedEmail);
    }

    return (
        <input value={email} onChange={handleChange} />
    );
}

Ecco una spiegazione dettagliata di come funziona il codice sopra:

    ?- Usiamo la destrutturizzazione degli array per creare la nostra variabile di stato locale email e la funzione setter locale setEmail().

    ?- La variabile locale email viene assegnata al valore corrente dello stato, 
        ?che si trova all’indice 0 dell’array restituito da useState().
    ?- La variabile locale setEmail() viene assegnata a un riferimento della funzione setter dello stato, 
        ?che si trova all’indice 1 dell’array restituito da useState().
    ?- È una convenzione denominare la variabile setter utilizzando il nome della variabile di stato corrente (in questo esempio, email) preceduto dal prefisso “set”.

Il tag JSX è un’estensione della sintassi di JavaScript che fornisce 
un linguaggio di markup altamente funzionale e riutilizzabile. 
Viene utilizzato per creare elementi del DOM che vengono poi renderizzati nel DOM di React. 
JSX offre una rappresentazione visiva chiara e ordinata dell’interfaccia utente.

L’elemento input in JSX possiede un event listener chiamato onChange. 
Questo listener richiama una event handler ogni volta che l’utente digita qualcosa all’interno dell’elemento.

Nell’esempio precedente, 
il nostro event handler è definito all’interno della definizione del componente funzionale, ma al di fuori del codice JSX. 
In precedenza, in questa lezione, avevamo scritto gli event handler direttamente all’interno del JSX (inline event handlers).

Questi event handler inline funzionano perfettamente, 
ma quando vogliamo eseguire operazioni più complesse che vanno oltre la semplice chiamata del setter dello stato con un valore statico, 
è buona pratica separare quella logica dal JSX.

Questa separazione delle responsabilità 
(separation of concerns) rende il codice più leggibile, più facile da testare e più semplice da modificare.

È pratica comune in React semplificare questo: 

const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);}

con questo: 

    const handleChange = (event) => setEmail(event.target.value);

O usando la destrutturizazione degli oggetti, in questo modo: 
    const handleChange = ({target}) => setEmail(target.value);


Tutti questi tre snippet di codice si comportano allo stesso modo, 
quindi non c'è un modo giusto o sbalgiato tra questi tre snippets di codice.
È buona pratica usare l'ultimo perché è più conciso e facile da leggere 

*/



// Dichiaro variabile locale a cui assegno un espressione regolare 
const validPhoneNumber = /^\d{1,10}$/;

// Dichiaro un componente
const PhoneNumber = ()=>{
    // 1. Dichiarare ed assegnare valori per lo stato corrente e il setter state usando useState().
    // Usare phone come nome per lo stato della variabile 

    // Assegno lo useState a una varbile ed estraggo i due valori 
    const [phone, setPhone] = useState("")


    /* 4. Completare la funzione handleChange:
        Questa funzione controlla la validità del valore dell'input che l'utente sta digitando.
    Questa funzione viene chiamata ogni volta che l'utente digita qualcosa nel campo di input:
        React in automatico passa un oggetto evento come argomento.

        Il parametro target sta ad indicare la proprietà dell'evento: 
            !In altre parole target è l'elemento HTML che ha generato l'evento (il tag <input>)*/
    const handleChange = ({ target })=> {


        const newPhone = target.value;
        // target.value → è il valore attuale del campo di input, cioè ciò che l'utente ha digitato fino a quel momento.
        // Se l'utente digita 3 → target.value === "3"
            // Poi digita 39 → target.value ==="39"
        // Questo valore viene salvato nella variabile locale newPhone in modo che: 
            //? - possa essere controllato con la regex `validPhoneNumber.test(newPhone)`
            // - Se è valido, possa essere usato per aggiornare lo stato React con (setPhone(newPhone))
        console.log(newPhone)

        // Variabile che controlla la validita del valore del target della variabile newPhone, restiuisce un booleano
        const isValid = validPhoneNumber.test(newPhone);
        // 4.1 Se l'input è una sequenza numerica, deve aggiornare lo stato della variabile attraverso la setter function
        
        // Se il valore è true
        if (isValid) {
            // update state 
            
            // Aggiorno lo stato tramite il valore di newPhone, quindi dell'ultimo valore inserito
            setPhone(newPhone);
    }
    // just ignore the event, when new value is invalid
    
    };

    return (
        <div className='phone'>
            <label htmlFor='phone-input'>Phone: </label>
            {/* 2. Specificare il valore del input tag JSX, 
            aggiungendo un attributo value e sttandolo il suo valore con la variabile di stato phone
            3. Aggiungere un event listener per rilevare qualsiasi cambiamento al input tag mentre l'utente sta digitando.
                3.1 assegnare all'evento la funzione handleChange
            */}

            {/* Ogni volta che l'utente digita un numero nel campo input, questo attiva
            l'evento onChange che richiama la funzione handleChange
            
            Utente digita → onChange → handleChange → setPhone() → React aggiorna stato → nuovo render → input mostra il nuovo valore
            */}
            <input value={phone}  onChange={handleChange} id='phone-input' />
        </div>
    );
}



/* 
============================
Settare lo stato precedente 
============================
============================
Settare lo stato precedente 
============================
Nell'esercizio precedente abbiamo imparato come aggiornare lo stato
passandogli un nuovo valore, ad esempio:
    setState(newStateValue);

Tuttavia, gli aggiornamenti dello stato in React sono **asincroni**:
    - in altre parole, in certi casi alcune porzioni di codice possono essere eseguite
        prima che lo stato venga effettivamente aggiornato.

Questo comportamento è sia vantaggioso che rischioso:
    - Raggruppare più aggiornamenti di stato può migliorare le prestazioni complessive dell’app.
    - Tuttavia, può anche portare all’utilizzo di **valori di stato obsoleti**.

Per questo motivo, è considerata una **buona pratica** aggiornare lo stato
usando una *callback function*, al fine di evitare possibili inconsistenze.

Vediamo un esempio pratico:

/ Definiamo una function component
export default function Counter() {

    / Dichiarazione dello stato 'count' inizializzato a 0 (dato numerico)
    const [count, setCount] = useState(0);
    
    / Definiamo una callback function che aggiorna lo stato tramite la funzione setter 'setCount()'
    / Come argomento della funzione setter usiamo una variabile (prevCount) che rappresenta
    / il valore precedente dello stato.
    const increment = () => setCount(prevCount => prevCount + 1);
    
    / Ritorniamo gli elementi JSX
    return (
        <div>
            / Visualizziamo il valore corrente del contatore 
            <p>Wow, you've clicked that button: {count} times</p>

            / Colleghiamo l’event handler 'increment' al click del bottone 
            <button onClick={increment}>Click here!</button>
        </div>
    );
}

Quando il bottone viene premuto, l’event handler `increment()` viene invocato.
All’interno di questa funzione utilizziamo `setCount()` con una **callback function**, poiché:
    !- il nuovo valore di `count` dipende dal valore precedente;
    !- quindi, invece di passare un valore diretto, passiamo una funzione di callback
        !che riceve il valore precedente come argomento.

Esempio:
    setCount(prevCount => prevCount + 1);

Quando React esegue questa funzione, la callback riceve:
    !- il valore precedente di `count` come argomento;
    !- e ritorna il nuovo valore, che in questo caso è `prevCount + 1`.

Nota bene:
    Avremmo potuto scrivere anche:
        setCount(count + 1)
    e il codice funzionerebbe comunque.
    Tuttavia, è **buona prassi** usare la callback function, soprattutto quando il nuovo stato
    dipende dal precedente.
*/


const QuizNavBar = ()=>{
    const [questionIndex, setQuestionIndex] = useState(0);

    // 1. Definire l'event handler goBack(): 
        /* Questo event handler deve permettere di: 
            1. navigare alla domanda precedente del quiz (perché il prossimo valore dello stato dipende dal valore precedente dello stato)
            1.2. Questa funzione deve richiamare il state setter con una callback function:
                1.2.1 Lo state setter callback function ha bisogno di calcolare il prossimo valore di questionIndex usando come argomento prevQuestionIndex
            */
    
    
    const goBack = ()=>setQuestionIndex(prevQuestionIndex => prevQuestionIndex -1)

    // 3. Definire un event handler per passare alla domanda successiva
    const goToNext = ()=>setQuestionIndex(prevQuestionIndex=>prevQuestionIndex+1)
    // determine if on the first question or not 

    // 5. Aggiungere un variabile con valore booleano,
        // quindi utilizza tale valore per attivare e disattivare l'attributo disabilitato del pulsante "Go Back".
    // Siccome gli array di JS sono zero-based indexing possiamo determinare se onFirstQuestion ha un valore true o false 
    // controllando se questionIndex ha attualmente un valore di 0!
    const onFirstQuestion = questionIndex === 0;
    
    const onLastQuestion = questionIndex === questions.length - 1;

    return (
    <nav>
        <span>Question #{questionIndex + 1}</span>
        <div>
        {/* 2. Aggiungere un event listener al bottone con "Go Back" che richiama il nostro nuovo event handler definito */}
        <button onClick={goBack} disabled = {onFirstQuestion} >
            Go Back
        </button>
        {/* 4. Aggiungere il nuovo event handler al bottone "Next Question" */}
        <button onClick={goToNext} disabled={onLastQuestion} >
            Next Question
        </button>
        </div>
    </nav>
    );
}



/* 
=======================
Gli stati degli array
======================

Gli array in JavaScript rappresentano il miglior modello di dati per gestire e 
renderizzare liste in JSX.

Ad esempio: 
---------------------------------------------
import React, { useState } from 'react';

/ Array statico di condimenti disponibili per la pizza
const options = ['Bell Pepper', 'Sausage', 'Pepperoni', 'Pineapple'];

export default function PersonalPizza() {
    const [selected, setSelected] = useState([]);

    const toggleTopping = ({ target }) => {
        const clickedTopping = target.value;
        setSelected(prev => {
            / Controlla se il topping cliccato è già stato selezionato
            if (prev.includes(clickedTopping)) {
                / Rimuove il topping cliccato dallo stato
                return prev.filter(t => t !== clickedTopping);
            } else {
                / Aggiunge il topping cliccato allo stato
                return [clickedTopping, ...prev];
            }
        });
    };

    return (
        <div>
            {options.map(option => (
                <button value={option} onClick={toggleTopping} key={option}>
                    {selected.includes(option) ? 'Remove ' : 'Add '}
                    {option}
                </button>
            ))}
            <p>Order a {selected.join(', ')} pizza</p>
        </div>
    );
}
---------------------------------------------

Nell'esempio sopra stiamo utilizzando due array:

1️⃣ **options** → contiene i nomi di tutti i condimenti disponibili.  
2️⃣ **selected** → rappresenta i condimenti selezionati per la pizza personalizzata.

L’array `options` contiene dati **statici**, cioè che non cambiano.  
È buona pratica definire modelli di dati statici al di fuori della function component, 
poiché non è necessario ricrearli a ogni nuovo rendering del componente.

Nel JSX utilizziamo il metodo `.map()` di JavaScript per renderizzare un pulsante per 
ciascun condimento nell’array `options`.

---

L’array `selected` invece contiene dati **dinamici**, cioè soggetti a cambiamento, 
generalmente in risposta alle azioni dell’utente.

Lo stato `selected` viene inizializzato come un array vuoto.  
Quando l’utente clicca su un pulsante, viene invocato l’event handler `toggleTopping`, 
che utilizza le informazioni provenienti dall’oggetto evento per determinare quale 
condimento è stato selezionato o deselezionato.

---

Quando aggiorniamo un array nello stato, **non modifichiamo direttamente** l’array precedente.  
Invece, React sostituisce l’intero array con un nuovo array.  
Per questo motivo, tutte le informazioni che vogliamo preservare dal precedente stato 
devono essere copiate esplicitamente nel nuovo array.  
Questo è esattamente ciò che fa la **sintassi dello spread operator** (`...prev`).

---

In sintesi, nel codice abbiamo utilizzato alcuni dei principali metodi degli array JavaScript:

- `.includes()` → per verificare se un elemento è già presente  
- `.filter()` → per creare un nuovo array rimuovendo un elemento specifico  
- `.map()` → per generare dinamicamente elementi JSX a partire da una lista di dati
*/


// Dichiaro il componente GroceryCart
const GroceryCart = () => {

    // Dichiaro e inizializzo uno stato per gestire il contenuto del carrello.
    // useState([]) inizializza lo stato come array vuoto.
    // 'cart' rappresenta lo stato corrente,
    // 'setCart' è la funzione che consente di aggiornarlo.
    const [cart, setCart] = useState([]);

    // Funzione che verrà richiamata dal componente figlio (ItemList)
    // per aggiungere un nuovo elemento al carrello.
    // Aggiungo parametro item
    const addItem = (item) => {
        // Devo aggiornare lo stato cart con il setter dello stato
        // tramite callBack function richiamo il setter dello stato: 
            // Aggiorna il valore precedente
            // ritorna un nuovo array con l'item corrente e tramite spread operator espande gli elementi precedentemente già cliccati all'intenro del nuovo array
        setCart((prev)=>{
            return(
            [item, ...prev]
        )
        })
        
    };

    // Funzione che rimuove un elemento dal carrello,
    // richiamata quando si clicca su un <li> già presente.
    // Prende l'indice dell'elemento gia aggiunto al nuovo array
    const removeItem = (targetIndex) => {
        // Richiamo lo state setter
        setCart((prev)=>{
            // Ritorno il nuovo array prev e per eliminare gli elementi <li> gia presenti filtro l'array: 
                // filtro il nuovo array in base ai nomi degli elementi e ai loro indici;
                // le l'indice è diverso dal targetIndex l'elemento viene eliminato 
            return prev.filter((item,index)=>index !==targetIndex)
        })
    };

    return (
        <div>
            <h1>Grocery Cart</h1>

            <ul className="list-group">
                {/* 
                Scorre lo stato 'cart' e, per ogni elemento (item) e relativo indice,
                crea un elemento <li> all’interno della lista non ordinata.
                */}
                {cart.map((item, index) => (
                    /* 
                    Ogni <li> rappresenta un elemento del carrello:
                        - onClick={() => removeItem(index)} : callback che rimuove l’elemento corrispondente all’indice.
                        - key={index} : chiave univoca necessaria a React per tracciare gli elementi della lista
                                        e mantenerla coerente con il Virtual DOM.
                    */
                    <li className="list-group-item" onClick={() => removeItem(index)} key={index}>
                        {/* Mostra il nome dell’elemento */}
                        {item}
                    </li>
                ))}
            </ul>

            <h2>Produce</h2>
            {/* 
            Componente figlio ItemList:
                - items={produce} : passa al figlio l’array 'produce', che contiene gli elementi da visualizzare.
                - onItemClick={addItem} : passa la funzione 'addItem', che il figlio potrà richiamare
                    quando l’utente clicca su un pulsante.
            */}
            <ItemList items={produce} onItemClick={addItem} />

            <h2>Pantry Items</h2>
            {/* 
            Componente figlio ItemList:
                - items={pantryItems} : passa al figlio l’array 'pantryItems'.
                - onItemClick={addItem} : come sopra, richiama 'addItem' al click di un pulsante.
            */}
            <ItemList items={pantryItems} onItemClick={addItem} />
        </div>
    );
};






/* 
========================

Gli oggetti negli stati
=======================
Inoltre possiamo usare gli stati con gli oggetti.
Quando lavoriamo con un set di variabili correlate, è molto utile raggruparle dentro un oggetto.
Ad esempio: 
export default const Login = ()=> {
    const [formState, setFormState] = useState({});
    const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
        ...prev,
        [name]: value
    }));
    };

    return (
    <form>
        <input
        value={formState.firstName}
        onChange={handleChange}
        name="firstName"
        type="text"
        />
        <input
        value={formState.password}
        onChange={handleChange}
        type="password"
        name="password"
        />
    </form>
    );
}

Possiamo notare alcune cose: 
1. Usiamo un state setter callback function per aggiornare uno stato in base al valore corrente.
2. La sintassi dello spread è la stessa per gli oggetti come per gli array: "{ ...oldObject, newKey: newValue }"
3. Riutilizziamo il nostro gestore eventi su più input utilizzando l'attributo name del tag di input per identificare da quale input proviene l'evento di modifica.
Ancora una volta, quando aggiorniamo lo stato con il state setter (in questo caos setFormState()) dentro un componente,
non modifichiamo lo stesso oggetto.
Quando impostiamo il valore successivo di uno stato, dobbiamo copiare i valori dall'oggetto precedente. 
Fortunatamente, la sintassi spread rende questa operazione semplicissima!


Ogni volta che uno dei valori di input viene aggiornato, viene chiamata la funzione handleChange(). 
All'interno di questo gestore di eventi, utilizziamo la destrutturazione degli oggetti per estrarre la proprietà di destinazione dal nostro oggetto evento, 
quindi utilizziamo nuovamente la destrutturazione degli oggetti per estrarre le proprietà nome e valore dall'oggetto di destinazione.

All'interno della nostra funzione di callback del setter di stato, racchiudiamo le parentesi graffe tra parentesi come segue:
setFormState((prev) => ({ ...prev }))
Questo indica a JavaScript che le nostre parentesi graffe si riferiscono a un nuovo oggetto da restituire. 
Utilizziamo ..., lo spread operator, per compilare i campi corrispondenti dal nostro stato precedente. 
Infine, sovrascriviamo la chiave appropriata con il suo valore aggiornato.

Hai notato le parentesi quadre attorno al nome? Questo nome di proprietà calcolato (https://eloquentcode.com/computed-property-names-in-javascript) 
ci consente di utilizzare il valore stringa memorizzato dalla variabile nome come chiave di proprietà.

*/

// Dichiaro componente 
const EditProfile =()=>{
    // Dichiaro e inizializzo lo stato come oggetto vuoto.
    // Lo stato conterrà coppie chiave-valore corrispondenti ai campi del form.
    const [profile, setProfile] = useState({});

    // Dichiaro l’event handler per la gestione dell’input
    // In input, tramite destrutturizzazione, estraggo la proprietà "target" dall’oggetto evento.
    // "target" rappresenta l’elemento HTML che ha generato l’evento (es. <input>).
    const handleChange = ({ target }) => {
    // Estraggo "name" e "value" dall’elemento target.
        // - name: identifica la chiave dell’oggetto da aggiornare nello stato.
        // - value: rappresenta il valore attuale del campo di input.
    
    // const name = target.name;
    
    // const value = target.value;

    // Metodo alternativo: tramite la destrutturizzazione prendo inzializzo 'name' e 'value' che in cui salvo l'object event  
    const {name, value} = target; 

    // Aggiorno lo stato utilizzando le variabili "name" e "value".
        // Senza lo spread operator, ogni aggiornamento sostituirebbe completamente lo stato precedente,
        // causando la perdita dei valori già inseriti in altri campi.
        // Espandendo lo stato precedente (...prevProfile), mantengo tutti i valori già presenti
        // e aggiorno solo la chiave corrispondente all’input modificato.
    setProfile((prevProfile)=>({

        ...prevProfile,
        [name]: value
    }));
    };

    // Event handler che gestisce l’evento di submit al click del bottone
    // Riceve come argomento l’oggetto evento generato dal form.
    const handleSubmit = (event) => {
        // Il metodo preventDefault() impedisce l’esecuzione del comportamento predefinito
        // (in questo caso il ricaricamento della pagina dopo il submit).
    event.preventDefault();
    // Mostra un messaggio di alert con i dati del profilo.
        // JSON.stringify() converte l’oggetto "profile" in una stringa formattata.
        // I parametri aggiuntivi ('', 2) servono per l’indentazione del risultato.
    alert(JSON.stringify(profile, '', 2));
    };

    // Ritorno elementi jsx 
    return (
    // Associo al form l’event listener che richiama la funzione handleSubmit
    <form  className = "form-group" onSubmit={handleSubmit}>
        <input
        className="form-control"
        value={profile.firstName || ''}
        name="firstName"
        type="text"
        placeholder="First Name"
        onChange={handleChange}/>
        <br />
        <input
        className="form-control"
        value={profile.lastName || ''}
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}/>
        <br />
        <input
        className="form-control"
        value={profile.bday || ''}
        type="date"
        name="bday"
        onChange={handleChange}/>
        <br />
        <input
        className="form-control"
        value={profile.password || ''}
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}/>
        <br />
        <button type="submit">Submit</button>
    </form>
    
    );
}




/* 
=================================
Hooks separati per stati separati
=================================
Sebbene ci siano momenti in cui può essere utile  memorizzare dati correlati in una 
collezzione di dati, come un array o un oggetto, può anche essere utile creare diverse
variabili di stato per dati che cambiano separatemente.
La gestione dei dati dinamici è molto più semplice 
quando manteniamo i nostri modelli di dati il più semplici possibile.
Ad esempio: 
    Se abbiamo un singolo oggetto che mantiene uno stato per una materia che si sta studiando a scuola
    esso potrebbe assomigliare a qualcosa di simile: 


/ dichiariamo un componente
const Subject = () => {
    / al suo interno dichiariamo e inizializziamo uno stato con un oggetto 
    const [state, setState] = useState({
        currentGrade: 'B',
        classmates: ['Hasan', 'Sam', 'Emma'],
        classDetails: {topic: 'Math', teacher: 'Ms. Barry', room: 201},
        exams: [{unit: 1, score: 91}, {unit: 2, score: 88}]
    })}

Questo potrebbe funzionare, ma pensiamoci su: 
    quanto può essere un casino copiare tutti questi valori quando abbiamo bisogno di 
    aggiornare qualcosa di questo oggetto dello stato cosi grande? 
Ad esempio: 
    Per aggiornare il voto di un esame, dovremo aver bisogno di un event handler che fa qualcosa di simile: 

    / richiamo la funzione state setter ('setState') è gli passo come argomento il valore precedente
    setState((prev) => ({
    / con la callback function vado a definire la logica per aggiornare lo stato
    / tramite spread operator espando ai valori precedenti della chiave 'exams'
 ...prev,
    
    / dopodichè itero sui valori precedenti relativi alla chiave 'exams' tramite il metodo .map() (questo metodo altro non è che un for in (for exam in exams))
  exams: prev.exams.map((exam) => {
    / check : se il valore della sotto-chiave 'unit' di 'exams' è uguale al nuovo valore aggiornato della chiave 'unit'
    if( exam.unit === updatedExam.unit ){

    / restiuisco i singoli valori di 'exam' espandendoli con lo spread operator
      return { 
        ...exam,

        / e aggiorno il voto di ciascun esame 
        score: updatedExam.score
      };

    / Altrimenti 
    } else {
    / restiuisco solo i singoli valori della chiave 'exams'
      return exam;
    }
  }),
}));


Codice cosi complesso come questo può causare bug.
È preferibile creare più variabili di stato 
in base ai valori che tendono a cambiare insieme.


Quindi possiamo riscrivere l'esempio precedente come segue: 
function Subject() {
    const [currentGrade, setGrade] = useState('B');
    const [classmates, setClassmates] = useState(['Hasan', 'Sam', 'Emma']);
    const [classDetails, setClassDetails] = useState({topic: 'Math', teacher: 'Ms. Barry', room: 201});
    const [exams, setExams] = useState([{unit: 1, score: 91}, {unit: 2, score: 88}]);
}
Maneggiare dati in modo dinamico con variabili di stato separate a numerosi vantaggi: 
1. rende il codice più leggibile 
2. più facile da scrivere
3. facilita il testing e il debbuging 
4. maggiore riusibilità del codice tra i diversi componenti 

Spesso, ci troviamo a raggruppare e organizzare i dati in raccolte da trasferire tra i componenti, 
quindi a separare tali dati all'interno dei componenti in cui le diverse parti dei dati cambiano separatamente.

La cosa fantistica a proposito di lavorare con gli Hooks è che abbiamo la libertà di 
organizzare in nostri dati in maniera tale che abbiano senso per noi 


*/



const Musical = ()=>{
    
    const [state, setState] = useState({
    title: "Best Musical Ever",
    actors: ["George Wilson", "Tim Hughes", "Larry Clements"],
    locations: {
        Chicago: {
        dates: ["1/1", "2/2"], 
        address: "chicago theater"}, 
        SanFrancisco: {
        dates: ["5/2"], 
        address: "sf theater"
        }
    }
  })
}


const MusicalRefactored = () =>{
    const [title, setTitle] = useState ("Best Musical Ever")
    const [actors, setActors] = useState(["George Wilson", "Tim Hughes", "Larry Clements"])
    const [locations, setLocations] = useState({
        Chicago: {
            dates: ["1/1", "2/2"], 
            address: "chicago theater"
        }, 
        SanFrancisco: {
            dates: ["5/2"], 
            address: "sf theater"
        }
    })
}




/* 
=======

Review
======
Ora possiamo creare componenti funzionali con stato utilizzando il React Hook useState!

Rivediamo ciò che abbiamo imparato e messo in pratica in questa lezione:

    - Con React, alimentiamo modelli di dati statici e dinamici a JSX per rendere una vista sullo schermo.
    - Gli hook sono funzioni che conferiscono alle componenti funzionali capacità simili a quelle delle classi, come lo stato.

    - Sono utilizzati per "agganciarsi" allo stato interno della componente per gestire i dati dinamici nelle componenti funzionali.
    - Utilizziamo lo State Hook utilizzando il codice riportato di seguito. 
    - Il currentState fa riferimento al valore corrente dello stato e l'initialState inizializza il valore dello stato per il primo rendering della componente.

    const [currentState, stateSetter] = useState( initialState );


    - Lo state setter può essere chiamato in un event handler 

    - Possiamo definire un semplice event handler inline nel nostro JSX,
        e un event handler complesso al di fuori del nostro JSX.
    
    - Possiamo usare uno state setter callback function quando il nostro prossimo valore 
        dipende dal nostro valore precedente 

    - Usiamo array e oggetti per organizzare e maneggiare dati correlati che tendono a cambiare insieme.

    - Usiamo la sinstassi dello spread sulle collezzioni di dati dinamice per copiare lo stato precedente nel prossimo stato: 
    setArrayState((prev) => [ ...prev ]) 
    e: 
    setObjectState((prev) => ({ ...prev })).

    - È buona pratica avere molteplici e semplici stati invece di averne un unico oggetto di stato complesso.

*/

const AppFunction= ()=>{
    
}


export {PhoneNumber, QuizNavBar, GroceryCart, EditProfile}