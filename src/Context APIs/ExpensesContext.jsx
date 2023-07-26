import React, { createContext, useState, useEffect } from "react";
import API_URL from "./API.jsx";
import { useNavigate } from "react-router-dom";

const ExpenseContext = createContext()

export default ExpenseContext

export const ExpenseProvider = ({children}) => {

    let navigate = useNavigate()
    let [listExpenses, setListExpenses] = useState([])
    let [expenseToday, setExpenseToday] = useState(null)
    let [expenseMonth, setExpenseMonth] = useState(null)
    let [expenseYear, setExpenseYear] = useState(null)


    async function createExpenses(user, business, Expenses, Amount, Description){
        let address = user.addr
        let response = await fetch(`${API_URL}/expenses/create_expense/`, {
           method: "POST",
           headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"address":address, "business_name":business, "expense":Expenses, "amount":Amount, "description":Description})
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

    async function updateExpenses(user, business, Expenses, Amount, Description, pk){
        let address = user.addr
        let response = await fetch( `${API_URL}/expenses/update_expense/${pk}`, {
           method: "PUT",
           headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"address":address, "business_name":business, "expense":Expenses, "amount":Amount, "description":Description})
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


    async function retrieveListExpenses(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/expenses/retrieve_expense/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.expense)
                setListExpenses(data?.expense)
            }
        }
        else{
            console.log("error")
        }
    }


    async function retrieveTodayExpenses(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/expenses/retrieve_today_expenses/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.today)
                setExpenseToday(data?.today)
            }
        }
        else{
            console.log("error")
        }
    }

    async function retrieveMonthExpenses(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/expenses/retrieve_month_expenses/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.month)
                setExpenseMonth(data?.month)
            }
        }
        else{
            console.log("error")
        }
    }

    async function retrieveYearExpenses(user){
        let address = user.addr
        let response = await fetch( `${API_URL}/expenses/retrieve_year_expenses/${address}`, {
            method: "GET",
           headers: {
            'Content-Type': 'application/json'
        },
        })
        if (response.ok){
            let data = await response.json()
            if (response.status == 200){
                console.log(data.year)
                setExpenseYear(data?.year)
            }
        }
        else{
            console.log("error")
        }
    }


    async function deleteExpenses(pk){
        let response = await fetch( `${API_URL}/expenses/delete_expense/${pk}`, {
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
        createExpenses : createExpenses,
        retrieveListExpenses : retrieveListExpenses,
        listExpenses : listExpenses,
        updateExpenses : updateExpenses,
        deleteExpenses : deleteExpenses,
        retrieveTodayExpenses : retrieveTodayExpenses,
        expenseToday : expenseToday,
        retrieveMonthExpenses : retrieveMonthExpenses,
        expenseMonth : expenseMonth,
        retrieveYearExpenses : retrieveYearExpenses,
        expenseYear : expenseYear
    }

    return(
        <ExpenseContext.Provider value={contextData}>
            {children}
        </ExpenseContext.Provider>
    )
}