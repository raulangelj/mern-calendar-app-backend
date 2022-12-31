const { response } = require("express");
const EventModel = require("../models/EventModel");

/**
 * Get events
 */
const getEvents = async (req, res = response) => {
  const events = await EventModel.find().populate("user", "name");

  res.json({
    success: true,
    events,
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
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        msg: "Event not found with that ID",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        success: false,
        msg: "You do not have permission to edit this event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      success: true,
      event: eventUpdated,
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
 * Delete an event
 */
const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        msg: "Event not found with that ID",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        success: false,
        msg: "You do not have permission to delte this event",
      });
    }

    await EventModel.findByIdAndDelete(eventId);

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Please contact the admin",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
