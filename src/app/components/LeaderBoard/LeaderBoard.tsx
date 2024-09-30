const LeaderBoard = () => {
    const leaderboardData = [
        { name: 'John', bestWPM: 120, matchesPlayed: 50, avatar: '/api/placeholder/32/32' },
        { name: 'Jane', bestWPM: 115, matchesPlayed: 48, avatar: '/api/placeholder/32/32' },
        { name: 'Alex', bestWPM: 110, matchesPlayed: 45, avatar: '/api/placeholder/32/32' },
        { name: 'Emma', bestWPM: 105, matchesPlayed: 42, avatar: '/api/placeholder/32/32' },
        { name: 'Ryan', bestWPM: 100, matchesPlayed: 40, avatar: '/api/placeholder/32/32' },
      ];
    return (
        <div>
                 <div className="shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best WPM</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matches Played</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leaderboardData.map((user, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.bestWPM}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.matchesPlayed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
    )
}

export default LeaderBoard;