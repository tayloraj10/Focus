import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabaseConnection } from '../supabase/supabaseClient';
import { setUser } from "../slices/userSlice";


const LoadingPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        supabaseConnection.auth.getSession().then(({ data: { session } }) => {
            // console.log("Session: ", session);
            if (session) {
                setLoggedIn(true);
                dispatch(
                    setUser({ uid: session?.user.id!, email: session?.user.email!, displayName: '' })
                );
            } else {
                setLoggedIn(false);
            }
        });
    }, []);

    const handleRouting = () => {
        if (!loggedIn) {
            navigate('/login');
        }
        else navigate('/focus');
    }

    useEffect(() => {
        if (loggedIn !== null) {
            handleRouting();
        }
    }, [loggedIn]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                <h1 className="text-2xl mt-4">Loading...</h1>
            </div>
        </div>
    );
};

export default LoadingPage;