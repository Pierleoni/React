import React from 'react'
import ArrayPiatti from './Piatti'

const MenuRistorante = () => {
  return (
    <div>
        <h1>Menu Ristorante</h1>
        <ul>

        {ArrayPiatti.map((piatto)=>(
            <li key={piatto.id}>{piatto.nome} {piatto.prezzo} €</li>
        ))}
        </ul>
    </div>
  )
}

export default MenuRistorante