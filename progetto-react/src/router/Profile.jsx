import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Profile = () => {
    return (
        <>
        <div>Pagina Profiles</div>
        <hr></hr>
        <nav className='navbar'>
            <Link to = "me">My Profile</Link>
            <Link to = "2">Single Profile con id 2</Link>
        </nav>
        {/* è il componente generico che riceve i dati dalle rote annidate */}
        <div><Outlet></Outlet></div>
        </>
    )
}

export default Profile