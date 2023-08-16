const router = require("express").Router();

// controller
const Invitations = require("../controller/invitationsController");

// middleware
// const Uploader = require("../middlewares/uploaders");
const Authentication = require("../middlewares/authenticate");

// API
router.get(
  "/byFamilyName",
  Authentication,
  Invitations.getInvitationsByFamilyName
);

router.post(
  "/create-invitations",
  Authentication,
  Invitations.createInvitations
);
router.get("/:id", Invitations.getInvitationsById);
router.get("/", Authentication, Invitations.getAllInvitations);
router.put("/:id", Authentication, Invitations.updateInvitations);
router.delete("/:id", Authentication, Invitations.deleteInvitations);

// router.get("/search/:depart/:arrive", flightController.getFlightByAirport);

module.exports = router;
