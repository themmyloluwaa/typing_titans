import React from 'react';
import Image from 'next/image';
import HeaderWrapper from '@/app/components/Header/HeaderWrapper';
import LeaderBoard from '@/app/components/LeaderBoard';

const LeaderboardPage = () => {
    // Mock data for the leaderboard
    const leaderboardData = [
        { rank: 1, username: 'SpeedDemon', wpm: 150, accuracy: 99.5, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "US", matchesPlayed: 120 },
        { rank: 2, username: 'KeyboardWarrior', wpm: 145, accuracy: 98.7, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "CA", matchesPlayed: 115 },
        { rank: 3, username: 'TypingNinja', wpm: 140, accuracy: 99.2, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "JP", matchesPlayed: 110 },
        { rank: 4, username: 'WordWizard', wpm: 138, accuracy: 97.8, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "GB", matchesPlayed: 105 },
        { rank: 5, username: 'LightningFingers', wpm: 135, accuracy: 98.5, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "AU", matchesPlayed: 100 },
    ];

    const getFlagUrl = (countryCode: string) => {
        return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
    };

    return (
        <div className="min-h-screen bg-white">
            <HeaderWrapper />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Global Leaderboard</h1>
            <LeaderBoard leaderboardData={leaderboardData} />
            </main>
        </div>
    );
};

export default LeaderboardPage;
