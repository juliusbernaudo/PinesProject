/*
    General render function for the items 
*/

import React from "react";
import RenderItemCard from "./RenderItemCard";

function ItemRenderer({ items }) {
    
    return (
        <>
            <div className="BoxFlex">
                {/* This will loop through the array of Items and 
                map each individual item to the variable item
                then then the RenderItemCard will render it */}
                {items.map((item) => {
                return (
                    <RenderItemCard item={item} />
                );
                })}
            </div>
        </>
    );
}

export default ItemRenderer;
