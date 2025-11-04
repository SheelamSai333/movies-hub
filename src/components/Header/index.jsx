import { useNavigate } from 'react-router-dom'
import './index.css'
import { Link } from 'react-router-dom'
import { useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom'
function Header() {
  const [searchIcon,setSearchIcon] = useState(true)
  const[inputValue,setInputValue] = useState('')
  const navigate = useNavigate()
  const MovieLogo = ()=>{
    navigate("/home")
  }
  const SearchImage = ()=>{
    setSearchIcon(false)
    // navigate(`/movies-app/movies-search`)
  }
  
 
  const handleInnerSearchClick = () => {
    navigate(`/movies-app/movies-search?search=${inputValue}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      navigate(`/movies-app/movies-search?search=${inputValue}`)
    }
  }
  const AccountDetails = ()=>{
    navigate("/account")
  }
  const location = useLocation()

useEffect(() => {
 
  if (location.pathname !== "/movies-app/movies-search") {
    setSearchIcon(true) 
    setInputValue("")
  }
}, [location])

  return ( 
<header className="header from-black/100 to transparent">
  <div className="header-left">
    <h1 className="logo" onClick={MovieLogo}>MOVIES</h1>
    <nav className="nav-links">
    <Link to={"/home"}>Home</Link>
    <Link to={"/popular"}>Popular</Link>
    </nav>
  </div>

  <div className="header-right">
    {searchIcon ? <img onClick={SearchImage}
      src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
      alt="search"
      className="icon"
    />:(
          <div className="search-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search movies..."
              className="search-input"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
              alt="search"
              className="search-icon-inside"
              onClick={handleInnerSearchClick}
            />
           
          </div>
        )
}
    <img
    onClick={AccountDetails}
      src="https://res.cloudinary.com/dquu2hthg/image/upload/v1761644944/Avatar_ikx2nf.svg"
      alt="profile"
      className="profile-img"
    />
    
  </div>
</header>

  )
}

export default Header
