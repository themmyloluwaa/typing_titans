import { createClient } from "@/utils/supabase/server";
import SignInButton from "../SignInButton";
const Header = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const isSignedIn = !!session

    return (<header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Typing Titans</h1>
       {!isSignedIn && <SignInButton isSignedIn={isSignedIn} /> }
    </header>
    )
}

export default Header;