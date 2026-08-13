import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MainMenu from "./MainMenu"
import Takeout from "./Takeout"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Routes>
              <Route path="/" element={<MainMenu />} ></Route>
              <Route path="/takeout" element={<Takeout />} ></Route>
          </Routes>
    </>
  )
}

export default App
