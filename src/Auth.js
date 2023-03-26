import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Login from "./components/login/Login";
function Auth({ children }) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    let nickname = localStorage.getItem("nickname")
    if (nickname){
      setUser(nickname)
    }
  },[])
  if (!user || user === "") {
    return <Login user={user} setUser={setUser} />;
  }
  return children;
}
export default Auth;
