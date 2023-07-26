import React, {useContext, useState, useEffect} from "react";
import Header from '../../Components/Header';
import FlexBetween from '../../Components/FlexBetween';
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  ReceiptLongOutlined,
  Money,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StatBox from "../../Components/StatBox";
import ProductContext from '../../Context APIs/ProductsContext';
import "../../../flow/config"
import * as fcl from "@onflow/fcl"
import ExpenseContext from "../../Context APIs/ExpensesContext";
import SalesContext from "../../Context APIs/SalesContext";


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  let {totalProduct, retrieveTotalProduct} = useContext(ProductContext)
  let {retrieveTodayExpenses, retrieveMonthExpenses, retrieveYearExpenses, expenseToday, expenseMonth, expenseYear} = useContext(ExpenseContext)
  let { retrieveTodaySales, retrieveYearSales, retrieveMonthSales, salesToday, salesMonth, salesYear} = useContext(SalesContext)
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  const today = new Date()

  useEffect(() => {
    retrieveTotalProduct(user)
    retrieveTotalProduct(user)
    retrieveTodayExpenses(user)
    retrieveMonthExpenses(user)
    retrieveYearExpenses(user)
    retrieveYearSales(user)
    retrieveMonthSales(user)
    retrieveTodaySales(user)
    console.log(totalProduct)
  }, [user, user])


  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                border: `1px solid ${theme.palette.secondary.light}`,
                color: theme.palette.secondary.light,
              }
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Products"
          value={`${totalProduct}`}
          description="Currently in Stock"
          icon={
            <ShoppingCartOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Sales Today"
          value={`₦${salesToday}`}
          description={today.toDateString()}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Monthly Sales"
          value={`₦${salesMonth}`}
          description={today.toLocaleString("default", {month:"long"})}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={`₦${salesYear}`}
          description={today.getFullYear()}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(6, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Expenses Today"
          value={`₦${expenseToday}`}
          description={today.toDateString()}
          icon={
            <ReceiptLongOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Monthly Expenses"
          value={`₦${expenseMonth}`}
          description={today.toLocaleString("default", {month:"long"})}
          icon={
            <ReceiptLongOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Expenses"
          value={`₦${expenseYear}`}
          description={today.getFullYear()}
          icon={
            <ReceiptLongOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Income Today"
          value={`₦${salesToday - expenseToday}`}
          description={today.toDateString()}
          icon={
            <Money
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Monthly Income"
          value={`₦${salesMonth - expenseMonth}`}
          description={today.toLocaleString("default", {month:"long"})}
          icon={
            <Money
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Yearly Income"
          value={`₦${salesYear - expenseYear}`}
          description={today.getFullYear()}
          icon={
            <Money
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
