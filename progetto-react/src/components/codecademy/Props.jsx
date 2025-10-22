import React from 'react';
import Button, { Button2 }  from './Button';

/* 

====================================
COSA SONO LE PROPS
====================================

Ogni componente ha le props:
- La prop di un componente è un oggetto 
?- Mantiene l'informazione che riguarda quel componente
Es: 
<button type="submit" value="Submit"> Submit </button> 
In questo esempio abbiamo passato 2 pezzi di informazione al tag button:
    - type
    - value

In base a cosa passiamo all'attributo type dell' elemento 'button', 
esso tratterà la form in modo diverso.
Allo stesso modo, possiamo trasmettere informazioni ai nostri componenti per specificare come si comportano.

!Le props servono per lo stesso scopo per i componenti come gli arogmenti servono per le funzioni

Per accedere a un oggetto props del componente: 
    Ci si riferisce all'oggetto props usando le sue proprietà atteaverso la dot notation
    Es: props.name
        In questo modo si recupera la proprietà nome dall'oggetto props

*/



/* 
======================================
PASSARE LE PROPS A UN COMPONENTE
=====================================


Per avere i vantaggi delle props dobbiamo passare l'informazione al componente di React.
Prima abbiamo renderizzato l'oggetto props vuota salvata in stringProps perché:
    - non abbiamo passato nessuna props al componente PropsDisplayer

Per Passare le props a un componente basta dargli un attributo, es:
<Greeting name="Jamel" />

Per fare un altro esempio: 
    Abbiamo un componente 'SloganDisplay' e vogliamo passargli il messaggio "We're great!". 
    Per fare ciò: 
    <SloganDisplay message="We're great!" />

    Quindi come possiamo notare, per passare un informazione a un componente:
        - abbiamo bisogno di un nome per l'informazione che gli si vuole passare
        
        ?(!!!N.B.: Nell'esempio sopra viene usato il nome 'message'; si possono usare i nomi che si preferiscono!!!)

Se gli si volesse passare un informazione che non è una semplice stringa ma, ad esempio, 
un intger/float/array/object, ecc. questa va wrappata nelle parentesi graffe: 
<Greeting myInfo={["Astronaut", "Narek", "43"]} />
Oppure per rimanere inerenti all''esercizio, andiamo a vedere come passare le props
nel componente su App.jsx:
<PropsDisplayer 
    name = 'hello' 
    int = {54} 
    float = {3.14} 
    array ={["hi", 54, 3.14,false]} 
    object = {{"name": "marco", "age": 27}} 
/>

?(N.B. SOLO LE STRINGHE posso non wrapparle nelle parentesi graffe)
*/




// Dichiaro una fuction component e gli passo come parametro una props
// come anticipato prima: 
    /* props è il singolo argomento che contiene tutte le proprietà (proprietà/attributi) 
    passate al componente quando viene usato (es. <PropsDisplayer name="Marco" />). */
function PropsDisplayer(props) {
    // Converto l'oggetto props in una stringa JSON e la salvo nella variabile stringProps
    // Lo scopo è rendere l'oggetto leggibile come testo in modo da poterlo visualizzare nell'interfaccia
    /* 
    ?Nota importante:

    !JSON.stringify rimuove funzioni e valori undefined; 
        se props contiene riferimenti circolari lancerà un errore.

    !Per un output più leggibile si può usare JSON.stringify(props, null, 2) 
    e avvolgerlo in un <pre> per conservare l'indentazione.
    */
    const stringProps = JSON.stringify(props);
    // Restituisco JSX: 
        // cioè la struttura HTML/React che verrà renderizzata (quello che vede l'utente)
    return (
        // Questi outer tag servono per: 
            // 1. Raggruppare gli elementi figli e fornire un nodo DOM di riferimento
            
        <div>
            <h1>CHECK OUT MY PROPS OBJECT</h1>

            {/* Qui viene inserita la stringa generata da JSON.stringify(props) all'interno dell'elemento <h2>.
            Le parentesi graffe in JSX indicano che la variabile stringProps
            deve essere valutata come espressione JS. 
            */}
            <h2>{stringProps}</h2>
        </div>
    );
}

