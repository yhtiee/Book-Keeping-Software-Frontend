import React, { useContext } from 'react'
import "../Signup/signup.css"
import HERO from "../../Assets/Hero.png"
import AuthContext from '../../Context APIs/AuthContext'
import { useRef } from 'react'

const Signin = () => {

    let {loginUser} = useContext(AuthContext)
    let {retrievebusiness} = useContext(AuthContext)

    const password = useRef()
    const username = useRef()


    const submitForm = (e) => {
        e.preventDefault()
        let Password = password.current.value
        let Username = username.current.value 
        retrievebusiness()
        loginUser(Password, Username)
    }

  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Signin</h1>
                </div>
                <form className='form' onSubmit={submitForm}>
                    <div>
                        <label>Username</label>
                        <input type="text" ref={username} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" ref={password}/>
                    </div>
                    <button>Signin</button>
                </form>
                <h4>Not registered yet? <a href="/signup">Create an Account</a></h4>
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