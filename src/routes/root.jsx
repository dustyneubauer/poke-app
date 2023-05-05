import React, {useState} from "react";
import { Outlet, Link} from "react-router-dom";
import { SearchBar } from "../components/searchBar";
import { UserLogin } from "./login";

export default function Root() {
  const [token, setToken] = useState();
  
  const handleClick = (e) => {
    setToken(undefined);
  }

  if(!token) {
    return (
      <>
        <div id="sidebar">
          <nav>
            <ul>
              <li>
                <Link to={`/login`}>Login</Link>
              </li>
             </ul> 
           </nav>
          </div>
        <div id="detail">
          <UserLogin setToken={setToken} />
        </div>
      </>
    )
  } else if (token) {
    return (
      <>
        <div id="sidebar">
          <SearchBar />
          <nav>
            <ul>
            <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <Link to={`/random`}>Catch a Random Pokemon</Link>              
                </li>
              <li>
                <Link to={`/my-team`}>View My Team</Link>
              </li>
              <li>
                 <Link to={`/register`}>Register</Link>
               </li>
               <li>
                  <button id="logout" onClick={handleClick}>Logout</button>
               </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
        <Outlet />
        </div>
      </>
    );
  }
}