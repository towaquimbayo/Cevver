"use server";

import Booking from "../database/models/booking.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
type CreateBookingParams = {
  organizerId: string;
  vendorId: string;
  createdAt?: Date;
};
export async function createBooking(booking: CreateBookingParams) {
  try {
    await connectToDatabase();

    const newBooking = await Booking.create(booking);

    return JSON.parse(JSON.stringify(newBooking));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getBookingById(id: string) {
  try {
    await connectToDatabase();

    const booking = await Booking.findOne({ _id: id });

    if (!booking) throw new Error("Booking not found");

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteBooking(id: string) {
  try {
    await connectToDatabase();

    const bookingToDelete = await Booking.findOne({ _id: id });

    if (!bookingToDelete) throw new Error("Booking not found");

    const deletedBooking = await Booking.findByIdAndDelete(bookingToDelete._id);

    return deletedBooking ? JSON.parse(JSON.stringify(deletedBooking)) : null;
  } catch (error) {
    handleError(error);
  }
}