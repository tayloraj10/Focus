import { createClient } from '@supabase/supabase-js';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);


const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
        navigate('/');
    }

    return (
        <nav className="bg-custom-primary p-4 fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/focus" className="text-white text-2xl font-bold">Focus</a>
                <div>
                    <button onClick={logout} className="border-2 hover:border-custom-secondary hover:cursor-pointer mx-2 px-4 py-2 rounded">
                        Profile
                    </button>
                    <button onClick={logout} className="border-2 hover:border-custom-secondary hover:cursor-pointer mx-2 px-4 py-2 rounded">
                        Log Out
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;