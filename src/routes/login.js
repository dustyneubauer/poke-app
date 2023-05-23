import React, {useState} from "react";
import '../index.css';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { loadUserData } from "../slices/userSlice";

export const login = async ({username, password}) => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "password": password,
  "username": username,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
};

return fetch("http://localhost:8000/api/login", requestOptions)
  .then(data => data.json())
};

export const UserLogin = ({setToken}) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await login({
      username,
      password
    });
    setToken(token);
    dispatch(loadUserData());
    console.log(token);
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
