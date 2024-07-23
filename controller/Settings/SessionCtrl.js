const Sessions = require("../../models/Settings/SessionModel");
const asyncHandler = require("express-async-handler");

const getSessionList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSession = await Sessions.countDocuments();
      const totalPages = Math.ceil(totalSession / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allSession = await Sessions.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Sessions List',
      data: allSession,
      page,
      nextPage,
      totalPages,
      totalSession
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getSessionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSession = await Sessions.findById(id)
    res.json(getaSession);
  } catch (error) {
    throw new Error(error);
  }
});
const createSession = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Session = await Sessions.create(req.body);
    res.json(Session);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSession = await Sessions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSession);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSession = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSession = await Sessions.findByIdAndDelete(id);
    res.json(deletedSession);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchSession = asyncHandler(async (req, res) => {
  try {
    const getSearchSession = await Sessions.find({

      "$or":[
        {Session:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchSession);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSessionList,
  getSessionById,
  getSearchSession,
  createSession,
  updateSession,
  deleteSession,
};
