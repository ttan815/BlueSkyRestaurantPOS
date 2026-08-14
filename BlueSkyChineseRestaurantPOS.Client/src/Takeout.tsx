import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
function Takeout() {
    const location = useLocation()
    const navigate = useNavigate()
    const [itemCount, setItemCount] = useState(1)
    const [discountPercent, setDiscountPercent] = useState(0)
    const [discountConstant, setDiscountConstant] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(.0875)
    const [total, setTotal] = useState(0)
    const [orderedItems, setOrderedItems] = useState([[]])
    const [itemCustomization, setItemCustomization] = useState([])
    const phoneNumber = location.state?.phoneNumber;
    function addFoodToOrder(foodName: string, foodPrice: number) {
        const foodItem = {
            itemName: foodName,
            chineseItemname: "?",
            price: foodPrice,
            orderedAmount: itemCount,
            menuItemCustomization: itemCustomization

        }
    }
    const order = {
        orderTime: new Date().toISOString(),
        orderList: orderedItems,
        discountPercent: discountPercent,
        discountConstant: discountConstant,
        subtotal: 0,
        tax: tax,
        total: total
    }
    if (!phoneNumber) {
        return (
            <>
                <h1>No phone number provided</h1>
                <button onClick={() => navigate("/")}>Back to Main Menu</button>
            </>
        )
    }
    return (
        <>
            <div className="item-list-div">
                {orderedItems.map(item =>
                    <div>{item}</div>
                )}
            </div>
            <div>
                <button onClick={()=>addFoodToOrder("Orange Chicken", 15)} >Orange Chicken</button>
            </div>
            <h1>{phoneNumber}</h1>
        </>
    )
}

export default Takeout