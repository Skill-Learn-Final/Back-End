const { StatusCodes } = require("http-status-codes");
const db = require("../database/models");

const createRating = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { score, message } = req.body;
    const userId = "fef02c0d-5973-40f9-af84-38a37605e8f2";

    if (!score) throw new Error("Score is required!");
    if (!message) throw new Error("Message is required!");

    const rating = await db.Rating.create({
      score,
      message,
      userId,
      courseId,
    });

    return res.status(StatusCodes.CREATED).json(rating);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const getRatings = async (req, res) => {
  try {
    const { courseId } = req.params;

    const ratings = await db.Rating.findAll({
      where: {
        courseId,
      },
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });

    return res.status(StatusCodes.OK).json(ratings);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { score, message } = req.body;

    if (!score) throw new Error("Score is required!");
    if (!message) throw new Error("Message is required!");

    const rating = await db.Rating.findOne({
      where: {
        id: ratingId,
      },
    });

    if (!rating) throw new Error("Rating not found!");

    await rating.update({
      score,
      message,
    });

    return res.status(StatusCodes.OK).json(rating);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

module.exports = {
  createRating,
  getRatings,
  updateRating,
};
