import { useAuth0 } from "@auth0/auth0-react";
import {useEffect} from "react";
import {useSaveUserName} from "../../utils/queries.tsx";

export const Profile = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const handleSetToken = async () => {
        const token = await getAccessTokenSilently()
        localStorage.setItem('token', token)
    }

    useEffect(() => {
        handleSetToken().then()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if(user !== undefined) useSaveUserName(user.nickname)
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
