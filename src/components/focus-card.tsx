import React from 'react';
import { Focus } from '../slices/focusSlice';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface FocusCardProps {
    focus: Focus
}

const FocusCard: React.FC<FocusCardProps> = ({ focus }) => {
    return (
        <div className="focus-card mb-10 border border-gray-300 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="focus-card-title text-xl font-semibold mb-2">{focus.name}</h2>
                    <p className="focus-card-description text-gray-700">{focus.category}</p>
                </div>
                <div>
                    <IconButton aria-label="add" style={{ marginTop: '0.5rem' }} onClick={() => { }} >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default FocusCard;