'use server';

import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug }).lean();
    if (!event) return [];

    // Get all events except the current one
    const otherEvents = await Event.find({ _id: { $ne: event._id } }).lean();

    // Shuffle and pick 4
    const shuffled = otherEvents.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);

  } catch (e) {
    console.error('Error fetching similar events', e);
    return [];
  }
};
