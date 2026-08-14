import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"

function MainMenu() {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate()
    function CheckIfPhoneNumber() {
        if (phoneNumber.length <= 0) {
            return
        }
        else {
            NavigateToTakeOut();
        }

    }
    function NavigateToTakeOut() {
        navigate("/Takeout", {
            state: { phoneNumber }
        });
    }
    return (
        <>
            <h1>Blue Sky Chinese Restaurant POS</h1>
            <button onClick={() => setIsVisible(!isVisible)} >Takeout</button>
            {isVisible ?
                <>
                    <div className="main-menu-phone-number-div">
                            <div> 
                            <input type="text" onChange={(e)=> setPhoneNumber(e.target.value) } placeholder="Phone Number"></input>
                            <button onClick={CheckIfPhoneNumber}>Submit</button>
                            <button onClick={() => setIsVisible(!isVisible)} >X</button>
                            </div>
                            {/* Basically, you want to put the phone number, then use the useLocation from React in order to send it to takeout, which can use it to generate the UI. */}
                    </div>
                </> : <></>}
            <button>Dine In</button>
        </>
    )
}

export default MainMenu
