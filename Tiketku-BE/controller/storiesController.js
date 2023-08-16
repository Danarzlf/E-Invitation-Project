const { stories } = require("../models");

const catchAsync = require("../utils/catchAsync");
const moment = require("moment");
const { Op } = require("sequelize");

async function createStories(req, res) {
  try {
    const { year, description, invitation_id } = req.body;
    const newStories = await stories.create({
      year,
      description,
      invitation_id,
    });
    res.status(201).json({
      status: "success",
      data: {
        newStories,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getStoriesById(req, res) {
  try {
    // Primary Key = PK
    const id = req.params.id;
    const data = await stories.findByPk(id);

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

// const getAllForYous = catchAsync(async (req, res) => {
//   const foryousData = await foryous.findAll();
//   res.status(200).json({
//     status: "success",
//     data: {
//       foryous: foryousData,
//     },
//   });
// });

// const updateForYous = catchAsync(async (req, res) => {
//   const { name, invitation_id } = req.body;
//   const id = req.params.id;

//   const ForYou = await foryous.findByPk(id);

//   if (!ForYou) {
//     throw new ApiError(
//       httpStatus.NOT_FOUND,
//       `ForYou with this id ${id} is not found`
//     );
//   }

//   await foryous.update(
//     {
//       name,
//       invitation_id,
//     },
//     {
//       where: {
//         id,
//       },
//     }
//   );
//   res.status(200).json({
//     status: "Success",
//     data: {
//       name,
//       invitation_id,
//     },
//   });
// });

const deleteStories = catchAsync(async (req, res) => {
  const id = req.params.id;

  const Stories = stories.findByPk(id);

  if (!Stories) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Stories with id ${id} is not found`
    );
  }

  await stories.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: `Stories with id ${id} was successfully deleted`,
  });
});

// async function getForYousByName(req, res) {
//   try {
//     const name = req.params.name; // Assuming you are passing the name in the request parameters

//     const data = await foryous.findOne({
//       where: {
//         name: {
//           [Op.iLike]: name, // This will perform a case-insensitive search for the name
//         },
//       },
//     });

//     if (!data) {
//       return res.status(404).json({
//         status: "failed",
//         message: "Data not found with the provided name",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// }

module.exports = {
  createStories,
  getStoriesById,
  //   getAllForYous,
  //   updateForYous,
  deleteStories,
  //   getForYousByName,

  //   getFlightByAirport,

  //   getFlightByAirport,
};
