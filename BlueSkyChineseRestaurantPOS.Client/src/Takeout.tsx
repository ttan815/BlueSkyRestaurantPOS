import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
function Takeout() {
    const location = useLocation()
    const navigate = useNavigate()
    const phoneNumber = location.state?.phoneNumber;
    if (!phoneNumber) {
        return (
            <>
                <h1>No phone number provided</h1>
                <button onClick={()=>navigate("/") }>Back to Main Menu</button>
            </>
        )
    }
    return (
        <>

            if(!phoneNumber
            <form>
            </form>
        </>
    )
}

export default Takeout