export default PropsDisplayer;


/* 
==========================================
Renderizzare le props di un componente
=========================================
!Le props, quindi, permettono di costumizzare il componente passandogli informazione.
Difatti poc'anzi abbiamo imparato come passare informazione all'oggetto props del componente.
Solitamente si vuole utilizzare un componente per visualizzare l'informazione che gli si passa.

Per essere sicuri che un function component usi l'oggetto props, basta definire
la tua function component con una props passata come parametro.
Es: 
function Button(props) {
    return <button>{props.displayText}</button>;
}

In questo esempio: 
    - 'props' è accettata come un parametro e si accede ai valori dell'oggetto con
        la dot notation(object.propertyName)

In alternativa, props è un oggetto e si può usare la sintassi della  destrutturizazione in questo modo:
function Button({displayText}) {
    return <button>{displayText}</button>;
}
*/


// Definisco una function component che prende una props come parametro in input
function Product(props) {

    // E ritorna i primi tre tag di intestazione (al momento!)
    return (
        <div>
            {/* Siccome nel file App.jsx ho già definito valori passati come attributi del componente
            Per accedere al valore dell'attributo 'name' passo la prop come argomento del tag h1
            E accedo al suo valore tramite dot notations.
            */}
            <h1>{props.name}</h1>

            {/* Stessa cosa faccio per il tag h2: 
                - inietto il valore dell'attributo price, definito in App.jsx da props*/}
            <h2>{props.price}</h2>

            {/* Stessa cosa per l'ultimo header: 
                - Inietto il valore dell'attributo rating da props*/}
            <h3>{props.rating}</h3>
        </div>       
    );
}


// Anziche usare l'export default uso il  name export poiché.
//  possono coesistere due componenti nello stesso file ma...
// Non possono esserci due export di defualt.
// Di conseguenza su App.jsx importero Product wrappato tra le parentesi graffe



/*
======================================================
Passare le props da un component a un altro componente
======================================================
Quindi abbiamo imparato tramite la prima function component come passare le props a un componente.
Poi grazie alla seconda function component come accedere e visualizzare le props passate.
Tuttavia l'uso più comune delle props è di:
    !- passare l'informazione da un componente a un altro componente.

Le props in React viaggiano in una sola direzione (one-way):
    !Dall'alto verso il basso; dal padre al figlio.

Per fare un esempio: 
function App() {
    return <Product name="Apple Watch" price = {399} rating = "4.5/5.0" />;
}
In questo esempio 'App' è il padre e 'Product' è il figlio.
'App' passa le tre props a 'Product'('name', 'price' e 'rating').
Queste tre props possono essere lette nel componente figlio. 

?Le props passete ai figli sono immutabili:
    !- cioè non possono essere cambiate.
Se un componente vuole dei nuovi valori per le sue props, si deve fare affidamento 
sul componente padre per passarne dei nuovi valori.

*/

/* 1 step:
    Dobbiamo passare le prop da App alla function Player
    Assicuriamoci che player possa accettare le props cmabiando la definizione 
    Della funzione in modo che includa props nel parametro. 
2 step: 
    Visualizziamo il nome della canzone nel tag h1 iniettando il valore songName
    dalla props
    


3 step: 
    Passo il valore della props artist nel tag h2 

4 step: 
    Esporto Player usando l'export name e importo il componente in App.jsx

    */

function Player(props){
    return(
        <>
            <h1>{props.songName}</h1>
            <h2>{props.Artist}</h2>
        </>
    )
}





