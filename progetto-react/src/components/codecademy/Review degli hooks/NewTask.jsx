import React from 'react'

// ===============================
// COMPONENTE FIGLIO: NewTask
// ===============================
// Riceve tramite props:
// - newTask: lo stato corrente della nuova task (oggetto)
// - onHandleChange: funzione che gestisce i cambiamenti nei campi di input
// - onHandleSubmit: funzione che gestisce l’invio del form
const NewTask = ({ newTask, onHandleChange, onHandleSubmit }) => {
  return (
    <div>
    {/* 
        Il tag <form> racchiude i campi di input per creare una nuova task.
        L'event listener 'onSubmit' richiama la funzione passata tramite la prop 'onHandleSubmit',
        che a sua volta invoca l'handler 'handleSubmit' definito nel componente padre.
        In questo modo il componente figlio non gestisce direttamente la logica del submit,
        ma delega la gestione al padre.
    */}
        <form   onSubmit={onHandleSubmit}>
        <input 
          // Nome del campo di input (usato come chiave nello stato)
            name="title"
            
          // Testo mostrato quando il campo è vuoto
            placeholder="New Task"

          // Valore controllato: se 'newTask.title' è undefined, mostra una stringa vuota
          value={newTask.title || ""}

            // Gestione evento onChange:
            // richiama la prop 'onHandleChange', che a sua volta invoca 'handleChange' nel componente padre
            onChange={onHandleChange}
        />

        {/* 
          Rendering condizionale:
          - Se 'newTask.title' è falsy (vuoto o non definito), non mostra nulla (null)
          - Altrimenti, visualizza un <textarea> e un <button>
        */}
        {!newTask.title ? null : (
          <>
            <textarea 
                name="description" 
                placeholder="Details..."
            
            // Valore controllato del campo descrizione
            // Questo attributo specifica il valore iniziale dell'elemento
            
                value={newTask.description || ""}

            // Anche questo campo è controllato tramite l'handler passato come prop
                onChange={onHandleChange}
            />

            {/* 
              Bottone di invio del form.
              L’attributo type="submit" indica che, al clic, 
              verrà attivato l’evento 'onSubmit' del form.
            */}
            <button type="submit">Add Task</button>
          </>
        )}
      </form>
    </div>
  )
}

export default NewTask
