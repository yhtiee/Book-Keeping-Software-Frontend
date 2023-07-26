import React, { useState, useEffect, useContext } from 'react'
import "../Signup/signup.css"
import HERO from "../../Assets/Hero.png"
import { useRef } from 'react'
import "../../../flow/config"
import * as fcl from "@onflow/fcl"
import {
    useNavigate
} from "react-router-dom";
import { AuthContext } from '../../Context APIs/AuthContext'


const Signin = () => {

    
  const [user, setUser] = useState({loggedIn: null})
  let {loadProfile} = useContext(AuthContext)
  let {currentUser, profileExists, logOut, logIn, signUp, createProfile, userProfile, storeUserProfile} = useContext(AuthContext)

  let navigate = useNavigate()
//   fcl.unauthenticate();

  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  useEffect(() => {

    const delay = 1000; 

    const timer = setTimeout(() => {
      if (user.loggedIn == true){
        loadProfile()
        if (user.loggedIn == true && userProfile === null || userProfile.username == ""){
          createProfile()
          navigate("/signup")
        }
        else if (user.loggedIn == true && userProfile?.username !== ""){
          navigate("/select_business")
        }
      }
    }, delay);
  
    return () => clearTimeout(timer);

  }, [user, profileExists, userProfile]);

  console.log(user)

  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Welcome to Web3 Business App</h1>
                </div>
                <div className='btn_wrapper'>
                <button className='signup_btn' onClick={fcl.logIn}>Log in</button>
                <button className='signup_btn' onClick={fcl.signUp}>Sign up</button>
                </div>
                <h4>Get started by logging in or signing up</h4>
            </div>
        </div>
        <div className="signup_right">
            <div className="signuo_right_top">
                <img src={HERO} alt="Hero picture" className='hero'/>
            </div>
            <div className="signup_right_bottom">
                <h4>Track Business Records, Expenses, Sales and Income</h4>
            </div>
        </div>
    </div>
  )
}

export default Signin