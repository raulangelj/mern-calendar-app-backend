const { response } = require("express");
const EventModel = require("../models/EventModel");

/**
 * Get events
 */
const getEvents = async (req, res = response) => {
  console.log(req.body);
  res.json({
    success: true,
    msg: "getEvents",
  });
};

/**
 * Create a new event
 */
const createEvent = async (req, res = response) => {
  const event = EventModel(req.body);
  try {
    event.user = req.uid;
    const eventDB = await event.save();

    res.json({
      success: true,
      event: eventDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Please contact the admin",
    });
  }
};

/**
 * Update an event
 */
const updateEvent = async (req, res = response) => {
  res.json({
    success: true,
    msg: "updateEvent",
  });
};

/**
 * Delete an event
 */
const deleteEvent = async (req, res = response) => {
  res.json({
    success: true,
    msg: "deleteEvent",
  });
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
