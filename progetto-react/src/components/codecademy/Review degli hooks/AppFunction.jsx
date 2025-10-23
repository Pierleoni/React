import React, { useState } from 'react'
import NewTask from './NewTask'
import TaskList from './TaskList'

// ===============================
// COMPONENTE PRINCIPALE: AppFunction
// ===============================
const AppFunction = () => {
    // Stato per la singola task in fase di inserimento
    const [newTask, setNewTask] = useState({});

    // ===============================
    // Gestore dell'evento onChange
    // ===============================
    // Viene richiamato ogni volta che un campo di input subisce una modifica.
    // Tramite destrutturazione estraiamo la proprietà 'target' dall'oggetto evento.
    const handleChange = ({ target }) => {
        // Dal target estraiamo 'name' e 'value', 
        // che rappresentano rispettivamente il nome e il valore del campo input modificato.
        const { name, value } = target;

        // Aggiorniamo lo stato della singola task:
        // - Manteniamo i valori precedenti tramite lo spread operator
        // - Aggiorniamo l'id con un valore univoco (timestamp corrente)
        // - Aggiorniamo la proprietà corrispondente al campo modificato
        setNewTask((prev) => ({
            ...prev,
            id: Date.now(),
            [name]: value
        }));
    };

    // ===============================
    // Stato per l'elenco di tutte le task
    // ===============================
    const [allTasks, setAllTasks] = useState([]);

    // ===============================
    // Gestore dell'evento onSubmit
    // ===============================
    // Viene eseguito al click del bottone di invio del form.
    const handleSubmit = (event) => {
        // Evita il comportamento predefinito del form (ricaricamento della pagina)
        event.preventDefault();

        // Se il campo "title" è vuoto o non definito, interrompe l'esecuzione della funzione
        if (!newTask.title) return;

        // Aggiunge la nuova task all'elenco delle task:
        // - Espande le task precedenti
        // - Inserisce la nuova in testa all’array (ordine inverso per vedere la più recente in cima)
        setAllTasks((prev) => [newTask, ...prev]);

        // Reimposta l'oggetto newTask per svuotare il form
        setNewTask({});
    };

    // ===============================
    // Gestore per la rimozione delle task
    // ===============================
    // Riceve in input l'id della task da eliminare
    const handleDelete = (taskIdRemove) => {
        // Aggiorna lo stato filtrando le task:
        // Mantiene solo quelle il cui id è diverso da quello passato come argomento
        setAllTasks((prev) =>
            prev.filter((task) => task.id !== taskIdRemove)
        );
    };

    // ===============================
    // RENDER DEL COMPONENTE
    // ===============================
    return (
        <main>
            <h1>Tasks</h1>

            {/* Componente per la creazione di una nuova task */}
            <NewTask
                // Prop che collega lo stato corrente della nuova task
                newTask={newTask}
                // Prop che passa la funzione di gestione input
                onHandleChange={handleChange}
                // Prop che passa la funzione di gestione submit
                onHandleSubmit={handleSubmit}
            />

            {/* Componente che mostra l’elenco di tutte le task */}
            <TaskList 
                // Prop che contiene l'elenco delle task correnti
                allTasks={allTasks}

                // Prop che passa la funzione di eliminazione di una task
                onHandleDelete={handleDelete}
            />
        </main>
    );
}

export default AppFunction