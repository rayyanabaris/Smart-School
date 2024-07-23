const StudentCategories = require("../../models/StudentInformation/StudentCategoryModel");
const asyncHandler = require("express-async-handler");

const getStudentCategoryList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalStudentCategory = await StudentCategories.countDocuments();
      const totalPages = Math.ceil(totalStudentCategory / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allStudentCategory = await StudentCategories.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Student Categories List',
      data: allStudentCategory,
      page,
      nextPage,
      totalPages,
      totalStudentCategory
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getStudentCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaStudentCategory = await StudentCategories.findById(id)
    res.json(getaStudentCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const createStudentCategory = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const StudentCategory = await StudentCategories.create(req.body);
    res.json(StudentCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const updateStudentCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedStudentCategory = await StudentCategories.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedStudentCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteStudentCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedStudentCategory = await StudentCategories.findByIdAndDelete(id);
    res.json(deletedStudentCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchStudentCategory = asyncHandler(async (req, res) => {
  try {
    const getSearchStudentCategory = await StudentCategories.find({

      "$or":[
        {disable_reason:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchStudentCategory);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getStudentCategoryList,
  getStudentCategoryById,
  getSearchStudentCategory,
  createStudentCategory,
  updateStudentCategory,
  deleteStudentCategory,
};
