import React from 'react';
import Link from 'next/link';

interface ResultsDisplayProps {
    results: {
        wpm: number;
        accuracy: number;
        time: number;
    };
    onTryAgain: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onTryAgain }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
                <h2 className="text-2xl font-bold text-center mb-4">Your Results</h2>
                <div className="mb-4">
                    <p className="text-lg"><strong>WPM:</strong> {results.wpm}</p>
                    <p className="text-lg"><strong>Accuracy:</strong> {results.accuracy}%</p>
                    <p className="text-lg"><strong>Time:</strong> {results.time.toFixed(2)} seconds</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <button onClick={onTryAgain} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Try Again
                    </button>
                    <Link href="/profile" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResultsDisplay;
