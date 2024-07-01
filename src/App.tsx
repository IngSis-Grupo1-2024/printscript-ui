import './App.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import HomeScreen from "./screens/Home.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import RulesScreen from "./screens/Rules.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {AUTH0_SCOPE, AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_AUDIENCE} from "./utils/constants.ts";

console.log(AUTH0_SCOPE)
console.log(AUTH0_DOMAIN)
console.log(AUTH0_CLIENT_ID)
console.log(AUTH0_AUDIENCE)


const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeScreen/>
    },
    {
        path: '/rules',
        element: <RulesScreen/>
    }
]);

export const queryClient = new QueryClient()
const App = () => {
    return (
        <Auth0Provider
            domain={AUTH0_DOMAIN}
            clientId={AUTH0_CLIENT_ID}

            authorizationParams={{
                redirect_uri: window.location.origin,
                audience:AUTH0_AUDIENCE,
                scope:AUTH0_SCOPE
            }}
        >
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </Auth0Provider>
    );
}

export default App;
