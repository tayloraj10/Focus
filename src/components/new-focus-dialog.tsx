import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { supabaseConnection } from '../supabase/supabaseClient';


const NewFocusDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const user = useSelector((state: RootState) => state.user.user);
    const focusData = useSelector((state: RootState) => {
        // console.log("focusData initialized:", state.controls.options);
        return state.controls.options;
    });
    const typeData = useSelector((state: RootState) => {
        return state.controls.types;
    });
    const durationData = useSelector((state: RootState) => {
        return state.controls.durations;
    })

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<string>('');

    React.useEffect(() => {
        if (open) {
            setSelectedCategory('');
            setSelectedOption('');
            setSelectedType('');
            setSelectedDuration('');
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

    const handleTypeChange = (type: string) => {
        if (type === selectedType) {
            setSelectedType('');
        }
        else setSelectedType(type);
    }

    const handleDurationChange = (duration: string) => {
        if (duration === selectedDuration) {
            setSelectedDuration('');
        }
        else setSelectedDuration(duration);
    }

    const lookupFocus = (category: string, option: string) => {
        const focus = focusData.find((focus) => focus.category === category && focus.name === option);
        return focus || null;
    }

    const lookupType = (typeName: string) => {
        const focusType = typeData.find((type) => type.type === typeName);
        return focusType || null;
    }

    const lookupDuration = (durationName: string) => {
        const focusDuration = durationData.find((duration) => duration.duration === durationName);
        return focusDuration || null;
    }

    const submitFocus = async () => {
        const focus = lookupFocus(selectedCategory, selectedOption);
        const type = lookupType(selectedType);
        const duration = lookupDuration(selectedDuration);
        const { error } = await supabaseConnection
            .from('focuses')
            .insert({
                created_at: new Date(),
                created_by: user?.uid,
                name: focus?.name,
                type: type.id!,
                duration: duration.id!,
                category: focus?.category
            });

        if (error) {
            console.error('Error inserting focus:', error);
        } else {
            onClose();
        }
    };



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
                                <label htmlFor="dropdown1" className="block mb-2 font-bold text-white/80">What kind of focus?</label>
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
                                    <label htmlFor="dropdown1" className="block mb-2 font-bold text-white/80">Which one of these?</label>
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
                            {selectedOption && (
                                <div className="mb-4 text-center">
                                    <label htmlFor="dropdown1" className="block mb-2 font-bold text-white/80">How do you want to track your improvement?</label>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {typeData.map((type) => (
                                            <button
                                                key={type.type}
                                                onClick={() => handleTypeChange(type.type)}
                                                className={`px-4 py-2 rounded-full border-2 ${selectedType === type.type
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-transparent text-white border-gray-300'
                                                    } hover:bg-blue-400 hover:text-white`}
                                            >
                                                {type.type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {selectedType && (
                                <div className="mb-4 text-center">
                                    <label htmlFor="dropdown1" className="block mb-2 font-bold text-white/80">How often do you want to track this?</label>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {durationData.map((duration) => (
                                            <button
                                                key={duration.duration}
                                                onClick={() => handleDurationChange(duration.duration)}
                                                className={`px-4 py-2 rounded-full border-2 ${selectedDuration === duration.duration
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-transparent text-white border-gray-300'
                                                    } hover:bg-blue-400 hover:text-white`}
                                            >
                                                {duration.duration}
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
                                    disabled={!selectedCategory || !selectedOption || !selectedType || !selectedDuration}
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