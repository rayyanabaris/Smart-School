const PostalRecives = require("../../models/FrontOffice/PostalReciveModel");
const asyncHandler = require("express-async-handler");

const getPostalReciveList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalPostalRecive = await PostalRecives.countDocuments();
      const totalPages = Math.ceil(totalPostalRecive / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allPostalRecive = await PostalRecives.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Postal Recives List',
      data: allPostalRecive,
      page,
      nextPage,
      totalPages,
      totalPostalRecive
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getPostalReciveById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaPostalRecive = await PostalRecives.findById(id)
    res.json(getaPostalRecive);
  } catch (error) {
    throw new Error(error);
  }
});
const createPostalRecive = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const PostalRecive = await PostalRecives.create(req.body);
    res.json(PostalRecive);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePostalRecive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedPostalRecive = await PostalRecives.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPostalRecive);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePostalRecive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedPostalRecive = await PostalRecives.findByIdAndDelete(id);
    res.json(deletedPostalRecive);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchPostalRecive = asyncHandler(async (req, res) => {
  try {
    const getSearchPostalRecive = await PostalRecives.find({
      "$or":[
        {PostalRecive:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchPostalRecive);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPostalReciveList,
  getPostalReciveById,
  getSearchPostalRecive,
  createPostalRecive,
  updatePostalRecive,
  deletePostalRecive,
};
