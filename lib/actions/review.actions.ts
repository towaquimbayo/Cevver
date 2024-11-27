"use server";

import Review from "../database/models/review.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
type AddReviewParams = {
  rating: number;
  review: string;
  reviewerId: string;
  vendorId: string;
}
export async function addReview(review: AddReviewParams) {
  try {
    await connectToDatabase();

    const newReview = await Review.create(review);

    return JSON.parse(JSON.stringify(newReview));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getReviewsByVendor(vendorId: string) {
  try {
    await connectToDatabase();

    const reviews = await Review.find({ vendorId });

    if (!reviews) throw new Error("Reviews not found");

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    handleError(error);
  }
}