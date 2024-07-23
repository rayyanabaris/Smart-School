const Designations = require("../../models/HumanResource/DesignationModel");
const asyncHandler = require("express-async-handler");

const getDesignationList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalDesignation = await Designations.countDocuments();
      const totalPages = Math.ceil(totalDesignation / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allDesignation = await Designations.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Designation List',
      data: allDesignation,
      page,
      nextPage,
      totalPages,
      totalDesignation
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getDesignationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaDesignation = await Designations.findById(id)
    res.json(getaDesignation);
  } catch (error) {
    throw new Error(error);
  }
});
const createDesignation = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Designation = await Designations.create(req.body);
    res.json(Designation);
  } catch (error) {
    throw new Error(error);
  }
});
const updateDesignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedDesignation = await Designations.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDesignation);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDesignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedDesignation = await Designations.findByIdAndDelete(id);
    res.json(deletedDesignation);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchDesignation = asyncHandler(async (req, res) => {
  try {
    const getSearchDesignation = await Designations.find({
      "$or":[
        {designation:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchDesignation);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getDesignationList,
  getDesignationById,
  getSearchDesignation,
  createDesignation,
  updateDesignation,
  deleteDesignation,
};
