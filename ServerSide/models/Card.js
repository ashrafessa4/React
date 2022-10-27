const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  card_id: {
    type: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  business_name: {
    type: String,
    required: true,
    minlength: 2,
  },
  business_desc: {
    type: String,
    required: true,
    minlength: 2,
  },
  business_address: {
    type: String,
    required: true,
    minlength: 2,
  },
  business_phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10,
  },
  business_image: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("cards", cardSchema);
module.exports = { Card };
