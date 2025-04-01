import React from 'react';
import { Focus } from '../slices/focusSlice';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabaseConnection } from '../supabase/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


interface FocusCardProps {
    focus: Focus
}

const FocusCard: React.FC<FocusCardProps> = ({ focus }) => {
    const typeData = useSelector((state: RootState) => {
        return state.controls.types;
    });
    const durationData = useSelector((state: RootState) => {
        return state.controls.durations;
    })

    const lookupType = (typeID: string) => {
        const focusType = typeData.find((type) => type.id === typeID);
        console.log(focusType)
        return focusType.type || null;
    }

    const lookupDuration = (durationID: string) => {
        const focusDuration = durationData.find((duration) => duration.id === durationID);
        return focusDuration.duration || null;
    }

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
                    <p className="focus-card-description text-gray-700">{lookupDuration(focus.duration)} {focus.category} by {lookupType(focus.type)}</p>
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