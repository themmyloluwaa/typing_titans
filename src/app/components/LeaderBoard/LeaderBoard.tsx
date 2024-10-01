import React from 'react';
import Image from 'next/image';

interface LeaderboardUser {
    rank: number;
    username: string;
    wpm: number;
    accuracy: number;
    avatar: string;
    countryCode: string;
    matchesPlayed: number;
}

interface LeaderBoardProps {
    leaderboardData?: LeaderboardUser[];
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ leaderboardData = [] }) => {
    const getFlagUrl = (countryCode: string) => {
        return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Rank</th>
                                <th className="py-3 px-6 text-left">User</th>
                                <th className="py-3 px-4 text-center">Country</th>
                                <th className="py-3 px-6 text-center">WPM</th>
                                <th className="py-3 px-6 text-center">Accuracy</th>
                                <th className="py-3 px-6 text-center">Matches Played</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {leaderboardData.map((user) => (
                                <tr key={user.rank} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <span className="font-medium">{user.rank}</span>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <div className="mr-2 w-8 h-8 relative">
                                                <Image
                                                    src={user.avatar}
                                                    alt={`${user.username}'s avatar`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <span>{user.username}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <Image
                                                src={getFlagUrl(user.countryCode)}
                                                alt={`Flag of ${user.countryCode}`}
                                                width={20}
                                                height={15}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
                                            {user.wpm}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                                            {user.accuracy}%
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                            {user.matchesPlayed}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
    );
};

export default LeaderBoard;