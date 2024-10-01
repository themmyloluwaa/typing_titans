import React from 'react';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="relative w-full h-24 bg-gray-200 rounded-lg mb-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
                    {[0, 25, 50, 75, 100].map((milestone) => (
                        <div key={milestone} className="flex flex-col items-center">
                            <div className="w-1 h-6 bg-white opacity-50" />
                            <span className="text-xs mt-1 text-gray-600">{milestone}%</span>
                        </div>
                    ))}
                </div>
            </div>
            <div 
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
                style={{ left: `${progress}%` }}
            >
                <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm">
                        {Math.round(progress)}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
