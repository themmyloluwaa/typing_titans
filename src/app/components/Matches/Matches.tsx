import React from 'react';
import Image from 'next/image';

interface Match {
    opponent: string;
    opponentAvatar: string;
    date: string;
    wpm: number;
    accuracy: number;
    outcome: string;
    globalRanking: number;
}

interface MatchesProps {
    recentMatches: Match[];
}

const Matches: React.FC<MatchesProps> = ({ recentMatches }) => {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Matches</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Opponent</th>
                            <th className="p-3 border">Global Ranking</th>
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">WPM</th>
                            <th className="p-3 border">Accuracy</th>
                            <th className="p-3 border">Outcome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentMatches.map((match, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="p-3 border">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                            <Image
                                                src={match.opponentAvatar}
                                                alt={match.opponent}
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        {match.opponent}
                                    </div>
                                </td>
                                <td className="p-3 border">{match.globalRanking}</td>
                                <td className="p-3 border">{match.date}</td>
                                <td className="p-3 border">{match.wpm}</td>
                                <td className="p-3 border">{match.accuracy}%</td>
                                <td className="p-3 border">
                                    <span className={`px-2 py-1 rounded ${match.outcome === 'Win' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                        {match.outcome}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Matches;
