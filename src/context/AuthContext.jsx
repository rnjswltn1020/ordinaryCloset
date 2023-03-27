import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { loginStateChanged, googleLogin, logout, emailLogin } from '../api/fbase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [getUserData, setUserData] = useState(null);

    useEffect(() => {
        loginStateChanged(setUserData);
    }, []);

    const AuthData = useMemo(() => {
        return {
            getUserData,
            uid: getUserData && getUserData.uid,
            googleLogin,
            logout,
            emailLogin,
        };
    }, [getUserData]);

    return <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}