/* 
==============================================
Renderizzare UI differenti basati sulle props
==============================================

Si possono fare molte cose con le props, ad esempio fare statements condizionali:
function LoginMsg(props) {
  if (props.password === 'a-tough-password') {
    return <h2>Sign In Successful.</h2>
  } else {
    return <h2>Sign In Failed..</h2>
  }
}

In questo esempio la prop viene passata per prendere una decisione piuttosto
che renderizzare il valore sullo schermo.
In sostanza se il valore di 'password' ricevuto è uguale a 'a-tough-password', 
il messaggio risultante in <h2></h2> sarà differente.
La password passata come arogmento non è visualizzata in entrmabi i casi!
La prop viene usata per decidere cosa deve essere visualizzato.
?N.B.: Questa tecninca è molto comune.
*/
function Greeting(props){
    // Da notare come props.signedIn non si trova dentro il return ma come condizione in un blocco if-else
    // Al di fuori del return statement.
    /* Ciò significa che Greeting non verrà fara mai visualizzare il valore della proprietà signedIn,
    ma la userà per decidere quale messaggio far visualizzare.
    Difatti in App.jsx oltre a dargli un attirbuto nome gli è stato anche dato al componente padre un attributo signedIn = False, 
    quindi sul browser verrà visualizzato il primo messaggio.
    Se cambiassimo il valore della prop signedIn = true vedremo visualizzato il secondo messaggio del blocco else */
if (props.signedIn ===false){
        return <h1>Please Login.</h1>
    }else{
        return(
            <>
                <h1>Welcome back, {props.name}!</h1>
                <article>
                    React: una serie di sfortunate disabilità
                </article>
            </>
        )
    }
}




/* 
============================================================
Mettere un Event Handler in una function Component
============================================================
!Inoltre si può, e torna spesso utile farlo, passare una funzione come props.
È una pratica MOLTO comune passare un funzione event Handler come props.
Ora vedremo come passare una funzione Event Handler come props e come definirla nel componente prima del return statement



*/
// Definisco una function component

function Talker(){
    // Definisco una funzione Event Handler
    function talk() {
        // Inzializzo variabile vuota in cui salvero tutte le stringhe
        let speech = '';
        // Itero sui valori di i finche rimane minore di 10000 e aggiorno i a ogni iterazione
        for (let i = 0; i<10000;i++){
            // Aggiorno la variabile speech con la stringa 'blah'
            speech +='blah';
        }
        // Aggiungo un alert che mostra i valori di speech
        alert(speech)}
    // Restituisco un bottone e come props gli passo la funzione talk()
    return <Button talk = {talk}/>
}

