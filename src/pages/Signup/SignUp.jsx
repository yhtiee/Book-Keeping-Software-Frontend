import React, { useContext, useState } from 'react'
import "./signup.css"
import HERO from "../../Assets/Hero.png"
import {AuthContext} from '../../Context APIs/AuthContext'
import { useRef } from 'react'
import "../../../flow/config"
import * as fcl from "@onflow/fcl"

const SignUp = () => {
    // const {signUpUser} = useContext(AuthContext)
    // fcl.unauthenticate();
    let {currentUser, profileExists, logOut, logIn, signUp, createProfile, userProfile} = useContext(AuthContext)
  
    const username = useRef()
    const email = useRef()

    const submitForm = (e) => {
        e.preventDefault()
        let Email = email.current.value
        let Username = username.current.value
        createProfile(Email, Username)
    }

  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Create Profile</h1>
                </div>
                <form className='form' onSubmit={submitForm}>
                    <div>
                        <label>Username</label>
                        <input type="text" name='username' ref={username}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="email" name="email" ref={email}/>
                    </div>
     
                    <button className='signup_btn'>Proceed</button>
                </form>
                <h4>Create your User Profile</h4>
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

export default SignUp