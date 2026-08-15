import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
function Takeout() {
    const location = useLocation()
    const navigate = useNavigate()
    const [itemCount, setItemCount] = useState(1)
    const [itemID, setItemID] = useState(0) // Temporary until IDs appear from DB
    const [discountPercent, setDiscountPercent] = useState(0)
    const [discountConstant, setDiscountConstant] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(.0875)
    const [total, setTotal] = useState(0)
    interface itemCustomizationConstruct {
        modification: string,
        modificationName: string,
        modificationChineseName: string,
        priceChange: number,
        description: string
    }
    interface foodItemConstruct {
        id: number
        itemName: string,
        chineseItemname: string,
        price: number,
        orderedAmount: number,
        menuItemCustomization: itemCustomizationConstruct[]
    }

    const [orderedItems, setOrderedItems] = useState<foodItemConstruct[]>([]);
    const [itemCustomization, setItemCustomization] = useState([])
    const phoneNumber = location.state?.phoneNumber;
    const [selectedItemID, setSelectedItemID] = useState(-999);
    function addFoodToOrder(foodName: string, foodPrice: number) {
        var newID = itemID + 1;
        setItemID(newID);
        const foodItem = {
            id: itemID,
            itemName: foodName,
            chineseItemname: "?",
            price: foodPrice,
            orderedAmount: itemCount,
            menuItemCustomization: itemCustomization

        }
        setOrderedItems([...orderedItems, foodItem]);
        newID = itemID + 1;
        setItemID(newID);
    }
    function setSelectedItem(id: number) {
        setSelectedItemID(id);
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
            <div className="order-options">
                <button>
                    Modify
                </button>
                <button>
                    To Go
                </button>
                <button>
                    Split
                </button>
                <button>
                    Print
                </button>
                <button>
                    Payment
                </button>
            </div>
            <div className="item-list-div">
                {orderedItems.map(item =>
                    <div>
                        {selectedItemID === item.id ? 
                        
                            <button onClick={() => setSelectedItem(item.id)} className="selected-food-item-button">
                                <div key={item.id} >{item.itemName}</div>
                            </button>
                            :
                            <button key={item.id} onClick={() => setSelectedItem(item.id)} className="default-food-item-button">
                                <div>{item.itemName}</div>
                            </button>
                        }
                        {
                            item.menuItemCustomization.map(customization =>
                                <div>
                                    <button>
                                        <p>{customization.modification}</p>
                                        <p>{customization.modificationName}</p>
                                        <p>{customization.modificationChineseName}</p>
                                        <p>{customization.priceChange}</p>
                                        <p>{customization.description}</p>
                                    </button>
                                </div>)

                        }
                </div>
                )}
            </div>
            <div>
                <button key={918273} onClick={()=>addFoodToOrder("Orange Chicken", 15)} >Orange Chicken</button>
            </div>
            <h1>{phoneNumber}</h1>
        </>
    )
}

export default Takeout