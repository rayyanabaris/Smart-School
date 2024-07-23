const ComplaintTypes = require("../../models/FrontOffice/ComplainttypeModel");
const asyncHandler = require("express-async-handler");

const getComplaintTypeList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalComplaintType = await ComplaintTypes.countDocuments();
      const totalPages = Math.ceil(totalComplaintType / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allComplaintType = await ComplaintTypes.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'ComplaintTypes List',
      data: allComplaintType,
      page,
      nextPage,
      totalPages,
      totalComplaintType
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getComplaintTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaComplaintType = await ComplaintTypes.findById(id)
    res.json(getaComplaintType);
  } catch (error) {
    throw new Error(error);
  }
});
const createComplaintType = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const ComplaintType = await ComplaintTypes.create(req.body);
    res.json(ComplaintType);
  } catch (error) {
    throw new Error(error);
  }
});
const updateComplaintType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedComplaintType = await ComplaintTypes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedComplaintType);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteComplaintType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedComplaintType = await ComplaintTypes.findByIdAndDelete(id);
    res.json(deletedComplaintType);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchComplaintType = asyncHandler(async (req, res) => {
  try {
    const getSearchComplaintType = await ComplaintTypes.find({
      "$or":[
        {complaint_type:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchComplaintType);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getComplaintTypeList,
  getComplaintTypeById,
  getSearchComplaintType,
  createComplaintType,
  updateComplaintType,
  deleteComplaintType,
};
