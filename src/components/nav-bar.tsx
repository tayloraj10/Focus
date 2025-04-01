import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../slices/userSlice';
import { supabaseConnection } from '../supabase/supabaseClient';


const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const { error } = await supabaseConnection.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
        else {
            dispatch(logOut())
            navigate('/');
        }
    }

    return (
        <nav className="p-4 fixed w-full">
            <div className=" flex justify-between items-center mx-4">
                <a href="/focus" className="text-white text-2xl font-bold">Focus</a>
                <div>
                    <button className="border-2 border-gray-300 bg-gray-200 text-gray-500 mx-2 px-4 py-2 rounded opacity-50 cursor-not-allowed">
                        {/* className="border-2 hover:border-custom-secondary hover:cursor-pointer mx-2 px-4 py-2 rounded opacity-80 hover:opacity-100" */}
                        Profile
                    </button>
                    <button onClick={handleLogout} className="border-2 hover:border-custom-secondary hover:cursor-pointer mx-2 px-4 py-2 rounded opacity-80 hover:opacity-100">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;