import React from 'react'

const CardUtente = ({nome, email, imgUrl}) => {
    return (
    <div>
        <h2>
            {nome}
        </h2>
        <p>{email}</p>
        <img src={imgUrl} alt="Avatar Utente" />
    </div>
    )
}

export default CardUtente