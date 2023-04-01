import { useEffect, useState } from "react";
import Login from "./components/login/Login";
import Sheets from "./components/sheets/sheets"
function Auth({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    let nickname = localStorage.getItem("nickname");
    if (nickname) {
      setUser(nickname);
    }
    setIsloading(false);
  }, []);

  if (isLoading) {
    return (
      <div>
        <h2>Загрузка</h2>
      </div>
    );
  }

  if (!user || user === "") {
    return <Login user={user} setUser={setUser} />;
  }
  return <Sheets user={user} setUser={setUser}/>;
}
export default Auth;
