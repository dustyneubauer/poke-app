import React, { useState } from "react";
import "../index.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../slices/userSlice";

export const UserLogin = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    dispatch(login({username, password}));
  }



  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Please Log In</h1>
        <div className="username">
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="password">
          <p>Password</p>
          <input type="password" onChange={e => {
            console.log(e.target.value);
            console.log(password);
           setPassword(e.target.value)} }/>
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
