import React, { useContext, useState } from 'react'
import "./signup.css"
import HERO from "../../Assets/Hero.png"
import AuthContext from '../../Context APIs/AuthContext'
import { useRef } from 'react'



const SignUp = () => {
    const {signUpUser} = useContext(AuthContext)
  
    const password = useRef()
    const username = useRef()
    const email = useRef()

    const submitForm = (e) => {
        e.preventDefault()
        let Password = password.current.value
        let Email = email.current.value
        let Username = username.current.value 
        signUpUser(Password, Email, Username)

    }

  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Signup</h1>
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
                    <div>
                        <label>Password:</label>
                        <input type="password" name='password' ref={password}/>
                    </div>
     
                    <button>Signup</button>
                </form>
                <h4>Already have an account? <a href="/signin">Signin</a></h4>
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