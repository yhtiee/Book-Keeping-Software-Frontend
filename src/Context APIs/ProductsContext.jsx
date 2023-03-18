import React, { createContext, useState, useEffect } from "react";
import API_URL from "./API.jsx";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext()

export default ProductContext

export const ProductProvider = ({children}) => {



    let createProduct = () => {
        
    }
    
    return(
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}