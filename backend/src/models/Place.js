const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    address: { type: String },
    photo: { type: [String] },
    description: { type: String },
    perks: { type: [String] },
    extraInfo: { type: String },
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
  },
  { timestamps: true }
);

const PlaceModel = mongoose.model("Place", placeSchema);
module.exports = PlaceModel;
