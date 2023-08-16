const { invitations, foryous, stories, wishes, banks } = require("../models");

const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { Op } = require("sequelize");
const imagekit = require("../lib/imageKits");

async function createInvitations(req, res) {
  try {
    const {
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      user_id,
    } = req.body;
    const newInvitations = await invitations.create({
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      user_id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newInvitations,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getInvitationsById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const data = await invitations.findByPk(id, {
      include: [
        {
          model: foryous,
        },
        {
          model: stories,
        },
        {
          model: wishes,
        },
        {
          model: banks,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

const getAllInvitations = catchAsync(async (req, res) => {
  try {
    const invitationsData = await invitations.findAll({
      include: [
        {
          model: foryous,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        invitations: invitationsData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
});

// update airline
const updateInvitations = catchAsync(async (req, res) => {
  const {
    familyName,
    familyName2,
    groomDad,
    groomMom,
    brideDad,
    brideMom,
    groom,
    bride,
    day,
    date,
    address,
    time,
    place,
    linkMap,
    quotes,
    quoter,
    groomSosmed1,
    groomSosmed2,
    groomSosmed3,
    brideSosmed1,
    brideSosmed2,
    brideSosmed3,
    user_id,
  } = req.body;
  const id = req.params.id;

  const Invitation = await invitations.findByPk(id);

  if (!Invitation) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Invitation with this id ${id} is not found`
    );
  }

  await invitations.update(
    {
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      user_id,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    status: "Success",
    data: {
      familyName,
      familyName2,
      groomDad,
      groomMom,
      brideDad,
      brideMom,
      groom,
      bride,
      day,
      date,
      address,
      time,
      place,
      linkMap,
      quotes,
      quoter,
      groomSosmed1,
      groomSosmed2,
      groomSosmed3,
      brideSosmed1,
      brideSosmed2,
      brideSosmed3,
      user_id,
    },
  });
});

const deleteInvitations = catchAsync(async (req, res) => {
  const id = req.params.id;

  // Dapatkan data Invitation berdasarkan ID
  const invitation = await invitations.findByPk(id, {
    include: [
      {
        model: foryous,
      },
    ],
  });

  if (!invitation) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Invitation with id ${id} is not found`
    );
  }

  // Hapus data terkait dari foryous jika ada
  if (invitation.foryous) {
    for (const foryou of invitation.foryous) {
      await foryou.destroy();
    }
  }

  // Hapus Invitation dan data terkait dari foryous
  await invitation.destroy();

  res.status(200).json({
    status: "Success",
    message: `Invitation with id ${id} and related foryous data were successfully deleted`,
  });
});

async function getInvitationsByFamilyName(req, res) {
  try {
    const { familyName } = req.query;
    const invitationsData = await invitations.findAll({
      where: {
        familyName: {
          [Op.like]: `%${familyName}%`,
        },
      },
      include: [
        {
          model: foryous,
        },
      ],
    });

    res.status(200).json({
      status: "success",
      data: {
        invitations: invitationsData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
}

module.exports = {
  createInvitations,
  getInvitationsById,
  getAllInvitations,
  updateInvitations,
  deleteInvitations,
  getInvitationsByFamilyName,

  //   getFlightByAirport,

  //   getFlightByAirport,
};
