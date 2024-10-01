import React from 'react';

interface CarProgressProps {
    progress: number;
}

const CarProgress: React.FC<CarProgressProps> = ({ progress }) => {
    return (
        <div className="relative w-full h-24 bg-gradient-to-r from-gray-300 to-gray-100 rounded-lg mb-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="w-full h-6 flex justify-between px-2">
                        {[0, 25, 50, 75, 100].map((milestone) => (
                            <div key={milestone} className="w-1 h-full bg-white opacity-50" />
                        ))}
                    </div>
                </div>
            </div>
            <div 
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out"
                style={{ left: `${progress}%` }}
            >
                <div className="relative w-20 h-20">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                        <path fill="#FF4136" d="M21,10c0,0-6.667-3-9-3s-9,3-9,3v2c0,0,6.667,3,9,3s9-3,9-3V10z"/>
                        <circle fill="#0074D9" cx="12" cy="12" r="3"/>
                        <path fill="#FF851B" d="M3,11v2c0,0,3,1.5,4.5,1.5S12,13,12,13v-2c0,0-3,1.5-4.5,1.5S3,11,3,11z"/>
                        <path fill="#FF851B" d="M21,11v2c0,0-3,1.5-4.5,1.5S12,13,12,13v-2c0,0,3,1.5,4.5,1.5S21,11,21,11z"/>
                    </svg>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm">
                        {Math.round(progress)}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarProgress;
