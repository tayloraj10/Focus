import React from 'react';
import { Focus } from '../slices/focusSlice';

interface FocusCardProps {
    focus: Focus
}

const FocusCard: React.FC<FocusCardProps> = ({ focus }) => {
    return (
        <div className="focus-card border border-gray-300 rounded-lg p-6 shadow-md">
            <h2 className="focus-card-title text-xl font-semibold mb-2">{focus.name}</h2>
            <p className="focus-card-description text-gray-700">{focus.category}</p>
        </div>
    );
};

export default FocusCard;