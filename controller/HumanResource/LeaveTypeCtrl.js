const LeaveTypes = require("../../models/HumanResource/LeaveTypeModel");
const asyncHandler = require("express-async-handler");

const getLeaveTypeList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalLeaveType = await LeaveTypes.countDocuments();
      const totalPages = Math.ceil(totalLeaveType / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allLeaveType = await LeaveTypes.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Leave Type List',
      data: allLeaveType,
      page,
      nextPage,
      totalPages,
      totalLeaveType
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getLeaveTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaLeaveType = await LeaveTypes.findById(id)
    res.json(getaLeaveType);
  } catch (error) {
    throw new Error(error);
  }
});
const createLeaveType = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const LeaveType = await LeaveTypes.create(req.body);
    res.json(LeaveType);
  } catch (error) {
    throw new Error(error);
  }
});
const updateLeaveType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedLeaveType = await LeaveTypes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedLeaveType);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteLeaveType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedLeaveType = await LeaveTypes.findByIdAndDelete(id);
    res.json(deletedLeaveType);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchLeaveType = asyncHandler(async (req, res) => {
  try {
    const getSearchLeaveType = await LeaveTypes.find({
      "$or":[
        {LeaveType:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchLeaveType);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getLeaveTypeList,
  getLeaveTypeById,
  getSearchLeaveType,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
};
