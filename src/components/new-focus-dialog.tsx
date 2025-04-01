import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);


const NewFocusDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const user = useSelector((state: RootState) => state.user.user);
    const focusData = useSelector((state: RootState) => {
        console.log("focusData initialized:", state.controls.options);
        return state.controls.options;
    });

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');

    React.useEffect(() => {
        if (open) {
            setSelectedCategory('');
            setSelectedOption('');
        }
    }, [open]);

    const handleCategoryChange = (category: string) => {
        if (category === selectedCategory) {
            setSelectedCategory('');
        }
        else setSelectedCategory(category);
    };

    const handleOptionChange = (option: string) => {
        if (option === selectedOption) {
            setSelectedOption('');
        }
        else setSelectedOption(option);
    };

    const lookupFocus = (category: string, option: string) => {
        const focus = focusData.find((focus) => focus.category === category && focus.name === option);
        return focus || null;
    }

    const submitFocus = async () => {
        const focus = lookupFocus(selectedCategory, selectedOption);
        console.log(crypto.randomUUID())
        const { error } = await supabase
            .from('focuses')
            .insert({
                created_at: new Date(),
                created_by: user?.uid,
                name: focus?.name,
                type: "b33c7f53-d0ec-48c7-9c7d-18d266c29cb4",
                duration: "eee83bc8-4745-4d5c-9929-b7a5ce083c6b",
                category: focus?.category
            });

        if (error) {
            console.error('Error inserting focus:', error);
        }
    }



    return (
        <>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
                <DialogBackdrop className="fixed inset-0 bg-black/20" />
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="p-10 rounded-xl border-2 p-6 backdrop-blur-2xl bg-white/10  shadow-lg duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <div className="mb-4 text-center">
                                <label htmlFor="dropdown1" className="block mb-2 font-bold text-white/80">Category:</label>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {[...new Set(focusData.map((option) => option.category))].map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`px-4 py-2 rounded-full border-2 ${selectedCategory === category
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-transparent text-white border-gray-300'
                                                } hover:bg-blue-400 hover:text-white`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {selectedCategory && (
                                <div className="mb-4 text-center">
                                    <label htmlFor="dropdown1" className="block mb-2 font-bold text-white/80">Options:</label>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {focusData.map((option) => (
                                            <button
                                                key={option.name}
                                                onClick={() => handleOptionChange(option.name)}
                                                className={`px-4 py-2 rounded-full border-2 ${selectedOption === option.name
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-transparent text-white border-gray-300'
                                                    } hover:bg-blue-400 hover:text-white`}
                                            >
                                                {option.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="mt-6 flex justify-evenly space-x-4">
                                <Button
                                    className="inline-flex rounded-md bg-gray-400 py-1.5 px-3 font-bold hover:cursor-pointer hover:bg-gray-300 hover:text-gray-900 hover:text-black"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 font-bold py-1.5 px-3 hover:cursor-pointer hover:bg-gray-600 hover:text-gray-900 hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={submitFocus}
                                    disabled={!selectedCategory || !selectedOption}
                                >
                                    Create
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default NewFocusDialog;