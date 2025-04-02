import React from 'react';
import { Focus } from '../slices/focusSlice';
import FocusCard from './focus-card';
import FocusActions from './focus-actions';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewFocusDialog from './new-focus-dialog';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


interface FocusListProps {
    items: Focus[];
}

const FocusList: React.FC<FocusListProps> = ({ items }) => {
    const [showAddDialog, setShowAddDialog] = React.useState(false);
    const focusActions = useSelector((state: RootState) => {
        return state.focus.focusActions;
    });

    const getFocusActions = (focusID: string) => {
        const actions = focusActions.filter((action) => action.focus === focusID);
        return actions;
    }

    return (
        <div>
            <div className="flex flex-row mb-10">
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
                    <div className='mb-10 flex flex-col sm:flex-row items-center' key={`focus-item-${item.id}`}>
                        <FocusCard focus={item} />
                        <div className="mt-4 ">
                            <FocusActions focusID={item.id} actions={getFocusActions(item.id)} />
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default FocusList;