/* 
Se andiamo sul file Button.jsx notiamo che un compomente Button che ritorna un elemento <button>. 
Se lo user clicca su questo elemento, gli vogliamo passare la funzione talk() cosi essa viene richiamata.
Ciò significa che abbiamo bisongo di attacere talk() all'elemento button come event handler. 
Come lo facciamo questo? 
Allo stesso modo in cui abbiamo attacato un qualsiasi event handler a un elemento JSX: 
dandogli a quel elemento JSX un speciale attributo.
Il nome dell'attributo dovrà essere un event namme come onClick o onHover.
Il valore dell'attributo dovrà essere, invece, l'event handler che si vuole attaccare


=========================================
handleEvent, onEvent, and props.Event
=========================================

Quando si passa un event handler come props, ci sono due nomi che bisogna scegliere.
Entrambe le scelte dei nomi devono essere posti nel componente padre, che come abbiamo gia visto è:
    !- il componente che definisce l'event handler e lo passa come parametro
        (v. function talker)

!Il primo nome che si deve scegliere è il nome dell'event handler stesso,
guardiamo alla riga del return statement della function component Talker: 

return <Button talk={talk} />;

Abbiamo il nostro event handler passato come parametro e abbiamo scelto come nome talk.
Il secondo nome che abbiamo scelto è è il nome della prop che usiamo per per passare l'event handler.

Da notare come questo sia la stessa cosa per scegliere i nomi degli attributi:
Infatti si possono scelgiere qualsiasi tipi di nome per le props e per gli event handler.
Tuttavia, c'è una convenzione di nominazione che viene comunemente usata.
Per fare un esempio: 
    Immaginiamo di voler gestire un bottone che se viene cliccato dall'utente appare un messagio di alert.
    Quindi si vuole intercettare un evento in base al click del mouse da parte dell'utente, allora per convenzione 
    l'event handler verrà nominato handleClick.
    Allo stesso modo se si volesse intercettare un evento in base allo scorrimento del cursore del muose (hover event),
    allora per convenzione si nomina l'event handler 'handleHover'. 
    Es: 
        'function myClass() {
            function handleHover() {
                alert('I am an event handler.');
                alert('I will be called in response to "hover" events.');
        }'
    }'

Questo per quanto riguarda la naming convetion delle funzioni handler (handle+Evento)
Mentre per i nomi delle prop che riguardano gli event handler:
    !- il nome della prop in JSX deve essere on+Evento . 
    - Per capire meglio: 
        !- se stiamo intercettando un evento "click", allora il nome della prop sarà onClick
        !- allo stesso modo se stiamo intercettando un evento "hover" allora il nome della prop sarà onHover
    
Es: 
function myClass(){
    function handleHover() {
        alert('I am an event handler.');
        alert('I will listen for a "hover" event.');
    }
    return <Child onHover={handleHover} />;
}

*/


// Definisco una function component 
function Speecher(){
    // Definisco una funzione handler chiamata handleClick
    function handleClick() {
        // Inzializzo variabile vuota in cui salvero tutte le stringhe
        let talk = '';
        // Itero sui valori di i finche rimane minore di 10000 e aggiorno i a ogni iterazione
        for (let i = 0; i<10000;i++){
            // Aggiorno la variabile speech con la stringa 'blah'
            talk +='blah';
        }
        // Aggiungo un alert event che mostra i valori di talk
        alert(talk)}
    // ritorno un nuovo componente Button a cui aggiungo una prop onClick e come valore passo la funzione handler 
    // Riprendeno la spiegazione fatta su Button.jsx sul componente Button2
    // ?Qui l'attirbuto onClick dato a Button2 non crea un event listener,
    //! È SOLO UN NOME DI UN ATTRIBUTO
    // Questo perché Button2 non è un elemento JSX simil HTML, ma è un istanza di un componente.
    // Quindi i nomo come onClick creano event listeners se vengono usati su elementi JSX simil HTML.
    // Altrimenti sono solo dei nomi di props 
    return <Button2 onClick = {handleClick}  />
}




