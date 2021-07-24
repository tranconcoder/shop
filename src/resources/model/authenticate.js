import { Timestamp } from "bson";
import { Schema } from "mongoose";

const generalTime = new Date(Date.now());
generalTime.toLocaleTimeString("ICT");

const authenticate = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 10,
  },
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 24,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 24,
  },
  hasAvatar: {
    type: Boolean,
    default: false,
    required: true,
    enum: [true, false],
  },
  address: {
    type: String,
    required: true,
  },
  registerAt: {
    type: String,
    default: generalTime,
  },
  lastLoginAt: {
    type: String,
    default: generalTime,
  },
  lastChangeProfile: {
    // prev profile
    changedAt: {
      type: String,
      default: generalTime,
    },
  },
});
