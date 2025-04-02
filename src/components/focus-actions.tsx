import { useEffect, useRef } from 'react';
import { FocusAction } from '../slices/focusSlice';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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

    const deleteAction = async (actionID: string) => {
        const { error } = await supabaseConnection.from('focus_actions').delete().eq('id', actionID);
        if (error) {
            console.error('Error deleting focus:', error);
        }
    };

    return (
        <div className="flex items-center w-full">
            <div>
                <IconButton aria-label="add" onClick={addAction}>
                    <AddIcon style={{ fontSize: '2rem' }} />
                </IconButton>
            </div>
            <div className='flex gap-8 overflow-x-auto overflow-y-hidden scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-h-3 h-40 scrollbar-thumb-slate-700 scrollbar-track-slate-600 cursor-pointer scrollbar-active:scrollbar-thumb-slate-400 w-full'>
                {actions
                    .slice()
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((action, index) => (
                        <div className="flex flex-col items-center justify-center" key={action.id}>
                            <div className="w-12 h-12 flex items-center justify-center rotate-45 border-2 border-gray-300">
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
                            <div className="text-white mt-4 flex items-center justify-center">
                                <button className="rounded-full px-2 py-1 bg-gray-800 hover:bg-gray-700 focus:outline-none text-sm cursor-pointer">
                                    {formatDate(action.date)}
                                </button>
                                <IconButton aria-label="delete" onClick={() => deleteAction(action.id)}>
                                    <RemoveIcon style={{
                                        fontSize: '1.5rem', color: 'crimson'
                                    }} />
                                </IconButton>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FocusActions;