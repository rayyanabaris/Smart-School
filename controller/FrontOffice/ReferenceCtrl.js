const References = require("../../models/FrontOffice/ReferenceModel");
const asyncHandler = require("express-async-handler");

const getReferenceList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalReference = await References.countDocuments();
      const totalPages = Math.ceil(totalReference / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allReference = await References.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'References List',
      data: allReference,
      page,
      nextPage,
      totalPages,
      totalReference
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getReferenceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaReference = await References.findById(id)
    res.json(getaReference);
  } catch (error) {
    throw new Error(error);
  }
});
const createReference = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Reference = await References.create(req.body);
    res.json(Reference);
  } catch (error) {
    throw new Error(error);
  }
});
const updateReference = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedReference = await References.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedReference);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteReference = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedReference = await References.findByIdAndDelete(id);
    res.json(deletedReference);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchReference = asyncHandler(async (req, res) => {
  try {
    const getSearchReference = await References.find({
      "$or":[
        {reference:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchReference);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getReferenceList,
  getReferenceById,
  getSearchReference,
  createReference,
  updateReference,
  deleteReference,
};
