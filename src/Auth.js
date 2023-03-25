import {useState} from "react";
import Form from 'react-bootstrap/Form';
import Login from "./Login"
function Auth(){
  const [user, setUser] = useState(null);
  if(!user||user == ""){
    return <Login user={user} setUser={setUser}/>
  }
    return (
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control style={{width : "400px"}} type="email" placeholder="Your name" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
    )
}
export default Auth;    