/* 
===================
Props figlie
===================
!Ogni props del componente ha una proprietà chiamata figlie (children).
Le props.children ritornano tutto ciò che sta in mezzo a i tag di apetura e chiusura di un componente.
Fino a qui tutti i componenti che abbiamo visto sono self-closing tags (es:<MyComponent />),
In realtà è possibile ache utilizzare i due tags di apertura/chiusura del componente 
e la applicazione React funzionerebbe lo stesso (es: <MyComponent></MyComponent>).
Quindi le props figlie vanno messe in mezzo a questi due tags dei componenti.
Quindi per usare le props figlie, dobbiamo separare l'outer component dal contenuto 
rendendo così il componente flessibile e riutilizzabile.
In questo modo è possibile anche innestare i componenti tra loro oltre che le props.


Per capire meglio guardiamo questo codice: 

import React from 'react';
import LilButton  from './LilButton';


1. Il componente BigButton
    Spiegazione passo passo:

    BigButton è un function component che riceve un argomento props.

    Come tutti i componenti React, props è un oggetto che contiene:

        le proprietà passate come attributi (es. color, size, ecc.);
        un campo speciale chiamato children, 
        che contiene tutto ciò che viene scritto tra i tag di apertura e chiusura del componente.


function BigButton(props) {
    Questa riga serve per :
        !serve per mostrare in console cosa React ha passato come contenuto figlio.
  console.log(props.children);
  return <button>I am a Big Button.</button>;
}

export default BigButton;

Infine, il componente restituisce un semplice <button>, 
ma in questa versione non visualizza ancora i figli all’interno del bottone 
(cosa che faremo dopo per capire meglio il flusso).



Example 1: 
        Qui usi il componente con tag di apertura e chiusura.

    Il testo "I am a child of BigButton." è il figlio del componente.

    Quando React esegue BigButton, l’oggetto props sarà:
    {
        children: "I am a child of BigButton."
    }

Quindi nel log a riga 431 vedremo: 
I am a child of BigButton.
Nel render attuale non viene ancora mostrato a schermo, 
perché non stiamio inserendo {props.children} nel JSX del bottone.

<BigButton>
  I am a child of BigButton.
</BigButton>


Example 2:
    Qui il figlio non è del testo, ma un altro componente React, LilButton.

    React passa l’intero elemento React <LilButton /> dentro props.children.

    Nel console.log(props.children) vedrai un oggetto simile a:
        {
            $$typeof: Symbol(react.element),
            type: LilButton,
            props: {},
            ...
        }

    Questo rappresenta l’elemento React figlio.

    !React tratta qualsiasi contenuto tra i tag( testo, elementi JSX o più componenti) come children.

<BigButton>
  <LilButton />
</BigButton>


Example 3:
    In questo caso non c’è nessun figlio.

    React creerà comunque props, ma:
    props.children === undefined
    Quindi nel console.log apparirà undefined
<BigButton />
*/

// Siccome nel browser vedo solo le props passate come attirbuti dei tag List in App.jsx
// Ma non visualizzo le props figlie messe tra i tag li: 
    // Nel return di questo componente devo inserire le props children tra gli elementi ul
function List(props) {
    let titleText = `Favorite ${props.type}`;
    if (props.children instanceof Array) {
    titleText += 's';
    }
    return (
    <div>
        <h1>{titleText}</h1>
        {/* Cosi facendo adesso vedo visualizzato le props figlie, ovvero gli elementi li,
        nel tag List, con i relativi valori*/}
        <ul>{props.children}</ul>
    </div>
    );
}


/* 
==================================
Dare valori di default alle props
==================================

Diamo un occhiata al componente Button3 qui sotto: 
    Da notare come a linea 528 button si aspetta di ricevere la prop chiamata text.
    In questo modo il testo ricevuto sarà visualizzato dentro l'elemento <button>.
    Se ciò non accade il componente Button sarà visualizzato come un bottone in bianco. 
    Va da se che è preferibile che Button faccia visualizzare un messaggio di defualt.
    Per assegnare valori di default alle props ci sono 3 modi: 
        ?1. Il primo metodo è aggiungere un `defaultProps`:
            !proprietà statica del componente
            
            function Button3(props) {
            return (
            <button>{props.text}</button>
            );
        }

            Button3.defaultProps = {text: 'This is default text',};
        ?2. Definire un valore di default direttamente in una definizione di una funzione
            
            function Button3({text = 'This is default text'}) {
            return <button>{text}</button>
        }

        ?3. Settare un valore di default nel corpo della funzione:
            function Button3(props) {
            const {text = 'This is default text'} = props
            return <h1>{text}</h1>

        }
        In questo caso se il componente <Button3 /> non viene passato da nessun testo, di defualt verrà visualizzato “This is default text”
        In caso contrario passera il testo messo come attributo




*/


// Passo un valore di default alla props del componente usando il metodo 2

function Button3({text = 'Default Text of Big Button'}) {
    
    return (
    <button>{text}</button>
    );
}










export {Product, Player, Greeting,Talker, Speecher, List,Button3,};
