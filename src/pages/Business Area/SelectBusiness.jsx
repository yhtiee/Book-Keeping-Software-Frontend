import React, { useContext, useState , useEffect} from 'react'
import "../Signup/signup.css"
import HERO from "../../Assets/Hero.png"
import { useRef } from 'react'
import "../../../flow/config"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {useTheme} from "@mui/material";
import { AuthContext } from '../../Context APIs/AuthContext';
import * as fcl from "@onflow/fcl"
import { useNavigate } from 'react-router-dom'


const SelectBusiness = () => {

    const [user, setUser] = useState({loggedIn: null})
    useEffect(() => fcl.currentUser.subscribe(setUser), [])
    let {retrievebusiness, userProfile, business} = useContext(AuthContext)
    const theme = useTheme();
    let navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        retrievebusiness(user)
        console.log(business)
    }, [user])

    let setItems = (event, business_name) => {
        localStorage.setItem("businessName", JSON.stringify(business_name))
        navigate("/")
    }
    
  return (
    <div className='signup_wrapper'>
        <div className="signup_left">
            <div className='form_wrapper'>
                <div>
                    <h1>Select your Business</h1>
                </div>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor:"white" }}>
                    <List>
                        {business? business.map((item, key) => (
                            <ListItem key={key}>
                                <ListItemButton key={item.pk} sx={{
                                    backgroundColor: theme.palette.background.alt,
                                    color: 'white',
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    padding: "10px 20px",
                                    '&:hover': {
                                    border: `1px solid ${theme.palette.background.alt}`,
                                    color: theme.palette.background.alt,
                                    backgroundColor: 'white',
                                    cursor: "pointer"
                                    }
                                }} onClick={event => setItems(event, item.business_name)}>
                                    <ListItemText primary={item.business_name}/>
                                </ListItemButton>
                            </ListItem>
                        )): ""}
                    </List>
                </Box>
                <h4>Create Business? <a href="/business_area">Create a New Business</a></h4>
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

export default SelectBusiness