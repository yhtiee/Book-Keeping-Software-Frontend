import React from 'react'
import "../Signup/signup.css"
import HERO from "../../Assets/Hero.png"

const Signin = () => {
  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Signin</h1>
                </div>
                <form className='form'>
                    <div>
                        <label>Username</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" />
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