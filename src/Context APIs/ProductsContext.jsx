import React, { createContext, useState, useEffect } from "react";
import API_URL from "./API.jsx";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext()

export default ProductContext

export const ProductProvider = ({children}) => {

    let navigate = useNavigate()
    let [listProducts, setListProducts] = useState([])
    const [totalProduct, setTotalProducts] = useState(0)

    async function createProduct(user, business, productname, productprice, productquantity, productcategory){
        let address = user.addr
        let response = await fetch( `${API_URL}/products/create_product/`, {
           method: "POST",
           headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"address":address, "business_name":business, "category":productcategory, "product_name":productname, "price":productprice, "quantity":productquantity})
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


    async function updateProduct(user, business, productname, productprice, productquantity, productcategory, pk){
        let address = user.addr
        let response = await fetch( `${API_URL}/products/update_product/${pk}`, {
           method: "PUT",
           headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"address":address, "business_name":business, "category":productcategory, "product_name":productname, "price":productprice, "quantity":productquantity})
        })
        if (response.ok){
            if (response.status == 200){
                console.log(response)
            }
        }
        else{
            console.log("error")
        }
    }


    async function retrieveListProduct(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/products/retrieve_list_product/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                setListProducts(data.products)
            }
        }
        else{
            console.log("error")
        }
    }

    async function retrieveTotalProduct(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/products/total_product/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                setTotalProducts(data.total)
            }
        }
        else{
            console.log("error")
        }
    }

    async function deleteProduct(pk){
        let response = await fetch( `${API_URL}/products/delete_product/${pk}`, {
            method: "DELETE",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log("success")
            }
        }
        else{
            console.log("error")
        }
    }
    
    let contextData = {
        createProduct : createProduct,
        retrieveListProduct : retrieveListProduct,
        listProducts : listProducts,
        updateProduct : updateProduct,
        deleteProduct : deleteProduct,
        totalProduct : totalProduct,
        retrieveTotalProduct : retrieveTotalProduct
    }

    return(
        <ProductContext.Provider value={contextData}>
            {children}
        </ProductContext.Provider>
    )
}