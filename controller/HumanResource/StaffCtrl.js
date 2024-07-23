const Staffs = require("../../models/HumanResource/StaffModel");
const asyncHandler = require("express-async-handler");
const {cloudinaryUpload, cloudinaryDelete} = require("../../utils/cloudinary");
const path = require('path');
__dirname = path.resolve(path.dirname(__filename), "../../");

const getStaffList = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const totalStaff = await Staffs.countDocuments();
    const totalPages = Math.ceil(totalStaff / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const getStaffList = await Staffs.find().skip((page - 1) * limit).limit(limit)
      .populate("role")
      .populate("designation")
      .populate("department")
      .sort("name : 1")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "Candiadate List",
      data: getStaffList,
      page,
      nextPage,
      totalPages,
      totalStaff,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getStaffById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaStaff = await Staffs.findById(id);
    res.json(getaStaff);
  } catch (error) {
    throw new Error(error);
  }
});
const getfilterStaffList = asyncHandler(async (req, res) => {
  try {
    const getaStaff = await Staffs.find(req.body);
    // .populate("job_category")
    // .populate("location");
    res.json(getaStaff);
  } catch (error) {
    throw new Error(error);
  }
});
const addStaff = asyncHandler(async (req, res) => {
  try {
    console.log("1 step ahead");
    req.body.url = await cloudinaryUpload(
      __dirname + "/uploads/" + req.file.filename,
    )
    console.log(req.body.url);
    const Staff = await Staffs.create(req.body);
    res.json(Staff);
  } catch (error) {
    throw new Error(error);
  }
});
const updateStaff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedStaff = await Staffs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedStaff);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteStaff = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedStaff = await Staffs.findByIdAndDelete(id);
    res.json(deletedStaff);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchStaff = asyncHandler(async (req, res) => {
  try {
    const getSearchStaff = await Staffs.find({
      $or: [
        { name: { $regex: req.params.key } },
         ],
    });
    res.json(getSearchStaff);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getStaffList,
  getStaffById,
  getSearchStaff,
  getfilterStaffList,
  addStaff,
  updateStaff,
  deleteStaff,
};
