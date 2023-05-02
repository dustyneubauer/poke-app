import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import './index.css';
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root";
import { Provider } from "react-redux";
import {store} from "./store";
import { PokemonInfo } from "./routes/pokePage";
import { RandomPokemon } from "./routes/randomPokemon";
import { MyTeam } from "./routes/myTeam";
import { RegistrationForm } from "./routes/registerUser";

const router = createBrowserRouter([
    {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [{
        path:"/",
        element: <PokemonInfo />,
        errorElement: <ErrorPage />
    }, 
    {
        path:"/random",
        element: <RandomPokemon/>,
        errorElement: <ErrorPage />,
    },
    {
        path:"/my-team",
        element: <MyTeam />,
        errorElement: <ErrorPage />
    },
    {
        path:"/register",
        element: <RegistrationForm />,
        errorElement: <ErrorPage />
    }
]},

])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)