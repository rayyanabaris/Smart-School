const Purposes = require("../../models/FrontOffice/PurposeModel");
const asyncHandler = require("express-async-handler");

const getPurposeList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalPurpose = await Purposes.countDocuments();
      const totalPages = Math.ceil(totalPurpose / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allPurpose = await Purposes.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Purposes List',
      data: allPurpose,
      page,
      nextPage,
      totalPages,
      totalPurpose
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getPurposeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaPurpose = await Purposes.findById(id)
    res.json(getaPurpose);
  } catch (error) {
    throw new Error(error);
  }
});
const createPurpose = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Purpose = await Purposes.create(req.body);
    res.json(Purpose);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePurpose = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedPurpose = await Purposes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPurpose);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePurpose = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedPurpose = await Purposes.findByIdAndDelete(id);
    res.json(deletedPurpose);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchPurpose = asyncHandler(async (req, res) => {
  try {
    const getSearchPurpose = await Purposes.find({
      "$or":[
        {purpose:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchPurpose);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPurposeList,
  getPurposeById,
  getSearchPurpose,
  createPurpose,
  updatePurpose,
  deletePurpose,
};
