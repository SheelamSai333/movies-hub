import React, { useState, createContext } from "react";

export const UserDetailsContext = React.createContext(); 

export default function UserDetailsProvider({children}){
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
return <UserDetailsContext.Provider value={{userName,password,setUserName,setPassword}}>
    {children}
</UserDetailsContext.Provider>
}



  