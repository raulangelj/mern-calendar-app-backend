const { response } = require("express");

/**
 * Get events
 */
const getEvents = async (req, res = response) => {
  res.json({
    success: true,
    msg: "getEvents",
  });
};

/**
 * Create a new event
 */
const createEvent = async (req, res = response) => {
  res.json({
    success: true,
    msg: "createEvent",
  });
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
