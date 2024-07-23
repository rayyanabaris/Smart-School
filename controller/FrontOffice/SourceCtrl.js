const Sources = require("../../models/FrontOffice/SourceModel");
const asyncHandler = require("express-async-handler");

const getSourceList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSource = await Sources.countDocuments();
      const totalPages = Math.ceil(totalSource / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allSource = await Sources.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Sources List',
      data: allSource,
      page,
      nextPage,
      totalPages,
      totalSource
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getSourceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSource = await Sources.findById(id)
    res.json(getaSource);
  } catch (error) {
    throw new Error(error);
  }
});
const createSource = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Source = await Sources.create(req.body);
    res.json(Source);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSource = await Sources.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSource);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSource = await Sources.findByIdAndDelete(id);
    res.json(deletedSource);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchSource = asyncHandler(async (req, res) => {
  try {
    const getSearchSource = await Sources.find({
      "$or":[
        {source:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchSource);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSourceList,
  getSourceById,
  getSearchSource,
  createSource,
  updateSource,
  deleteSource,
};
