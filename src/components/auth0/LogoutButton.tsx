export const LogOutButton = () => {
    const logout = () => {
        localStorage.clear();
        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        window.location.reload();
    };

    return <button
        onClick={() => logout()}
    >
        Log Out
    </button>
}