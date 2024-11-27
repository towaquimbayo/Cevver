'use client';

import { addReview, getReviewsByVendor } from "@/lib/actions/review.actions";
import { IReview } from "@/lib/database/models/review.model";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const Reviews = ({ vendorId }: {
  vendorId: string;
}) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, review: '' });

  useEffect(() => {
    const fetchReviews = async () => {
      const fetchedReviews = await getReviewsByVendor(vendorId);
      setReviews(fetchedReviews);
    };
    fetchReviews();
  }, [vendorId]);

  const handleSubmitReview = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (user) {
      const addedReview = await addReview({
        ...newReview,
        reviewerId: userId,
        vendorId,
      });
      setReviews([...reviews, addedReview]);
      setNewReview({ rating: 5, review: '' });
    }
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id as string} className="mb-4 p-4 border rounded">
          <div className="flex items-center mb-2">
            {renderStars(review.rating)}
          </div>
          <p>{review.review}</p>
        </div>
      ))}
      {user && (
        <form onSubmit={handleSubmitReview} className="mt-4">
          <div className="flex items-center mb-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                className={`w-8 h-8 cursor-pointer ${
                  num <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setNewReview({ ...newReview, rating: num })}
              />
            ))}
          </div>
          <textarea
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Write your review..."
          />
          <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default Reviews;