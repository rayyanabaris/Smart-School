const ApplyLeaves = require("../../models/HumanResource/ApplyLeaveModel");
const asyncHandler = require("express-async-handler");

const getApplyLeaveList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalApplyLeave = await ApplyLeaves.countDocuments();
      const totalPages = Math.ceil(totalApplyLeave / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allApplyLeave = await ApplyLeaves.find().skip((page - 1) * limit).limit(limit)
      .populate("leave_type")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Leave Type List',
      data: allApplyLeave,
      page,
      nextPage,
      totalPages,
      totalApplyLeave
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getApplyLeaveById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaApplyLeave = await ApplyLeaves.findById(id)
    res.json(getaApplyLeave);
  } catch (error) {
    throw new Error(error);
  }
});
const createApplyLeave = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const ApplyLeave = await ApplyLeaves.create(req.body);
    res.json(ApplyLeave);
  } catch (error) {
    throw new Error(error);
  }
});
const updateApplyLeave = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedApplyLeave = await ApplyLeaves.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedApplyLeave);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteApplyLeave = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedApplyLeave = await ApplyLeaves.findByIdAndDelete(id);
    res.json(deletedApplyLeave);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchApplyLeave = asyncHandler(async (req, res) => {
  try {
    const getSearchApplyLeave = await ApplyLeaves.find({
      "$or":[
        {ApplyLeave:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchApplyLeave);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getApplyLeaveList,
  getApplyLeaveById,
  getSearchApplyLeave,
  createApplyLeave,
  updateApplyLeave,
  deleteApplyLeave,
};
