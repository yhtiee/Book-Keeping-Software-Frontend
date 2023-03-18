import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import API_URL from "./API.jsx";


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [authToken, setAuthToken] = useState(() => localStorage.getItem("authTokens")? JSON.parse(localStorage.getItem("authTokens")): null)
    let [user, setUser] = useState(() => localStorage.getItem("authTokens")? jwt_decode(localStorage.getItem("authTokens")): null)
    let [business, setBusiness] = useState(() => localStorage.getItem("businessName")? localStorage.getItem("businessName"): null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let navigate = useNavigate()
    let [userRegister , setRegisterUser] = useState(null)
    let [businessList, setBusinessList] = useState([])


    async function signUpUser(Password, Email, Username){
        console.log("form submitted")
        let response = await fetch (`${API_URL}auth/signup/`, {  
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username":Username, "password":Password, "email":Email})
        })
        if (response.ok){
            if (response.status === 201){
                navigate("/signin")
                console.log(response)
                setRegisterUser(Username)                
            }
        }
        else{
            console.log("error")
        }  
    }

    async function businessDetails(user, Business_name, selectedType){
        console.log("form submitted")
        let token = JSON.parse(localStorage.getItem("authTokens"))
        let access = token.access
        console.log(token)
        let response = await fetch (`${API_URL}business/create_business/`, {  
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"business_name":Business_name, "business_type":selectedType, "username":user})
        })
        if (response.ok){
            if (response.status === 200){
                navigate("/")
                console.log("success")
                console.log(response)
                setBusiness(localStorage.setItem("businessName", JSON.stringify(Business_name)))
            }
        }
        else{
            console.log("error")
        }  
    }

    async function retrievebusiness(){
        console.log("form submitted")
        let token = JSON.parse(localStorage.getItem("authTokens"))
        let access = token.access
        console.log(authToken)
        let response = await fetch (`${API_URL}business/retrieve_list_business/`, {  
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({"username":user})
        })
        if (response.ok){
            if (response.status === 200){
                let data = await response.json()
                console.log("success")
                console.log(response)
                console.log(data)
                setBusinessList(localStorage.setItem("business_list", JSON.stringify(data.businesses)))
            }
        }
        else{
            console.log("error")
        }  
    }


    async function loginUser(Password, Username, Business){
        let response = await fetch (`${API_URL}auth/token/`, {  
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"username":Username, "password":Password})
        
        })
        if (response.ok){
            let data = await response.json()
            if(response.status === 200){
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
                navigate("/select_business")
            }
        }
        else{
            console.log("error")
            setError("Invalid Username or Password")

        }
    }


    let logoutUser = () => {
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        localStorage.removeItem("businessName")
        navigate("/signin")
    }


    // uPdate the token every 5mins sending the refresh token to the backend
    let updateToken = async () =>{
        console.log("update called")
        let response = await fetch ("http://127.0.0.1:8000/auth/token/refresh/", {  
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"refresh":authToken.refresh})
        
        })
        if (response.ok){
            let data = await response.json()
            if (response.status === 200){
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
            }else{
                logoutUser()
            }

        }
    }

    //  used to call the update token every 2 seconds
    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(()=>{
            if(authToken){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
       
    }, [authToken, loading])
    
    let contextData = {
        user : user,
        loginUser: loginUser,
        logoutUser : logoutUser,
        signUpUser : signUpUser,
        businessDetails : businessDetails,
        error : error,
        userRegister : userRegister,
        business : business,
        retrievebusiness : retrievebusiness,
        businessList : businessList
        
      }

    return(
    
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        
        
    )

}