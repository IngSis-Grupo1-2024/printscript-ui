import './App.css';
import {RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import HomeScreen from "./screens/Home.tsx";
import {QueryClient, QueryClientProvider} from "react-query";
import RulesScreen from "./screens/Rules.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import {AUTH0_SCOPE} from "./utils/constants.ts";


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
            domain="dev-dxazwu1rijz501rx.us.auth0.com"
            clientId="wsLlRrSaLvb45jz9v2UBugf4ruUxvd08"

            authorizationParams={{
                redirect_uri: window.location.origin,
                audience:'https://snippet-searcher',
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
