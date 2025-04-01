import React from 'react';
import { Focus } from '../slices/focusSlice';
import FocusCard from './focus-card';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewFocusDialog from './new-focus-dialog';


interface FocusListProps {
    items: Focus[];
}

const FocusList: React.FC<FocusListProps> = ({ items }) => {
    const [showAddDialog, setShowAddDialog] = React.useState(false);

    return (
        <div>
            <div className="flex flex-row items-center justify-center mb-10">
                <h1 className='text-3xl font-bold flex items-center'>
                    Your Focuses
                </h1>
                <IconButton aria-label="add" style={{ marginTop: '0.5rem' }} onClick={() => setShowAddDialog(true)} >
                    <AddIcon style={{ fontSize: '2rem' }} />
                </IconButton>
                <NewFocusDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} />
            </div>
            <ul>
                {items.map((item) => (
                    <FocusCard key={item.id} focus={item} />
                ))}
            </ul>
        </div>
    );
};

export default FocusList;