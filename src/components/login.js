import React, {useState} from "react";
import '../index.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export const Login = ({setToken}) => {
 const [username, setUsername] = useState();
 const [password, setPassword] = useState();

 const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

    return(
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
          <h1>Please Log In</h1>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
     </div> 
    )
  }
