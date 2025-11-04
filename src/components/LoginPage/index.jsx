import {  useState,useContext } from 'react'
import { useNavigate, } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import { UserDetailsContext } from '../Contexts/UserDetailsContext'
function LoginPage() {
  const {userName,setUserName,password,setPassword} = useContext(UserDetailsContext)
  console.log(userName)
  const [errorMsg,setErrorMsg] = useState(false)
  const UserName = (event) => {
    setUserName(event.target.value)
  }
  const Password = (event) => {
    setPassword(event.target.value)
  }
  const navigate = useNavigate()
  const LoginSuccess = (token) => {
    Cookies.set("jwt_token",token,{expires: 7})
    navigate("/home")
  }
  const submit = async (event) => {
    event.preventDefault()
    const userDetails = { username: userName, password }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const uri = "https://apis.ccbp.in/login"
    const response = await fetch(uri, options)
    const data = await response.json()
         

    if (response.ok) {
      LoginSuccess(data.jwt_token)
    }
    else{
      setErrorMsg(true)
    }
  }
  return (
    <div className='bg-container'>
      <h1 className='main-heading'>MOVIES</h1>
      <form className='input-container' onSubmit={submit}>
        <h1>Login</h1>
        <p className='side-para'>USERNAME</p>
        <input type="text" value={userName} onChange={UserName} className='input-bar' />
        <p className='side-para'>PASSWORD</p>
        <input type='password' value={password} onChange={Password} className='input-bar' />
        {errorMsg && <p className='error-msg'>Username or Password is invalid</p>}
        <button type='submit' className='lgn-btn'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
