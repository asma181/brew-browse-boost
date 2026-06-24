import { useEffect, useState, useCallback, useRef } from "react";
import { getReviews, addReview } from "@/api/reviews";
import { toast } from "sonner";

export interface DBReview {
  id: string;
  product_id: string;
  session_id: string;
  rating: number;
  comment: string | null;
  name: string | null;
  lang: string;
  created_at: string;
}

export function useReviews(productId: string) {
  const [reviews, setReviews] = useState<DBReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getReviews(productId);
      setReviews(data);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to load reviews";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const submitNewReview = async ({
    rating,
    comment,
    name,
    lang,
  }: {
    rating: number;
    comment?: string;
    name?: string;
    lang?: string;
  }) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const newReview = await addReview({
        productId,
        rating,
        comment,
        name,
        lang,
      });

      if (newReview) {
        setReviews((prev) => [newReview, ...prev]);
        return newReview;
      }
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to submit review";
      toast.error(errMsg);
      throw err;
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    submitting,
    refetch: fetchReviews,
    submitNewReview,
  };
}
