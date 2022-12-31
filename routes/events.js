/**
 * Routes for events
 * Ruta: /api/events
 * host + /api/events
 */
const {Router} = require("express");
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/eventsController");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

// * Every route has to go through the JWT validation
// Get events
router.get('/', validateJWT, getEvents);

// Create a new event
router.post("/", validateJWT, createEvent);

// Update an event
router.put("/:id", validateJWT, updateEvent);

// Delete an event
router.delete("/:id", validateJWT, deleteEvent);

module.exports = router;