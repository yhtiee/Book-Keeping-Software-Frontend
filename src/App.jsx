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
import { AuthProvider } from "./Context APIs/AuthContext";
import BusinessArea from "./pages/Business Area/BusinessArea";

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <AuthProvider>
            <Routes>
              <Route path="/business_area" element={<BusinessArea/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<SignUp/>}/>
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
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
