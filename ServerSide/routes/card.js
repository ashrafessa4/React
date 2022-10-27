// Packages & Models Import
const express = require("express");
const joi = require("joi");
const { Card } = require("../models/Card");
const { User } = require("../models/User");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middlewares/auth");

// Card Joi Validation Schema
const cardSchema = joi.object({
  business_name: joi.string().required().min(2),
  business_desc: joi.string().required().min(2),
  business_address: joi.string().required().min(2),
  business_phone: joi
    .string()
    .required()
    .min(9)
    .max(12)
    .regex(/^0[2-9]\d{7,8}$/),
  business_image: joi.string().required(),
});

// Random Card ID
const randomCardId = async () => {
  while (true) {
    let randomNum = _.random(1000, 999999);
    let card = await Card.findOne({ card_id: randomNum });
    if (!card) return randomNum;
  }
};

// Post Card in DB
router.post("/", auth, async (req, res) => {
  try {
    // Joi Validation
    const { error } = cardSchema.validate(req.body);
    if (error) return res(400).send(error.message);

    // Adding CardID + User_id
    let card = new Card(req.body);
    card.card_id = await randomCardId();
    card.user_id = req.payload._id;

    // Saving card in DB
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send("Error in adding card");
  }
});

// Find Cards of Specific User
router.get("/my-cards", auth, async (req, res) => {
  try {
    const myCards = await Card.find({ user_id: req.payload._id });
    res.status(200).send(myCards);
  } catch (error) {
    res.status(400).send("Error in find Cards");
  }
});

// Get Specific card of Specific User
router.get("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findOne({
      _id: req.params.id,
      user_id: req.payload._id,
    });
    if (!card) return res.status(404).send("Card Was Not Found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Edit Card by ID
router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send(error.message);

    let card = await Card.findOneAndUpdate(
      { _id: req.params.id, user_id: req.payload._id },
      req.body,
      { new: true }
    );
    if (!card) return res.status(404).send("Card was not found");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send("Error in edit card");
  }
});

// Delete Card by Id
router.delete("/:id", auth, async (req, res) => {
  try {
    const card = await Card.findOneAndRemove({
      _id: req.params.id,
      user_id: req.payload._id,
    });
    if (!card) return res.status(404).send("Card was not found");
    res.status(200).send("Card was Removed");
  } catch (error) {
    res.status(400).send("Error in delete card");
  }
});

// Find All Cards in DB
router.get("/", auth, async (req, res) => {
  try {
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send("Error in get Cards");
  }
});

module.exports = router;
