import React, { useEffect, useState} from 'react';

// Importo l'array di oggetti 
import ArraySkills from './ArraySkills';

// Definisco un componente 
const SkillSelector = () => {
    // Stato che tiene traccia della skill selezionata; inizialmente non c'è nessuna skill selezionata
    const [selectedSkill, setSelectedSkill] = useState([])

    // Stato che tiene traccia di quante skill sono state selezionate; inzialmente ci sono zero skill selezionate
    const [count, setCount] = useState(0)

    // variabile in cui lo state setter per aggiornare lo stato 
    // prendo il valore precedente del counter e lo sommo di una unita; in questo modo ogni volta che una checkbox viene cliccata il valore del counter prende il suo valore precedente e lo aggiorna con il valore corrente
    const increment = ()=>setCount(prevCount=>prevCount+1)

    

    

    // Definisco una funzione che prende in input la proprietà 'target' dell'evento (in questo caso l'elemento input):
    /* Questa funzione controlla la validita della checkbox cliccata dall'utente:
        Se l'utente clicca la checkbox React in automatico passa il valore dell'id dell'array degli oggetti come evento*/
    function handleSelected({target}){


        // Dichiaro una variabile locale e gli salvo il valore dell'id della proprietà target che ha scatenato l'evento (l'elemento input)
        // Recupero l'id della checkbox cliccata anzichè il suo valore; in seguito uso questo id per aggiornare lo stato
        const selected = target.id

        // Se la checkbox è selezionata, aggiungo l’id al nuovo array
        // Se è deselezionata, lo rimuovo
        /* Modo alternativo: 
            Qui React passa automaticamente a prev; cioè il valore corrente dello stato.
            Usando una callback functioninvece di passare direttamente un valore, garantisci che React usi sempre lo stato più aggiornato 
            (anche se ci sono più click in rapida successione).*/
        setSelectedSkill(prev =>
            /* L'operatore ternario: 
                target.checked → restituisce true se la checkbox è spuntata o false se è deselezionata*/
            target.checked
                // Caso 1: crea un nuovo array che copia le skill già selezionate (prev)
                // E aggiunge in coda quella appena cliccata (selected)
                ? [...prev, selected]
                // Caso 2: crea un nuvo array rimuovendo l'id deselezionato
                : prev.filter(skillId => skillId !== selected))
                // In questo modo selectedSkill rappresenta sempre tutte le checkbox attualmente selezionate.

    }

    // Controllo il limite massimo: dopo la quinta checkbox spuntata appare un messaggio di alert 
    useEffect (()=>{
        if (selectedSkill.length >5){
            alert("Attenzione! Puoi selezionare solo 5 skills alla volta")
        }
    }, [selectedSkill])


    // Questo hook serve per aggiornare il contatore ogni volta che cambia selectedSkill
    useEffect(()=>{
        setCount(selectedSkill.length)
    },[selectedSkill])


    // Ritorno elementi JSX 
    return (
    <div style={{textAlign: "left"}}>
        {/* tramite il metodo .map() itero sugli elementi dell'array 
        e genero dinamicamente elementi JSX a partire dall' array importato*/}
        {ArraySkills.map((skill)=>(
            // Indicizzo ogni elemento secondo contenuto in questo div tramite il valore della chiave 'id' di ogni oggetto nell'array di oggetti
            
            <div key={skill.id}>
                <form action="">
                <input 
                    type="checkbox" 
                    // Ogni elemento input ha un id univoco con il seguente valore:
                    id={`skill-${skill.id}`} 

                    /* Questo attributo serve a sincronizzare il DOM con lo stato React.
                    ?Il metodo .includes() controlla se un detemrinato valore è presente nell'array selectedSkill.
                    Di base questo attributo determina: se la checkbox risulta selezionata o no nel rendering.
                        - Se l'id corrente (skill-${skill.id}) è contenuto in selectedSkill, 
                            la checkbox risulta spuntata,
                        - In caso contrario la checkbox sarà deselezionata*/
                    checked = {selectedSkill.includes(`skill-${skill.id}`)}


                    // Ogni elemento input ha un attributo value con il seguente valore:
                        // il valore corrente dello stato
                    value={selectedSkill}

                    /* 
                    Fonti : https://www.geeksforgeeks.org/reactjs/what-is-onchangecapture-event-in-reactjs/, 
                        https://react.dev/reference/react-dom/components/input
                    Con questo event listeners React: 
                        Intercetta l'evento durante la fase di cattura;
                            L'evento viene intercettato prima di raggiungere in nodo target
                        Questo event listeners serve in casi particolari: 
                            generalmente quando si vuole eseguire qualcosa prima che l'evento venga elaborato dal normale onChange*/
                    onChangeCapture={increment}
                    /* In questo caso mi è utile perché: 
                        onChangeCapture: intercetta l'evento nella fase di cattura, prima che raggiunga l'handleSelected.
                            Quindi mi permette di aggiornare il counter prima che lo stato della checkbox venga elaborato*/
                    
                    // Assegno l'event handler "handleSelected" all'elemento input tramite event listener onChange
                    // Di base quando l'utente clicca sulla checkbox questa attiva l'evento onChange che richiama l'event handler "handleSelected"
                    onChange={handleSelected}

                    
                    />

                
                {/* Ogni elemento label prende un attributo htmlFor 
                il cui valore è associato con il valore dell'attributo id nell'elemento input
                (questo attributo in React sostituisce, sintaticamente parlando, l'attributo for del HTML).
                Dopodiché ogni elemento label restituirà il valore della chiave 'name' dell'array di oggetti*/}
                <label htmlFor={`skill-${skill.id}`}> {skill.name} </label>


                </form>

            </div>
        ))}
        <br />
        <p >Numero di skill selezionate: {count}/10</p>
        {/* Creo un bottone per resettare tutte le skill selezionate.
        tramite event listeners, uso i due setter state per cambiare gli stati del counter e dell'array selectedSkill:
            - setSelectedSkill([]): quando il bottone viene premuto elimina in automatico tutte le skills selezionate
            - setCount(0): quando il bottone viene premuto setta il counter a zero*/}
        <button type='button' className='btn btn-danger' onClick={()=>{
            setSelectedSkill([]);
            setCount(0)
            }}>Reset</button>
        {/* Ritorno una lista numerata delle skill spuntate */}
        <h4>Riepilogo Skill Selezionate</h4>
        {/* Operatore ternario:
        se la lista di selectedSkill è vuota...*/}
        {selectedSkill.length === 0?(
            // Caso 1: Se l’array selectedSkill è vuoto; mostro il messaggio “Nessuna skill selezionata”.
            <p>Nessuna Skill selezionata</p>):(
                // Caso 2: mano a mano che le skill vengo selezionate itero sull'array selectedSkill
                // prendo il valore dell'id della checkbox selezionata 
                <ol>
                    {selectedSkill.map(id=>{
                        // Controllo che la skill sia prensente nell'array originale e il suo id deve essere uguale al valore dell'attributo id dell'elemento input
                        const skill = ArraySkills.find(skill => `skill-${skill.id}`=== id)
                        // Ritorno gli items della lista ordinata indicizzati per il valore dell'id delle skills selezionata,
                        // E restituisco il nome delle skill selezionata 
                        return <li key={id}>{skill.name}</li>
                    })}
                </ol>
            )}
    </div>
    )
}

export default SkillSelector