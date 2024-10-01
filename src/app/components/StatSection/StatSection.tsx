import React from 'react';

interface StatSectionProps {
    bestWPM: number;
    averageAccuracy: number;
    matchesPlayed: number;
}

const StatSection: React.FC<StatSectionProps> = ({ bestWPM, averageAccuracy, matchesPlayed }) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-blue-800">{bestWPM}</p>
                    <p className="text-blue-600">Best WPM</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-green-800">{averageAccuracy}%</p>
                    <p className="text-green-600">Average Accuracy</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                    <p className="text-3xl font-bold text-purple-800">{matchesPlayed}</p>
                    <p className="text-purple-600">Matches Played</p>
                </div>
            </div>
        </section>
    );
};

export default StatSection;
