const { StatusCodes } = require("http-status-codes");
const db = require("../database/models");

const createComment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { text } = req.body;
    // const { userId } = req.user;
    const userId = "fef02c0d-5973-40f9-af84-38a37605e8f2";

    if (!text) throw new Error("Comment text is required!");

    const comment = await db.Comment.create({
      text,
      commenterId: userId,
      courseId,
    });

    return res.status(StatusCodes.CREATED).json(comment);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const getComments = async (req, res) => {
  try {
    const { courseId } = req.params;

    console.log(courseId);

    const comments = await db.Comment.findAll({
      where: {
        courseId,
      },
      include: [
        {
          model: db.User,
          as: "commenter",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        "replies",
      ],
    });

    return res.status(StatusCodes.OK).json(comments);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const createReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    // const { userId } = req.user;
    const userId = "fef02c0d-5973-40f9-af84-38a37605e8f2";

    if (!text) throw new Error("Reply text is required!");

    const comment = await db.Comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new Error("Comment not found!");

    const reply = await db.Comment.create({
      text,
      commenterId: userId,
      courseId: comment.courseId,
      replyTo: comment.id,
    });

    // await comment.addReplies(reply);

    return res.status(StatusCodes.CREATED).json(reply);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const reportComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await db.Comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new Error("Comment not found!");

    await comment.update({
      isReported: true,
    });

    return res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const unreportComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await db.Comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new Error("Comment not found!");

    await comment.update({
      isReported: false,
    });

    return res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await db.Comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) throw new Error("Comment not found!");

    await comment.destroy();

    return res.status(StatusCodes.OK).json(comment);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json(error.message);
  }
};

module.exports = {
  createComment,
  getComments,
  createReply,
  reportComment,
  unreportComment,
  deleteComment,
};
