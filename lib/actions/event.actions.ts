"use server";

import Event from "../database/models/event.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// CREATE
type CreateEventParams = {
  title: string;
  description: string;
  date: Date;
  location: string;
  budget: number;
  organizerId: string;
}
export async function createEvent(event: CreateEventParams) {
  try {
    await connectToDatabase();

    const newEvent = await Event.create(event);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

// READ
export async function getEventById(id: string) {
  try {
    await connectToDatabase();

    const event = await Event.findOne({ _id: id });

    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

export async function getEventsByUser(userId: string) {
  try {
    await connectToDatabase();

    const events = await Event.find({ organizerId: userId });

    if (!events) throw new Error("Events not found");

    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
type UpdateEventParams = {
  title: string;
  description: string;
  date: Date;
  location: string;
  budget: number;
}
export async function updateEvent(id: string, event: UpdateEventParams) {
  try {
    await connectToDatabase();

    const updatedEvent = await Event.findOneAndUpdate({ _id: id}, event, { 
      new: true 
    });

    if (!updatedEvent) throw new Error("Event update failed");

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteEvent(id: string) {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findOneAndDelete({ _id: id });

    if (!deletedEvent) throw new Error("Event delete failed");

    return JSON.parse(JSON.stringify(deletedEvent));
  } catch (error) {
    handleError(error);
  }
}