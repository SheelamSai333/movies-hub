import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserDetailsContext } from "../Contexts/UserDetailsContext";
import Cookies from "js-cookie";
import "./index.css";
const Account = () => {
  const { userName } = useContext(UserDetailsContext);
  
  const navigate = useNavigate()
  const Logout = ()=>{
     Cookies.remove("jwt_token")
     navigate('/')
}
  return (
    <div className="account-container">
      <div className="account-details">
        <h1 className="account-title">Account</h1>
        <hr />

        <div className="account-info">
          <div className="account-section">
            <p className="label">Member ship</p>
            <p className="value">{userName || "rahul@gmail.com"}</p>
            <p className="password">Password : **********</p>
          </div>

          <hr />

          <div className="account-section">
            <p className="label">Plan details</p>
            <p className="value">
              Premium <span className="tag">Ultra HD</span>
            </p>
          </div>

          <hr />

          <div className="logout-btn-container">
            <button onClick={Logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
