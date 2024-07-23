const DisableReasons = require("../../models/StudentInformation/DisableReasonModel");
const asyncHandler = require("express-async-handler");

const getDisableReasonList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalDisableReason = await DisableReasons.countDocuments();
      const totalPages = Math.ceil(totalDisableReason / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allDisableReason = await DisableReasons.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Disable Reasons List',
      data: allDisableReason,
      page,
      nextPage,
      totalPages,
      totalDisableReason
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getDisableReasonById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaDisableReason = await DisableReasons.findById(id)
    res.json(getaDisableReason);
  } catch (error) {
    throw new Error(error);
  }
});
const createDisableReason = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const DisableReason = await DisableReasons.create(req.body);
    res.json(DisableReason);
  } catch (error) {
    throw new Error(error);
  }
});
const updateDisableReason = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedDisableReason = await DisableReasons.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDisableReason);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDisableReason = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedDisableReason = await DisableReasons.findByIdAndDelete(id);
    res.json(deletedDisableReason);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchDisableReason = asyncHandler(async (req, res) => {
  try {
    const getSearchDisableReason = await DisableReasons.find({

      "$or":[
        {disable_reason:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchDisableReason);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getDisableReasonList,
  getDisableReasonById,
  getSearchDisableReason,
  createDisableReason,
  updateDisableReason,
  deleteDisableReason,
};
