import React, {useState} from "react";
import '../index.css';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export const login = async (credentials) => {
  console.log(credentials);
  return fetch('http://localhost:8000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
};

export const UserLogin = ({setToken}) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login({
      username,
      password
    });
    setToken(token);
  }

    return(
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
          <h1>Please Log In</h1>
        <div className="username">
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)}/>
        </div>
        <div className="password">
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="footer">
          <button type="submit">Submit</button>
        </div>
        <div className="footer">
          <Link to="/register"><button type="button">Register</button></Link>
        </div>
      </form>
     </div> 
    )
  }

  UserLogin.propTypes = {
    setToken: PropTypes.func.isRequired
  }
