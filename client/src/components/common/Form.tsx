import React from 'react';

const Form = ({
    title,
    onSubmit,
    children,
    className = ''
}) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className={`max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg ${className}`}>
                {title && (
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {title}
                        </h2>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
};

export default Form; 