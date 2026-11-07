import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvaider(props) {
    const { children } = props;
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (nuevoLogin) => {
        localStorage.setItem('token', nuevoLogin);
        setToken(nuevoLogin);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
