const Subjects = require("../../models/Academics/SubjectModel");
const asyncHandler = require("express-async-handler");

const getSubjectList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSubject = await Subjects.countDocuments();
      const totalPages = Math.ceil(totalSubject / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allSubject = await Subjects.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Subjects List',
      data: allSubject,
      page,
      nextPage,
      totalPages,
      totalSubject
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getSubjectById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSubject = await Subjects.findById(id)
    res.json(getaSubject);
  } catch (error) {
    throw new Error(error);
  }
});
const createSubject = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Subject = await Subjects.create(req.body);
    res.json(Subject);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSubject = await Subjects.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSubject);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSubject = await Subjects.findByIdAndDelete(id);
    res.json(deletedSubject);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchSubject = asyncHandler(async (req, res) => {
  try {
    const getSearchSubject = await Subjects.find({

      "$or":[
        {subject:{$regex:req.params.key}},
        {subject_type:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchSubject);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSubjectList,
  getSubjectById,
  getSearchSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
