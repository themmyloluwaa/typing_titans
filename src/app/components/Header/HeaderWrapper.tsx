import { createClient } from "@/utils/supabase/server";
import Header from "./Header";

const HeaderWrapper = async () => {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    const isSignedIn = !!session

    return <Header  />
}

export default HeaderWrapper;