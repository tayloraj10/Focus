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
        return focusType ? focusType.type : '';
    }

    const lookupDuration = (durationID: string) => {
        const focusDuration = durationData.find((duration) => duration.id === durationID);
        return focusDuration ? focusDuration.duration : '';
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
        <div className="focus-card mb-2 border border-gray-300 rounded-lg py-6 pr-6 pl-4 shadow-md transition-transform duration-300 hover:scale-105">
            <div className="flex justify-between ">
                <div className='pr-4'>
                    <IconButton aria-label="add" style={{ padding: '0' }} onClick={() => { deleteFocus(focus.id) }} >
                        <DeleteIcon />
                    </IconButton>
                </div>
                <div >
                    <h2 className="focus-card-title text-xl font-semibold mb-2">{focus.name}</h2>
                    <p className="focus-card-description text-gray-700">{lookupDuration(focus.duration)} {focus.category} by {lookupType(focus.type)}</p>
                </div>
            </div>
        </div>
    );
};

export default FocusCard;