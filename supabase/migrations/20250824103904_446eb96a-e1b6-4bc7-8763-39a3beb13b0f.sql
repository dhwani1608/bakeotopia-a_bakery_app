-- Fix critical security vulnerability: Remove public access to profiles table
-- and restrict access to profile owners only

-- Drop the existing public SELECT policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that only allows users to view their own profiles
CREATE POLICY "Users can only view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Ensure the profiles table has RLS enabled (should already be enabled)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;