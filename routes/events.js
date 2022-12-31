/**
 * Routes for events
 * Ruta: /api/events
 * host + /api/events
 */
const { Router } = require("express");
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventsController");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

// * Every route has to go through the JWT validation
router.use(validateJWT);
// Get events
router.get("/", getEvents);

// Create a new event
router.post("/", createEvent);

// Update an event
router.put("/:id", updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

module.exports = router;