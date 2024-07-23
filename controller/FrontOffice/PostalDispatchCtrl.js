const PostalDispatchs = require("../../models/FrontOffice/PostalDispatchModel");
const asyncHandler = require("express-async-handler");

const getPostalDispatchList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalPostalDispatch = await PostalDispatchs.countDocuments();
      const totalPages = Math.ceil(totalPostalDispatch / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allPostalDispatch = await PostalDispatchs.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Postal Dispatchs List',
      data: allPostalDispatch,
      page,
      nextPage,
      totalPages,
      totalPostalDispatch
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getPostalDispatchById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaPostalDispatch = await PostalDispatchs.findById(id)
    res.json(getaPostalDispatch);
  } catch (error) {
    throw new Error(error);
  }
});
const createPostalDispatch = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const PostalDispatch = await PostalDispatchs.create(req.body);
    res.json(PostalDispatch);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePostalDispatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedPostalDispatch = await PostalDispatchs.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPostalDispatch);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePostalDispatch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedPostalDispatch = await PostalDispatchs.findByIdAndDelete(id);
    res.json(deletedPostalDispatch);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchPostalDispatch = asyncHandler(async (req, res) => {
  try {
    const getSearchPostalDispatch = await PostalDispatchs.find({
      "$or":[
        {PostalDispatch:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchPostalDispatch);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPostalDispatchList,
  getPostalDispatchById,
  getSearchPostalDispatch,
  createPostalDispatch,
  updatePostalDispatch,
  deletePostalDispatch,
};
