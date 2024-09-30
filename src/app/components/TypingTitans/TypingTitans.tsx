import React from 'react';
import Image from 'next/image';
import Header from '@/app/components/Header';
import LeaderBoard from '../LeaderBoard/LeaderBoard';

const TypingTitans = () => {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-3xl space-y-6">
                <Header />
                <div className="">
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
                <LeaderBoard />
            </div>
        </div>
    );
};

export default TypingTitans;