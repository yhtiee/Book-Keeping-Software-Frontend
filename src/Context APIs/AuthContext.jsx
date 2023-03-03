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
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState(null)
    let navigate = useNavigate()
    let [userRegister , setRegisterUser] = useState(null)


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
                navigate("/business_area")
                console.log(response)
                setRegisterUser(Username)
            }
        }
        else{
            console.log("error")
        }  
    }

    async function businessDetails(userRegister, Business_name, selectedType){
        console.log("form submitted")
        let response = await fetch (`${API_URL}business/create_business/`, {  
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"business_name":Business_name, "business_type":selectedType, "username":userRegister})
        })
        if (response.ok){
            if (response.status === 200){
                navigate("/signin")
                console.log("success")
                console.log(response)
            }
        }
        else{
            console.log("error")
        }  
    }


    async function loginUser(e){
        e.preventDefault()
        let response = await fetch (`${API_URL}auth/token/`, {  
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password': e.target.password.value})
        
        })
        if (response.ok){
            let data = await response.json()
            if(response.status === 200){
                setAuthToken(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem("authTokens", JSON.stringify(data))
                navigate("/")
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

    }


    // uPdate the token every 5mins sending the refresh token to the backend
    let updateToken = async () =>{
        console.log("update called")
        let response = await fetch ("http://127.0.0.1:8000/api/token/refresh/", {  
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
        userRegister : userRegister
        
      }

    return(
    
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
        
        
    )

}