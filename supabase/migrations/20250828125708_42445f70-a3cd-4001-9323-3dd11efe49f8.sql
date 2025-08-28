-- Create feedback/reviews table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  product TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read feedback (for displaying testimonials)
CREATE POLICY "Feedback is viewable by everyone" 
ON public.feedback 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert feedback
CREATE POLICY "Anyone can create feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_feedback_updated_at
BEFORE UPDATE ON public.feedback
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();