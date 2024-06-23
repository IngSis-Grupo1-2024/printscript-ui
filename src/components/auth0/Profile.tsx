import { useAuth0 } from "@auth0/auth0-react";
import {useEffect} from "react";

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const handleSetToken = async () => {
        const token = await getAccessTokenSilently()
        localStorage.setItem('token', token)
    }

    useEffect(() => {
        handleSetToken().then()
    }, []);


    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <h2>{user?.email}</h2>
            </div>
        )
    );
};
