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
    chineseItemname: string,
    price: number,
    orderedAmount: number,
    menuItemCustomization: itemCustomizationConstruct[]
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
}
function CategoryItem({ orderedItems, setOrderedItems, arrayOfFood }: CategoryItemProp) {
    return <>
        <div>
            {arrayOfFood.map((item) =>
                <div>
                    {item.itemName}
                </div>
            )}
        </div>
    </>
}

export default CategoryItem;