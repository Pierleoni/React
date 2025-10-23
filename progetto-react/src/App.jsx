// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import Saluto from './components/Esercizi Agosto/Saluto.jsx'

import CardUtente from './components/Esercizi Agosto/CardUtente.jsx'


// Importo l'array 'arrayPiatti' 
// import { arrayPiatti } from './piatti.jsx'
// Importo il componente MenuRistorante

// import ToDoApp from './to-doList/ToDoApp.jsx'
import Contact from './components/codecademy/AuthorizationForm.jsx'

import PropsDisplayer, {Product, Player, Greeting, Talker, Speecher, List, Button3} from './components/codecademy/Props.jsx';
import GroceryStore from './components/codecademy/Progetto GroceryStore (Review per le props)/GroceryStore.jsx';
import ProvaRouter from './router/ProvaRouter.jsx';

import ReviewProps, { DefineEvent, DefaultProps} from './components/codecademy/ReviewProps.jsx';
import ColorPicker, {EditProfile, GroceryCart, PhoneNumber, QuizNavBar} from './components/codecademy/spiegazioneHooks/Hook/useState.jsx';
import Checkbox from './components/Marco_Pierleoni_CheckBoxMultiple/Checkbox.jsx';
import ToggleText from './components/Marco_PierleoniEsercizi_UseState/ToggleText.jsx';
import MenuRistorante from './components/Esercizi Agosto/MenuRistorante.jsx';
import Termostato from './components/Esercizi Agosto/Termostato.jsx';
import CampoRicerca from './components/Esercizi Agosto/CampoRicerca.jsx';
import MessaggioSegreto from './components/Esercizi Agosto/MessaggioSegreto.jsx';
import AppFunction from './components/codecademy/Review degli hooks/AppFunction.jsx'
import { Count, Counter, Timer } from './components/codecademy/spiegazioneHooks/Hook/useEffect.jsx'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Saluto />
        
        {/* <ToDoApp></ToDoApp> */}
        <CardUtente  nome = "Marco" email = "mpierStoCazzo98@gmail.com" imgUrl = "https://placehold.co/"/>
        <MenuRistorante />
        <Termostato />
        <CampoRicerca />
        <MessaggioSegreto />
        <Contact />
        <PropsDisplayer name = 'hello' int = {54} float = {3.14} array ={["hi", 54, 3.14,false]} object = {{"name": "marco", "age": 27}} />

        {/* Renderizzo il componente Product in JSX,
        E gli passo delle informazioni(props) come attributi del componente
        */}
        <Product name="Apple MacAir" price = {100000} rating = "Na Monnezza" />
        <Player songName = "The number of the beast" Artist = "Iron Maiden"/>
        <Greeting  name ="Mario" signedIn = {true}/>
        <Talker />
        <br />
        <br />
        <Speecher />
        {/* Componente list (padre) */}
        <List type='Living Musician'>
          <li>Sachiko M</li> {/*elemento figlio */}
          <li>Harvey Sid Fisher</li> {/*elemento figlio */}
        </List>
        {/* Da notare come i valori passati alle props type benchè siano singolari
        se  le props figlie (in questo caso gli elementi li) sono più di uno React 
        aggiorna automaticamente il valore della props type come plurale (aggiunge la s finale) */}
        <List type='Living Cat Musician'>
          {/* Facciamo la stessa cosa per la seconda istanza di List */}

          <li>Nora the Piano Cat</li> {/*elemento figlio */}
          <li>Bobo the Cat</li> {/*elemento figlio*/}
        </List>
        <br />
        <br />

        {/* Ora al componente padre assegno l'attributo text con un qualsiasi valore  */}
        {/* Difatti ora il valore dell'attributo overrida il valore passato per default alla props figlia del componente */}
        <Button3 text="BOOOOOOTTTONNEEEE"></Button3>
        <br />
        <GroceryStore />
        <ProvaRouter />
        {/* 1. Passare una prop come attributo dell'stanza del componente */}
        <ReviewProps 
          propName = "Esercizo 1: Passare una prop data come attributo dell'istanza del componente"
          passed = {false}
        />
        
        <DefineEvent />
        <DefaultProps />
        <ColorPicker />
        <br />
        <PhoneNumber />
        <br />
        <QuizNavBar />
        <br />
        <Checkbox />
        <ToggleText />
        <GroceryCart />
        <br />
        <EditProfile />
        <AppFunction />

        <Counter />
        <br />
        <Count />

        <Timer />
      </div>
      
    </>
  )
}

export default App
