import { Schema, model, models } from 'mongoose';
import Event from './event.model';

const BookingSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    slug: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          // RFC 5322 compliant email validation regex
          const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);


// Create model
const Booking = models.Booking || model('Booking', BookingSchema);

export default Booking;
