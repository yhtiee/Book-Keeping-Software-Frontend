import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ListOutlined,
  StackedLineChartOutlined,
  Wallet,
  BroadcastOnHomeOutlined,
  Speaker
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';

const navItems = [
  {
    text:"Dashboard",
    icon: <HomeOutlined/>
  },
  {
    text:"Performance",
    icon: <TrendingUpOutlined/>
  },
  {
    text:"Business Area",
    icon: null
  },
  {
    text:"Products",
    icon: <ShoppingCartOutlined/>
  },
  {
    text:"Sales",
    icon: <PointOfSaleOutlined/>
  },
  {
    text:"Expenses",
    icon: <ReceiptLongOutlined/>
  },
  {
    text:"Utilities",
    icon: null
  },
  {
    text:"TodoList",
    icon: <ListOutlined/>
  },
  {
    text:"My Wallet",
    icon: <Wallet/>
  },
  {
    text:"Projections",
    icon: <StackedLineChartOutlined/>
  },
  {
    text:"Ads",
    icon: <Speaker/>
  },
]

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
}) => {

    const { pathname } = useLocation()
    const [active, setActive] = useState("")
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

  return (
    <Box component="nav">
        {isSidebarOpen && (
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="persistent"
                anchor='left'
                sx={{
                  width: drawerWidth,
                  "& .MuiDrawer-paper": {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSixing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                  }}}
            >
              <Box width="100%">
                  <Box m="1.5rem 2rem 2rem 3rem">
                    <FlexBetween color={theme.palette.secondary.main}>
                      <Box display="flex" alignItems="center" gap="0.5rem">
                        <Typography variant='h4' fontWeight="bold">
                          SMARTBOOKS
                        </Typography>
                      </Box>
                      {!isNonMobile && (
                          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <ChevronLeft/>
                          </IconButton>
                      )}
                    </FlexBetween>
                  </Box>
                  <List>
                    {navItems.map(({text, icon}) => {
                      if (!icon){
                        return (
                          <Typography key={text} sx={{m:"2.25rem 0 1rem 3rem"}}>
                            {text}
                          </Typography>
                        )
                      }
                      const lcText = text.toLowerCase()
                      return (
                        <ListItem key={text} disablePadding>
                          <ListItemButton 
                            onClick={() => {
                              navigate(`/${lcText}`)
                              setActive(lcText)
                            }}
                            sx={{
                              backgroundColor: active === lcText? theme.palette.secondary[300]:"transparent",
                              color: active === lcText? theme.palette.primary[600]:theme.palette.secondary[100]
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                m1: "2rem",
                                color: active === lcText? theme.palette.primary[600]:theme.palette.secondary[200]
                              }}
                            
                            >
                              {icon}
                            </ListItemIcon>
                              <ListItemText primary={text}/>
                              {active === lcText && (
                                <ChevronRightOutlined sx={{ml:"auto"}}/>
                              )}
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
              </Box>
              {/* <Box position="absolute" bottom="1rem">
                <Divider/>
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                  <Box
                    component="img"
                    alt="profile"
                    src = "#"
                    height="30px"
                    width="40px"
                    borderRadius="50%"
                    sx={{objectfit: "cover"}}
                  />
                    <Box textAlign="left">
                      <Typography fontWeight="bold" fontSize="0.9rem" sx={{color: theme.palette.secondary[100]}}>
                        Sharon
                      </Typography>
                      <Typography fontSize="0.8rem" sx={{color: theme.palette.secondary[200]}}>
                        Sharon Fashion Hub
                      </Typography>
                    </Box>
                    <SettingsOutlined
                      sx={{color: theme.palette.secondary[300], fontSize:"25px"}}
                    />
                </FlexBetween>
              </Box> */}
            </Drawer>
        )}
    </Box>
  )
}

export default Sidebar
