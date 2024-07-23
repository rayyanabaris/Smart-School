const Classes = require("../../models/Academics/ClassesModel");
const asyncHandler = require("express-async-handler");

const getClassList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalClass = await Classes.countDocuments();
      const totalPages = Math.ceil(totalClass / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allClass = await Classes.find().skip((page - 1) * limit).limit(limit)
      .populate("section_id")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Classes List',
      data: allClass,
      page,
      nextPage,
      totalPages,
      totalClass
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getClassById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaClass = await Classes.findById(id)
    res.json(getaClass);
  } catch (error) {
    throw new Error(error);
  }
});
const createClass = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Class = await Classes.create(req.body);
    res.json(Class);
  } catch (error) {
    throw new Error(error);
  }
});
const updateClass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedClass = await Classes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedClass);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteClass = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedClass = await Classes.findByIdAndDelete(id);
    res.json(deletedClass);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchClass = asyncHandler(async (req, res) => {
  try {
    const getSearchClass = await Classes.find({
      "$or":[
        {class:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchClass);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getClassList,
  getClassById,
  getSearchClass,
  createClass,
  updateClass,
  deleteClass,
};
