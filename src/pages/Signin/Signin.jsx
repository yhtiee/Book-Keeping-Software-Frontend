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
  let {currentUser, profileExists, logOut, logIn, signUp, createProfile, userProfile} = useContext(AuthContext)


  let navigate = useNavigate()
//   fcl.unauthenticate();


  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  useEffect(() => {
    if (user.loggedIn == true){
      loadProfile()
      if (user.loggedIn == true && profileExists == false){
        createProfile()
        navigate("/signup")
      }
      else if (user.loggedIn == true && userProfile.username !== ""){
        navigate("/")
      }
    }
  }, [user, profileExists]);

  console.log(user)

    // let {loginUser} = useContext(AuthContext)
    // let {retrievebusiness} = useContext(AuthContext)

    // const password = useRef()
    // const username = useRef()


    // const submitForm = (e) => {
    //     e.preventDefault()
    //     let Password = password.current.value
    //     let Username = username.current.value 
    //     retrievebusiness()
    //     loginUser(Password, Username)
    // }

  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Welcome to Web3 Business App</h1>
                </div>
                {/* <form className='form' onSubmit={submitForm}>
                    <div>
                        <label>Username</label>
                        <input type="text" ref={username} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" ref={password}/>
                    </div>    
                </form> */}
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