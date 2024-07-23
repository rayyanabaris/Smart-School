const StudentAdmissions = require("../../models/StudentInformation/StudentAdmissionModel");
const asyncHandler = require("express-async-handler");
const {cloudinaryUpload, cloudinaryDelete} = require("../../utils/cloudinary");
const path = require('path');
__dirname = path.resolve(path.dirname(__filename), "../../");

const getStudentAdmissionList = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const totalStudentAdmission = await StudentAdmissions.countDocuments();
    const totalPages = Math.ceil(totalStudentAdmission / limit);
    const nextPage = page < totalPages ? page + 1 : null;
    const getStudentAdmissionList = await StudentAdmissions.find().skip((page - 1) * limit).limit(limit)
      .populate("class")
      .populate("sections")
      .populate("school_houses")
      .populate("categories")
      .sort("name : 1")
      .exec();

    return res.status(200).json({
      success: true,
      msg: "Student Admission List",
      data: getStudentAdmissionList,
      page,
      nextPage,
      totalPages,
      totalStudentAdmission,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getStudentAdmissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaStudentAdmission = await StudentAdmissions.findById(id);
    res.json(getaStudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});
const getfilterStudentAdmissionList = asyncHandler(async (req, res) => {
  try {
    const getaStudentAdmission = await StudentAdmissions.find(req.body);
    res.json(getaStudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});
const getStudentDetails = asyncHandler(async (req, res) => {
  try {
    const getaStudentAdmission = await StudentAdmissions.find(req.body);
    res.json(getaStudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});
const addStudentAdmission = asyncHandler(async (req, res) => {
  try {
    console.log("1 step ahead");
    req.body.url = await cloudinaryUpload(
      __dirname + "/uploads/" + req.file.filename,
    )
    console.log(req.body.url);
    const StudentAdmission = await StudentAdmissions.create(req.body);
    res.json(StudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});
const updateStudentAdmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedStudentAdmission = await StudentAdmissions.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedStudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteStudentAdmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedStudentAdmission = await StudentAdmissions.findByIdAndDelete(id);
    res.json(deletedStudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchStudentAdmission = asyncHandler(async (req, res) => {
  try {
    const getSearchStudentAdmission = await StudentAdmissions.find({
      $or: [
        { name: { $regex: req.params.key } },
         ],
    });
    res.json(getSearchStudentAdmission);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getStudentAdmissionList,
  getStudentDetails,
  getStudentAdmissionById,
  getSearchStudentAdmission,
  getfilterStudentAdmissionList,
  addStudentAdmission,
  updateStudentAdmission,
  deleteStudentAdmission,
};
