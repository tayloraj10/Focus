import React from 'react';
import { Focus } from '../slices/focusSlice';
import FocusCard from './focus-card';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



interface FocusListProps {
    items: Focus[];
}

const FocusList: React.FC<FocusListProps> = ({ items }) => {
    return (
        <div>
            <div className="flex flex-row items-center justify-center mb-4">
                <h1 className='text-3xl font-bold flex items-center'>
                    Your Focuses
                </h1>
                <IconButton aria-label="add" style={{ marginTop: '0.5rem' }}  >
                    <AddIcon style={{ fontSize: '2rem' }} />
                </IconButton>
            </div>
            <ul>
                {items.map((item) => (
                    <FocusCard focus={item} />
                ))}
            </ul>
        </div>
    );
};

export default FocusList;