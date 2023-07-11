import React, {useContext, useState} from 'react'
import {LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined} from "@mui/icons-material"
import FlexBetween from './FlexBetween'
import { useDispatch } from 'react-redux'
import { setMode } from "../State/index.jsx";
import { 
    AppBar,
    Button,
    Box,
    Typography,
    IconButton,
    InputBase,
    Toolbar,
    Menu,
    MenuItem, 
    useTheme } from '@mui/material'
import AuthContext from '../Context APIs/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
    const dispatch = useDispatch()
    const theme = useTheme()
    let navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    let {user} = useContext(AuthContext)
    let biz = JSON.parse(localStorage.getItem("businessName"))
    let {logoutUser} = useContext(AuthContext)
    
  return (
    <AppBar 
    sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
        <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* LEFT SIDE */}
            <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
            </IconButton>
            <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
            >
                <InputBase placeholder="Search..." />
                <IconButton>
                <Search />
                </IconButton>
            </FlexBetween>
            </FlexBetween>

            {/* RIGHT SIDE */}
            <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
            </IconButton>
            <IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween>
                <Button
                onClick={handleClick}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "none",
                    gap: "1rem",
                }}
                >
                <Box
                    component="img"
                    alt="profile"
                    src="#"
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                    <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary[100] }}
                    >
                    {user? user.username : navigate("/login")}
                    </Typography>
                    <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                    >
                    {biz}
                    </Typography>
                </Box>
                <ArrowDropDownOutlined
                    sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
                />
                </Button>
                <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                <MenuItem onClick={logoutUser}>Log Out</MenuItem>
                </Menu>
            </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar