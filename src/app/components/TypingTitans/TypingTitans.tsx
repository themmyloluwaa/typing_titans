import React from 'react';
import Image from 'next/image';
import Header from '@/app/components/Header';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

const TypingTitans = () => {
    // Mock data for the leaderboard
    const leaderboardData = [
        { rank: 1, username: 'SpeedDemon', wpm: 150, accuracy: 99.5, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "US", matchesPlayed: 120 },
        { rank: 2, username: 'KeyboardWarrior', wpm: 145, accuracy: 98.7, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "CA", matchesPlayed: 115 },
        { rank: 3, username: 'TypingNinja', wpm: 140, accuracy: 99.2, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "JP", matchesPlayed: 110 },
        { rank: 4, username: 'WordWizard', wpm: 138, accuracy: 97.8, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "GB", matchesPlayed: 105 },
        { rank: 5, username: 'LightningFingers', wpm: 135, accuracy: 98.5, avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", countryCode: "AU", matchesPlayed: 100 },
    ];

  
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full space-y-6">
                <Header />
                <div className="p-4">
                    <div className="p-6 flex flex-col items-center space-y-4">
                        <Image
                            src="titan_bird.svg"
                            alt="Typing Titans Logo"
                            width={500}
                            height={500}
                            priority
                        />
                        <h2 className="text-2xl font-semibold">Rise from the ashes</h2>
                        <p className="text-gray-600 text-center">
                            Ready to challenge your typing skills? Sign in with Google to get started.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Sign in with Google
                        </button>
                    </div>
                </div>
                <LeaderBoard leaderboardData={leaderboardData} />
            </div>
        </div>
    );
};

export default TypingTitans;