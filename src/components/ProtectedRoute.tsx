// components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoute: React.FC = () => {
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn);

    if (!loggedIn) {
        return <Navigate to="/" replace />;
    }

    else return <Outlet />;
};

export default ProtectedRoute;
