-- Handle user sign-in
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, username, avatar_url, created_at)
    VALUES (
        NEW.id, NEW.email, 
        new.raw_user_meta_data ->> 'full_name', 
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data ->> 'avatar_url',
        NOW()
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        username = COALESCE(profiles.username, EXCLUDED.username),
        avatar_url = COALESCE(profiles.avatar_url, EXCLUDED.avatar_url),
        last_login = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Drop the existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the new trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Handle user deletion
CREATE OR REPLACE FUNCTION public.handle_user_deletion()
RETURNS TRIGGER AS $$
BEGIN
    -- Delete the corresponding entry from the users table
    DELETE FROM public.profiles WHERE id = OLD.id;
    
    -- You might want to add more deletion logic here for related tables
    -- For example:
    -- DELETE FROM public.user_stats WHERE user_id = OLD.id;
    -- DELETE FROM public.practice_sessions WHERE user_id = OLD.id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Drop the existing trigger
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_deleted
AFTER DELETE ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_user_deletion();
