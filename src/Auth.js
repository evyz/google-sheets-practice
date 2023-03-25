import { useState } from "react";
import Form from "react-bootstrap/Form";
import Login from "./components/login/Login";
function Auth({ children }) {
  const [user, setUser] = useState(null);
  if (!user || user === "") {
    return <Login user={user} setUser={setUser} />;
  }
  return children;
}
export default Auth;
