import React, { createContext, useState, useEffect } from "react";
import API_URL from "./API.jsx";
import { useNavigate } from "react-router-dom";

const SalesContext = createContext()

export default SalesContext

export const SalesProvider = ({children}) => {

    let navigate = useNavigate()
    let [listSales, setListSales] = useState([])
    let [salesToday, setSalesToday] = useState(null)
    let [salesMonth, setSalesMonth] = useState(null)
    let [salesYear, setSalesYear] = useState(null)

    async function createSales(user, business, productname, productprice, productquantity, productcategory, productSellingPrice, total){
        let address = user.addr
        let response = await fetch(`${API_URL}/sales/create_sales/`, {
           method: "POST",
           headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"address":address, "business_name":business, "product_sold":productname, "product_category":productcategory, "price_of_product":productprice, "price_sold_at":productSellingPrice, "quantity_sold":productquantity, "total":total})
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

    async function updateSales(user, business, productname, productprice, productquantity, productcategory, productSellingPrice, total, pk){
        let address = user.addr
        let response = await fetch( `${API_URL}/sales/update_sales/${pk}`, {
           method: "PUT",
           headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"address":address, "business_name":business, "product_sold":productname, "product_category":productcategory, "price_of_product":productprice, "price_sold_at":productSellingPrice, "quantity_sold":productquantity, "total":total})
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


    async function retrieveListSales(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/sales/retrieve_sales/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.sales)
                setListSales(data?.sales)
            }
        }
        else{
            console.log("error")
        }
    }


    async function retrieveTodaySales(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/sales/retrieve_today_sales/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.today)
                setSalesToday(data?.today)
            }
        }
        else{
            console.log("error")
        }
    }

    async function retrieveMonthSales(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/sales/retrieve_month_sales/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.month)
                setSalesMonth(data?.month)
            }
        }
        else{
            console.log("error")
        }
    }

    async function retrieveYearSales(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/sales/retrieve_year_sales/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.year)
                setSalesYear(data?.year)
            }
        }
        else{
            console.log("error")
        }
    }


    async function deleteSales(pk){
        let response = await fetch( `${API_URL}/sales/delete_sales/${pk}`, {
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
        createSales : createSales,
        retrieveListSales : retrieveListSales,
        listSales : listSales,
        updateSales : updateSales,
        deleteSales : deleteSales,
        retrieveTodaySales : retrieveTodaySales,
        retrieveYearSales : retrieveYearSales,
        retrieveMonthSales : retrieveMonthSales,
        salesToday : salesToday,
        salesMonth : salesMonth,
        salesYear : salesYear
    }

    return(
        <SalesContext.Provider value={contextData}>
            {children}
        </SalesContext.Provider>
    )
}