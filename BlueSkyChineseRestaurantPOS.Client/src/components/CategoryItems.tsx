import "../App.css"
import { useState } from 'react'
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
    chineseItemName: string,
    price: number,
    orderedAmount: number,
    menuItemCustomizations: itemCustomizationConstruct[]
    toGo: boolean
}
interface foodItemInfo {
    category: string,
    chineseItemName: string,
    id: number,
    itemName: string,
    price: number
}
interface CategoryItemProp {
    orderedItems: foodItemConstruct[]
    setOrderedItems: React.Dispatch<React.SetStateAction<foodItemConstruct[]>>
    arrayOfFood: foodItemInfo[]
    addFoodToOrder: (name: string, price: number) =>void
}

function CategoryItem({ orderedItems, setOrderedItems, arrayOfFood, addFoodToOrder }: CategoryItemProp) {
    return <>
        <div>
            {arrayOfFood.map((item) =>
                <div>
                    <button key={item.id} onClick={() => addFoodToOrder(item.itemName, item.price)}>{item.itemName}</button>
                </div>
            )}
        </div>
    </>
}

export default CategoryItem;