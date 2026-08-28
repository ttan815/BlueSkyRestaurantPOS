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
    const [taxAmount, setTaxAmount] = useState(0)
    const [total, setTotal] = useState(0)
    interface itemCustomizationConstruct {
        id: number,
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
        toGo: boolean
    }

    const [orderedItems, setOrderedItems] = useState<foodItemConstruct[]>([]);
    const [itemCustomization, setItemCustomization] = useState<itemCustomizationConstruct[]>([])
    const phoneNumber = location.state?.phoneNumber;

    const [selectedItemID, setSelectedItemID] = useState(-999);

    const [modifyItemScreenStatus, setModifyItemScreenStatus] = useState(false);

    useEffect(() => {
        var newTotal = 0
        for (const obj of orderedItems) {
            newTotal += obj.price
        }
        setSubtotal(newTotal)
        var totalWithTax = newTotal + (newTotal * tax)
        setTaxAmount((newTotal * tax))
        setTotal(totalWithTax)
    }, [orderedItems])
    // Modification Menu Variables
    const [isUsingPrefix, setIsUsingPrefix] = useState(false)
    const [activeModifierPrefix, setActiveModifierPrefix] = useState("")
    const [modificationID, setModificationID] = useState(0)
    // const [activeModifierOption, setActiveModiferOption] = useState("")
    function manipulatePrefixModifier(prefix: string = "") {
        if (prefix == "") {
            return;
        }
        if (prefix == activeModifierPrefix) {
            setActiveModifierPrefix("");
        }
        else {
            setActiveModifierPrefix(prefix);
        }
    }

    // Going to have this fix, since person should be able to click on multiple modifiers, this only allows one so far.
    // Have a list of all the modifications, manipulate modifer, will check that list, adding and removing from it when necessary.
    function manipulateModifier(modificationOption: string = "") {

        // interface itemCustomizationConstruct {
        //     id: number,
        //     modification: string,
        //     modificationName: string,
        //     modificationChineseName: string,
        //     priceChange: number,
        //     description: string
        // }
        const modifierObj = itemCustomization.find(
            item => item.modificationName === modificationOption
        );

        if (modifierObj) {
            setItemCustomization(
                itemCustomization.filter(
                    item => item.id !== modifierObj.id
                )
            );
            return
        }
        if (modificationOption != "" && activeModifierPrefix != "") {
            var idForObj = modificationID;
            setModificationID((idForObj + 1))
            const itemCustomizationObject :itemCustomizationConstruct = {
                id: idForObj,
                modification: activeModifierPrefix,
                modificationName: modificationOption,
                modificationChineseName: "?",
                priceChange: 0.00,
                description: ""
            }
            setItemCustomization(([...itemCustomization, itemCustomizationObject]))
            setActiveModifierPrefix("")
            return

        }
        if (modificationOption != "") {
            var idForObj = modificationID;
            setModificationID((idForObj + 1))
            const itemCustomizationObject: itemCustomizationConstruct = {
                id: idForObj,
                modification: "",
                modificationName: modificationOption,
                modificationChineseName: "?",
                priceChange: 0.00,
                description: ""
            }
            setItemCustomization(([...itemCustomization, itemCustomizationObject]))
            setActiveModifierPrefix("")
            return

        }
        if (modificationOption == "") {
            return;
        }
    }
    function confirmModification() {
        const foodItemObj = orderedItems.find(item => item.id === selectedItemID)
        if (!foodItemObj) {
            setSelectedItemID(-999)
            return
        }
        const newOrderedItems = orderedItems.map(item => {
            if (item.id === selectedItemID) {
                return {
                    ...item,
                    menuItemCustomization: [
                        ...itemCustomization
                    ]
                };
            }
            return item
        })
        setOrderedItems(newOrderedItems)
        setModifyItemScreenStatus(false)
        setItemCustomization([])
        setSelectedItem(-999)
    }
    function addFoodToOrder(foodName: string, foodPrice: number) {
        var newID = itemID + 1;
        setItemID(newID);
        const foodItem = {
            id: itemID,
            itemName: foodName,
            chineseItemname: "?",
            price: foodPrice,
            orderedAmount: itemCount,
            menuItemCustomization: itemCustomization,
            toGo: false
        }
        setOrderedItems([...orderedItems, foodItem]);
        newID = itemID + 1;
        setItemID(newID);
    }
    function setSelectedItem(id: number) {
        if (id == -999) {
            setSelectedItemID(-999)
        }
        if (selectedItemID != -999 && id == selectedItemID && modifyItemScreenStatus == false) {
            setSelectedItemID(-999)
            return
        }
        if (selectedItemID != -999 && id != selectedItemID && modifyItemScreenStatus){
            return
        }
        setSelectedItemID(id);
    }

    function modifySelectedItem() {
        const selectedItem = orderedItems.find(item => item.id === selectedItemID)
        if (selectedItem === null) {
            console.log("Error: selected item to modify does not exist.");
            return;
        }
        if (selectedItem) {
            setModifyItemScreenStatus(true)
            setItemCustomization(selectedItem.menuItemCustomization)
        }
    }
    const order = {
        orderTime: new Date().toISOString(),
        orderList: orderedItems,
        discountPercent: discountPercent,
        discountConstant: discountConstant,
        subtotal: subtotal,
        tax: tax,
        total: total
    }

    async function printOrder() {
        const response = await fetch("https://localhost:7126/api/order", {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json' }
        })
        const message = await response.text();

        console.log(message);
    }
    async function getMenu() {
        const response = await fetch("https://localhost:7126/api/menu", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const message = await response.text()
        console.log(message)
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
                <button onClick={() => modifySelectedItem()} >
                    Modify
                </button>
                <button>
                    To Go
                </button>
                <button onClick={getMenu} >
                    Split
                </button>
                <button onClick={printOrder} >
                    Print
                </button>
                <button>
                    Payment
                </button>
            </div>
            <div className={"main-layout"} >
                <div className="item-list-div left-container">
                    {orderedItems.map(item =>
                        <div key={item.id} >
                            {selectedItemID === item.id ?

                                <button onClick={() => setSelectedItem(item.id)} className="selected-food-item-button">
                                    <div key={item.id} >{item.itemName}</div>
                                </button>
                                :
                                <button onClick={() => setSelectedItem(item.id)} className="default-food-item-button">
                                    <div>{item.itemName}</div>
                                </button>
                            }
                            {
                                item.menuItemCustomization.map(customization =>
                                    <div key={customization.id}>
                                        <button >
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
                    <div>
                        Discount {discountConstant ? discountConstant : discountPercent}
                        Subtotal {subtotal}
                        Tax: {tax}
                        Total {total}
                    </div>
                </div>
                {modifyItemScreenStatus ?
                    <div className={"right-container"} >
                        <div>
                            <h1>Modifications</h1>
                        </div>
                        <div className="modifier-list">
                            {itemCustomization.map(modificationAddition =>
                                <div key={modificationAddition.id } >
                                    {modificationAddition.modification + " " + modificationAddition.modificationName}
                                    {/* {modificationAddition.priceChange} */}
                                </div>)}
                        </div>
                        <div>
                            <button>X</button>
                        </div>
                        <div>
                            <div>
                                {itemCustomization.some(item => item.modificationName === "Spicy")
                                    ? <button className="selected-food-item-button" onClick={() => manipulateModifier("Spicy")}>Spicy</button>
                                    : <button onClick={() => manipulateModifier("Spicy")}>Spicy</button>
                                }

                                {itemCustomization.some(item => item.modificationName === "Salt")
                                    ? <button className="selected-food-item-button" onClick={() => manipulateModifier("Salt")}>Salt</button>
                                    : <button onClick={() => manipulateModifier("Salt")}>Salt</button>
                                }

                                {itemCustomization.some(item => item.modificationName === "Fried")
                                    ? <button className="selected-food-item-button" onClick={() => manipulateModifier("Fried")}>Fried</button>
                                    : <button onClick={() => manipulateModifier("Fried")}>Fried</button>
                                }
                            </div>
                        </div>
                        <div>
                            {activeModifierPrefix === "Add"
                                ? <button className="selected-food-item-button" onClick={() => manipulatePrefixModifier("Add")}>Add</button>
                                : <button onClick={() => manipulatePrefixModifier("Add")}>Add</button>
                            }

                            {activeModifierPrefix === "No"
                                ? <button className="selected-food-item-button" onClick={() => manipulatePrefixModifier("No")}>No</button>
                                : <button onClick={() => manipulatePrefixModifier("No")}>No</button>
                            }

                            {activeModifierPrefix === "ONLY"
                                ? <button className="selected-food-item-button" onClick={() => manipulatePrefixModifier("ONLY")}>ONLY</button>
                                : <button onClick={() => manipulatePrefixModifier("ONLY")}>ONLY</button>
                            }
                        </div>
                        <div>
                            <button onClick={confirmModification}>Confirm</button>
                        </div>
                    </div> :

                    <div className={"right-container"} >
                        <button key={918273} onClick={() => addFoodToOrder("Orange Chicken", 15)} >Orange Chicken</button>
                    </div>
                }
            </div>
            <h1>{phoneNumber}</h1>
        </>
    )
}

export default Takeout