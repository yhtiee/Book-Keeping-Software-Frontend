import React, { useContext, useState } from 'react'
import "../Signup/signup.css"
import HERO from "../../Assets/Hero.png"
import AuthContext from '../../Context APIs/AuthContext'
import { useRef } from 'react'


const BusinessArea = () => {

    const [selectedType, setSelectedType] = useState("S.M.E")
    const {businessDetails} = useContext(AuthContext)
    const {userRegister} = useContext(AuthContext)


    const business_name = useRef()

    const handleChangeType = (event) => {
        setSelectedType(event.target.value);
      };
    
    const submitForm = (e) => {
        e.preventDefault()
        let Business_name = business_name.current.value
        businessDetails(userRegister, Business_name, selectedType)
    }

  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Register Your Business</h1>
                </div>
                <form className='form' onSubmit={submitForm}>
                    <div>
                        <label>Business Name</label>
                        <input type="text" name='business_name' ref={business_name} />
                    </div>
                    <div>
                        <label>Business Type</label>
                        <select id="type" name="type" value={selectedType} onChange={handleChangeType}>
                            <option value="S.M.E">S.M.E</option>
                            <option value="M.M.E">M.M.E</option>
                            <option value="L.M.E">L.M.E</option>
                        </select>
                    </div>
                    <button>Submit</button>
                </form>
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

export default BusinessArea