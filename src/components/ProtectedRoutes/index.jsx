
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({children})=>{
    const jwt_token = Cookies.get("jwt_token")
    
    if(jwt_token===undefined){
        return <Navigate to="/" replace/>
    }
    return children;
}
export default ProtectedRoutes