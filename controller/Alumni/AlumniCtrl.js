const Alumnis = require("../../models/Alumni/AlumniModel");
const asyncHandler = require("express-async-handler");
const {
  cloudinaryUpload,
  cloudinaryDelete,
} = require("../../utils/cloudinary");
const path = require("path");
__dirname = path.resolve(path.dirname(__filename), "../../");

const getAlumniList = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const totalAlumni = await Alumnis.countDocuments();
    const totalPages = Math.ceil(totalAlumni / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const allAlumni = await Alumnis.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort("createdAt : 1")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "Alumnis List",
      data: allAlumni,
      page,
      nextPage,
      totalPages,
      totalAlumni,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAlumniById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaAlumni = await Alumnis.findById(id);
    res.json(getaAlumni);
  } catch (error) {
    throw new Error(error);
  }
});
const createAlumni = asyncHandler(async (req, res) => {
  try {
    console.log("1 step ahead");
    req.body.url = await cloudinaryUpload(
      __dirname + "/uploads/" + req.file.filename
    );
    console.log(req.body.url);
    const Alumni = await Alumnis.create(req.body);
    res.json(Alumni);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedAlumni = await Alumnis.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAlumni);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAlumni = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedAlumni = await Alumnis.findByIdAndDelete(id);
    res.json(deletedAlumni);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchAlumni = asyncHandler(async (req, res) => {
  try {
    const getSearchAlumni = await Alumnis.find({
      $or: [{ Alumni: { $regex: req.params.key } }],
    });
    res.json(getSearchAlumni);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAlumniList,
  getAlumniById,
  getSearchAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
};
