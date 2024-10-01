'use client'

import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import SignInButton from "../SignInButton";
import Link from 'next/link';
import LogoutButton from "../LogoutButton";

const Header = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsSignedIn(!!session);
        };

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setIsSignedIn(!!session);
        });

        checkSession();

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [supabase]);

    return (
        <header className="p-4 w-full border-b border-gray-200">
            <div className="flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold hover:text-gray-700 transition duration-300">
                    Typing Titans
                </Link>
                {isSignedIn && (
                    <>
                        <nav className="hidden md:block">
                            <ul className="flex space-x-4">
                                <li><Link href="/practice" className="hover:underline">Practice</Link></li>
                                <li><Link href="/compete" className="hover:underline">Compete</Link></li>
                                <li><Link href="/leaderboard" className="hover:underline">Leaderboard</Link></li>
                                <li><Link href="/profile" className="hover:underline">Profile</Link></li>
                                <li><LogoutButton /></li>
                            </ul>
                        </nav>
                        <button 
                            className="md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </>
                )}
                {!isSignedIn && (
                    <SignInButton isSignedIn={isSignedIn} />
                )}
            </div>
            {isSignedIn && (
                <nav className="md:hidden w-full">
                    <ul className={`${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
                        <li className="border-b"><Link href="/practice" className="block py-2 px-4 text-center hover:underline">Practice</Link></li>
                        <li className="border-b"><Link href="/compete" className="block py-2 px-4 text-center hover:underline">Compete</Link></li>
                        <li className="border-b"><Link href="/leaderboard" className="block py-2 px-4 text-center hover:underline">Leaderboard</Link></li>
                        <li className="border-b"><Link href="/profile" className="block py-2 px-4 text-center hover:underline">Profile</Link></li>
                        <li className="text-center py-2"><LogoutButton /></li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header;