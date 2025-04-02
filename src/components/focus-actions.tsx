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

    const calculateActionChange = (action: FocusAction) => {
        if (!action.amount) {
            return 0;
        }

        const currentActionDate = new Date(action.date);
        const previousAction = actions
            .filter(a => new Date(a.date) < currentActionDate)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        return previousAction ? action.amount - previousAction.amount : 0;
    };

    return (
        <div className="flex items-center w-full">
            <div>
                <IconButton aria-label="add" onClick={addAction}>
                    <AddIcon style={{ fontSize: '2rem' }} />
                </IconButton>
            </div>
            <div className="flex gap-6 overflow-x-auto overflow-y-hidden scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-h-3 h-40 scrollbar-thumb-slate-700 scrollbar-track-slate-600 cursor-pointer scrollbar-active:scrollbar-thumb-slate-400 w-full px-4 py-2">
                {actions
                    .slice()
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((action, index) => (
                        <div
                            className="flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105"
                            key={action.id}
                        >
                            <div
                                className={`flex items-center justify-center border-2 rounded-full transition-all duration-300 ${action.amount ? 'rotate-90 w-12 h-12' : 'w-16 h-16'
                                    } ${calculateActionChange(action) < 0
                                        ? 'border-red-600 bg-red-100'
                                        : 'bg-transparent'
                                    } ${calculateActionChange(action) > 0
                                        ? 'border-green-400 bg-green-100'
                                        : 'bg-transparent'
                                    }`}
                            >
                                <input
                                    type="text"
                                    defaultValue={action.amount ? action.amount : ''}
                                    onChange={(e) => {
                                        updateAction(action.id, parseInt(e.target.value) || 0);
                                    }}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    className={`bg-transparent text-center outline-none text-lg font-semibold ${action.amount ? '-rotate-90' : ''
                                        }`}
                                />
                            </div>
                            <div className="text-white mt-4 flex flex-col items-center">
                                <button className="rounded-full px-3 py-1 bg-gray-700 hover:bg-gray-600 focus:outline-none text-sm cursor-pointer">
                                    {formatDate(action.date)}
                                </button>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => deleteAction(action.id)}
                                    className="mt-2"
                                    style={{
                                        transition: 'background-color 0.3s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(220, 20, 60, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <RemoveIcon
                                        style={{
                                            fontSize: '1.5rem',
                                            color: 'crimson',
                                        }}
                                    />
                                </IconButton>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default FocusActions;