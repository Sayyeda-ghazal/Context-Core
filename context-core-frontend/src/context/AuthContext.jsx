import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe, logoutUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refresh = async () => {
        try {
            const res = await getMe();
            setUser(res.data.user ?? null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Login: cookie is set by backend; call refresh after login completes
    const login = async () => {
        await refresh();
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
        }
    };

    const value = useMemo(() => ({
        user,
        login,
        logout,
        refresh,
        loading,
        isAuthenticated: !!user,
    }), [user, loading]);

    return (<AuthContext.Provider
    value={value}> {children} </AuthContext.Provider>);
};

export const useAuth = () => {
    return useContext(AuthContext);
};
