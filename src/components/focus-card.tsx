import React from 'react';
import { Focus } from '../slices/focusSlice';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabaseConnection } from '../supabase/supabaseClient';


interface FocusCardProps {
    focus: Focus
}

const FocusCard: React.FC<FocusCardProps> = ({ focus }) => {
    const deleteFocus = async (focusID: string) => {
        try {
            console.log(`Deleting focus with ID: ${focusID}`);
            const { error } = await supabaseConnection
                .from('focuses')
                .delete()
                .eq('id', focusID);

            if (error) {
                throw new Error(`Error deleting focus: ${error.message}`);
            } else {
                console.log('Focus deleted successfully');
            }
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <div className="focus-card mb-10 border border-gray-300 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="focus-card-title text-xl font-semibold mb-2">{focus.name}</h2>
                    <p className="focus-card-description text-gray-700">{focus.category}</p>
                </div>
                <div>
                    <IconButton aria-label="add" style={{ marginTop: '0.5rem' }} onClick={() => { deleteFocus(focus.id) }} >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default FocusCard;