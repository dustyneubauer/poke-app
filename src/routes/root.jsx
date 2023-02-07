import { Outlet, Link} from "react-router-dom";
import { PokemonInfo } from "./pokePage";
import { SearchBar } from "../components/searchBar";

export default function Root() {


  
    return (
      <>
        <div id="sidebar">
          <SearchBar />
          <nav>
            <ul>
              <li>
                <Link to={`/my-team`}>View My Team</Link>
              </li>
              <li>
                <Link to={`/ash`}>View Ash's Team</Link>
              </li>
              <li>
                <Link to={`/random`}>Catch a Random Pokemon</Link>              
                </li>
              <li>
                <Link to={`/`}>Home</Link>
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