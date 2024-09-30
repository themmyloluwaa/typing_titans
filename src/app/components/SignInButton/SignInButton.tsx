'use client'

import { createClient } from "@/utils/supabase/client";

const SignInButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
    const supabase = createClient()

    const handleSignIn = () => {
        supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    if (isSignedIn) {
        return null; // or return a sign out button
    }

    return (
        <button 
            onClick={handleSignIn}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            Sign in
        </button>
    )
}

export default SignInButton;