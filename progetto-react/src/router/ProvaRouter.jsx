import React, { useState } from 'react'
import Home from './Home'
import About from './About'
import Profile from './Profile'
import {BrowserRouter,Routes, Route, Link, useRoutes} from 'react-router-dom'
import ErrorPage from './ErrorPage'
import SingleProfile from './SingleProfile'
import MyProfile from './MyProfile'
import { routes } from './routes'
const AppRoutes =()=>{
    const elements = useRoutes(routes);
    return elements;

}
const ProvaRouter = () => {
    const [link,setLink] = useState("Home")
    const handleRender = ()=>{
        if (link ==="Home"){
            return <Home></Home>
        }
        if (link ==="About"){
            return <About />
        }
        if (link ==="Profile"){
            return <Profile />
        }
    };

    return (
    <div className='container-md'>
        <h2>React Route FullStack</h2>
        <BrowserRouter>
            <nav className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/profiles">Profiles</Link>
            </nav>
            <hr></hr>
            <AppRoutes></AppRoutes>
            {/* <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route> */}
                {/* Usiamo rotte annidate quando abbiamo necessita che il padre sia sempre presente.
                In questo caso nella pagine viene renderizzato il Profile e se nell'url inserisco una stringa verra rederizzato MyProfile 
                o se metto un numero verra renderizzato sotto a Profile SingleProfile
                */}
                {/* <Route path="/profiles" element={<Profile></Profile>}>
                    <Route path="/profiles/:id" element={<SingleProfile></SingleProfile>}></Route>
                    <Route path="/profiles/me" element={<MyProfile></MyProfile>}></Route>
                </Route>
                
                <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes> */}
        </BrowserRouter>
        
        {/* <nav className = 'navbar'>
            <button className="btn btn-link nav-link" onClick={()=>setLink("Home")}>
                Home 
            </button>
            
            <button className="btn btn-link nav-link" onClick={()=>setLink("About")}>
                About 
            </button>
            <button className="btn btn-link nav-link" onClick={()=>setLink("Profile")}>
                Profile 
            </button>
        </nav>
        <div>
        {handleRender()}
        </div> */}
    </div>
    )
}

export default ProvaRouter