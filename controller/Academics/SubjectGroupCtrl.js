const SubjectGroups = require("../../models/Academics/SubjectGroupModel");
const asyncHandler = require("express-async-handler");

const getSubjectGroupList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSubjectGroup = await SubjectGroups.countDocuments();
      const totalPages = Math.ceil(totalSubjectGroup / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allSubjectGroup = await SubjectGroups.find().skip((page - 1) * limit).limit(limit)
      .populate("class_id")
      .populate("section_id")
      .populate("subject_id")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Subject Groups List',
      data: allSubjectGroup,
      page,
      nextPage,
      totalPages,
      totalSubjectGroup
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getSubjectGroupById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSubjectGroup = await SubjectGroups.findById(id)
    res.json(getaSubjectGroup);
  } catch (error) {
    throw new Error(error);
  }
});
const createSubjectGroup = asyncHandler(async (req, res) => {
  try {
    if (req.body.namee) {
      req.body.slug = slugify(req.body.namee);
    }
    const SubjectGroup = await SubjectGroups.create(req.body);
    res.json(SubjectGroup);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSubjectGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSubjectGroup = await SubjectGroups.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSubjectGroup);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSubjectGroup = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSubjectGroup = await SubjectGroups.findByIdAndDelete(id);
    res.json(deletedSubjectGroup);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchSubjectGroup = asyncHandler(async (req, res) => {
  try {
    const getSearchSubjectGroup = await SubjectGroups.find({

      "$or":[
        {name:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchSubjectGroup);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSubjectGroupList,
  getSubjectGroupById,
  getSearchSubjectGroup,
  createSubjectGroup,
  updateSubjectGroup,
  deleteSubjectGroup,
};
