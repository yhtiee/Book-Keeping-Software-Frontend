import Signin from "./pages/Signin/Signin"
import SignUp from "./pages/Signup/SignUp"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme.js"
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout/Layout";
import { useMemo } from "react";
import Products from "./pages/Products/Products";
import Sales from "./pages/Sales/Sales";
import Performance from "./pages/Business Info/Performance";
import Projections from "./pages/Projections/Projections";
import Expenses from "./pages/Expenses/Expenses";
import TodoList from "./pages/Todo List/TodoList";
import  AuthProvider  from "./Context APIs/AuthContext";
import  TransactionProvider  from "./Context APIs/TransactionContext";
import BusinessArea from "./pages/Business Area/BusinessArea";
import SelectBusiness from "./pages/Business Area/SelectBusiness";
import { ProductProvider } from "./Context APIs/ProductsContext";

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className='app'>
      <BrowserRouter>
      <TransactionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AuthProvider>
            <ProductProvider>
              <Routes>
                <Route path="/business_area" element={<BusinessArea/>}/>
                  <Route path="/signin" element={<Signin/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
                  <Route path="/select_business" element={<SelectBusiness/>}/>
                    <Route element={<Layout/>}>
                      <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
                      <Route path="/dashboard" element={<Dashboard/>}/>
                      <Route path="/products" element={<Products/>}/>
                      <Route path="/expenses" element={<Expenses/>}/>
                      <Route path="/sales" element={<Sales/>}/>
                      <Route path="/performance" element={<Performance/>}/>
                      <Route path="/projections" element={<Projections/>}/>
                      <Route path="/todolist" element={<TodoList/>}/>
                    </Route>
              </Routes>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
        </TransactionProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
