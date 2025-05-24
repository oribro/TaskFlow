import React from 'react';

type ButtonType = 'button' | 'submit' | 'reset';

const Button = ({
    type = 'button' as ButtonType,
    children,
    onClick,
    className = '',
    fullWidth = false
}: {
    type?: ButtonType;
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    fullWidth?: boolean;
}) => {
    const baseClasses = "group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200";
    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseClasses} ${widthClass} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button; 