import React from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';

function Welcome() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Welcome to TaskFlow
                    </h1>
                    <p className="mt-5 text-xl text-gray-500">
                        Your personal task management solution
                    </p>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="space-y-2">
                        <Link to="/signup" className="w-full">
                            <Button fullWidth>
                                Create Account
                            </Button>
                        </Link>
                    </div>

                    <div className="space-y-2">
                        <Link to="/signin" className="w-full">
                            <Button fullWidth className="text-indigo-600 border border-indigo-600 hover:bg-indigo-50">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome; 