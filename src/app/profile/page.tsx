import { createClient } from "@/utils/supabase/server";
import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import StatSection from "@/app/components/StatSection";
import Matches from "@/app/components/Matches";

export default async function ProfilePage() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return <div>Please sign in to view your profile.</div>;
    }

    // Fetch user data and recent matches here
    // For now, we'll use placeholder data
    const userData = {
        name: "John Doe",
        avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", // Using the provided URL
    };

    const firstName = userData.name.split(' ')[0];

    const recentMatches = [
        { opponent: "Jane Smith", opponentAvatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", date: "2023-05-15", wpm: 85, accuracy: 97, outcome: "Win", globalRanking: 120 },
        { opponent: "Mike Johnson", opponentAvatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", date: "2023-05-14", wpm: 78, accuracy: 95, outcome: "Lose", globalRanking: 89 },
        { opponent: "Sarah Brown", opponentAvatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg", date: "2023-05-13", wpm: 92, accuracy: 98, outcome: "Win", globalRanking: 156 },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        <Image
                            src={userData.avatar}
                            alt={userData.name}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full rounded-full"
                            quality={100}
                            priority
                            unoptimized
                        />
                    </div>
                    <h1 className="text-3xl font-bold">Welcome back {firstName}</h1>
                    <p className="text-gray-600 mt-2">{session.user.email}</p>
                </div>

                <StatSection bestWPM={120} averageAccuracy={98} matchesPlayed={100} />

                <div className="flex justify-center space-x-4 mb-8">
                    <Link href="/practice" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Play Now
                    </Link>
                    <button className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300">
                        Challenge a Friend
                    </button>
                </div>

                <Matches recentMatches={recentMatches} />
            </main>
        </div>
    );
}
