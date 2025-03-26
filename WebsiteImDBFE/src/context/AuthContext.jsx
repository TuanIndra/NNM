// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const navigate = useNavigate();

    // Hàm kiểm tra token hết hạn
    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        toast.error("Đăng nhập của bạn đã quá hạn!", { position: "top-center" });
        navigate("/home");
    };

    // Kiểm tra token định kỳ
    useEffect(() => {
        const interval = setInterval(() => {
            const currentToken = localStorage.getItem("token");
            if (currentToken && isTokenExpired(currentToken)) {
                logout();
            }
        }, 1000); // Kiểm tra mỗi 1 giây để test với expiresIn: "15s"

        return () => clearInterval(interval);
    }, []);

    // Hàm đăng nhập
    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};