import { useEffect, useRef } from 'react';
import { FocusAction } from '../slices/focusSlice';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { supabaseConnection } from '../supabase/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { debounce } from "lodash"; // Install lodash with `npm install lodash`


interface FocusActionsProps {
    focusID: string;
    actions: FocusAction[];
}

const FocusActions: React.FC<FocusActionsProps> = ({ focusID, actions }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const firstEmptyInput = inputRefs.current.find(input => input && input.value === '');
        if (firstEmptyInput) {
            firstEmptyInput.focus();
        }
    }, [actions]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: '2-digit', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const addAction = async () => {
        let newDate = new Date();
        if (actions.length > 0) {
            const mostRecentAction = actions.reduce((latest, action) => {
                const actionDate = new Date(action.date);
                return actionDate > new Date(latest.date) ? action : latest;
            }, actions[0]);
            newDate = new Date(mostRecentAction.date);
            newDate.setDate(newDate.getDate() + 1); // Increment by 1 day
        }

        const newAction = {
            focus: focusID,
            date: newDate,
            created_by: user?.uid
        };
        const { error } = await supabaseConnection.from('focus_actions').insert(newAction);
        if (error) {
            console.error('Error inserting focus:', error);
        }
    };

    const updateAction = debounce(async (actionID: string, amount: number) => {
        const { error } = await supabaseConnection.from('focus_actions').update({ amount }).eq('id', actionID);
        if (error) {
            console.error('Error updating focus:', error);
        }
    }, 500);

    return (
        <div className="flex gap-8 ml-6 items-baseline">
            {actions.map((action, index) => (
                <div className="flex flex-col items-center" key={action.id}>
                    <div
                        className="w-12 h-12 flex items-center justify-center rotate-45 border-2 border-gray-300"
                    >
                        <input
                            type="text"
                            defaultValue={action.amount ? action.amount : ''}
                            onChange={(e) => {
                                updateAction(action.id, parseInt(e.target.value) || 0);
                            }}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            className="-rotate-45 bg-transparent text-center outline-none"
                        />
                    </div>
                    <div className="text-white mt-4">
                        {formatDate(action.date)}
                    </div>
                </div>
            ))}
            <div >
                <IconButton aria-label="add" onClick={addAction}>
                    <AddIcon style={{ fontSize: '2rem' }} />
                </IconButton>
            </div>
        </div>
    );
};

export default FocusActions;