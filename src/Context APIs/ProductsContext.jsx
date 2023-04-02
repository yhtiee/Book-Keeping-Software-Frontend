import React, { createContext, useState, useEffect } from "react";
import API_URL from "./API.jsx";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext()

export default ProductContext

export const ProductProvider = ({children}) => {

    let navigate = useNavigate()
    let [listProducts, setListProducts] = useState([])

    async function createProduct(business, productname, productprice, productquantity, productcategory){
        let token = JSON.parse(localStorage.getItem("authTokens"))
        let access = token.access
        let response = await fetch( `${API_URL}/products/create_product/`, {
           method: "POST",
           headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"business_name":business, "category":productcategory, "product_name":productname, "price":productprice, "quantity":productquantity})
        })
        if (response.ok){
            if (response.status == 200){
                console.log(response)
                navigate("/products")
            }
        }
        else{
            console.log("error")
        }
    }

    
    async function retrieveListProduct(){
        let token = JSON.parse(localStorage.getItem("authTokens"))
        let access = token.access
        let response = await fetch( `${API_URL}/products/retrieve_product/`, {
            method: "GET",
           headers: {
            'Authorization': `Bearer ${access}`,
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                // console.log(data.products)
                setListProducts(data.products)
                navigate("/products")
            }
        }
        else{
            console.log("error")
        }
    }
    
    let contextData = {
        createProduct : createProduct,
        retrieveListProduct : retrieveListProduct,
        listProducts : listProducts
    }

    return(
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}