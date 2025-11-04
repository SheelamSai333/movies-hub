import { Route, Routes } from "react-router-dom"
import LoginPage from './components/LoginPage'
import HomePage from './components/Homepage'
import Popular from './components/Popular'
import Header from './components/Header'
import MovieDetails from './components/MovieDetails'
import ProtectedRoutes from './components/ProtectedRoutes'
import SearchResults from "./components/SearchResults"
import Account from "./components/Account"
import UserDetailsProvider from "./components/Contexts/UserDetailsContext"
import PageNotFound from "./components/PageNotFound"
import './App.css'

function App() {
  

  return (
    <UserDetailsProvider>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/home" element={<ProtectedRoutes><Header/><HomePage/></ProtectedRoutes>}/>
        <Route path="/popular" element={<ProtectedRoutes><Header/><Popular/></ProtectedRoutes>}/>
        <Route path = "/home/movies/:id" element = {<ProtectedRoutes><Header/><MovieDetails/></ProtectedRoutes>}/> 
        <Route path = "/movies-app/movies-search" element = {<ProtectedRoutes><Header/><SearchResults/></ProtectedRoutes>}/>
        <Route path="/account" element={<ProtectedRoutes><Header/><Account/></ProtectedRoutes>}/>
        <Route path="*" element={<PageNotFound/>}/> 
      </Routes>
    </UserDetailsProvider>
  )
}

export default App
