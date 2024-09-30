'use client'

import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.replace('/')
    }

    return (
        <button 
            onClick={handleLogout}
            className="hover:underline"
        >
            Logout
        </button>
    )
}

export default LogoutButton;