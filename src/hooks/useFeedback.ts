import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Feedback {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  product?: string;
  created_at: string;
  updated_at: string;
}

export interface FeedbackForm {
  name: string;
  email: string;
  rating: number;
  comment: string;
  product?: string;
}

export const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6); // Limit to 6 most recent reviews

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      toast({
        title: "Error",
        description: "Failed to load reviews",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitFeedback = async (feedbackData: FeedbackForm) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('feedback')
        .insert([{
          name: feedbackData.name,
          email: feedbackData.email || null,
          rating: feedbackData.rating,
          comment: feedbackData.comment,
          product: feedbackData.product || null
        }]);

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });

      // Refresh the feedbacks list
      await fetchFeedbacks();

      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return {
    feedbacks,
    isLoading,
    isSubmitting,
    submitFeedback,
    fetchFeedbacks
  };
};