import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";

const LoadingPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //   const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //       dispatch(
    //         setUser({ uid: user.uid, email: user.email, displayName: user.displayName })
    //       );
    //     } else {
    //       dispatch(clearUser());
    //     }
    //   });
  
    //   return unsubscribe;
    // }, [dispatch]);
  
    useEffect(() => {
    //   if (user) {
    //     navigate('/focus'); // Redirect to home if signed in
    //   } else {
    //     navigate('/'); // Redirect to login if not signed in
    //   }
      navigate('/focus'); // Redirect to home if signed in
    }, [user, navigate]);

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