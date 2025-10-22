import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <h2>Errore 404 - Pagina non trovata</h2>
            <div><button className='btn btn-success' onClick={()=>navigate("/")}>Torna alla Home</button></div>
            <p><button className='btn btn-primary' onClick={()=>navigate(-1)}>Torna alla pagina precedente</button></p>
        </>
    )
}

export default ErrorPage