import React from 'react'

// Definsico il componente 
// Prende in input le props: 
    // - allTask : lo stato corrente delle task aggiunte nel padre (array) 
    // - onHandleDelete : la prop definita nel padre che invoca l'event handler per rimuovere le task in base al loro id

const TaskList = ({allTasks, onHandleDelete}) => {
    // Ritorno una lista non ordinata di elementi
    return (
    
    <ul className='list-group list-group-flush'>
        {/* Itero sull'array prendo ogni elemento per il titolo, la descrizione e il suo id */}
        {allTasks.map(({title, description, id})=>(
            // Per ogni elemento ritorno un <li> con l'attributo key = {id}: 
                // ogni elemento <li> sarà indicizzato in base all'id degli elementi contenuti nell'array 'allTasks' 
            <li  className='list-group-item'  key={id}>
                <div>
                    {/* Renderizzo il nome della task */}
                    <h2>{title}</h2>
                    {/* l'event listener tramite callback function richiama la prop 'onHandleDelete' 
                    (che a sua volta nel padre invoca la funzione per eliminare le task), e gli passa come arogmento l'id dell'elemento */}
                    <button className='btn btn-secondary ' onClick={()=>onHandleDelete(id)}>X</button>
                </div>
                {/* Operatore ternario: 
                    Controlla che description sia valorizzato: 
                    Caso 1: 
                    Se non è valorizzato torna null
                    
                    Caso 2 : 
                    Se è valorizzato torna un elemento <p> e renderizza la descrizione della task */}
                {description ? null : (<p>{description}</p>)}
            </li>
        ))}
    </ul>

  )
}

export default TaskList