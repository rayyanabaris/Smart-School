const Departments = require("../../models/HumanResource/DepartmentModel");
const asyncHandler = require("express-async-handler");

const getDepartmentList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalDepartment = await Departments.countDocuments();
      const totalPages = Math.ceil(totalDepartment / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allDepartment = await Departments.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Departments List',
      data: allDepartment,
      page,
      nextPage,
      totalPages,
      totalDepartment
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getDepartmentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaDepartment = await Departments.findById(id)
    res.json(getaDepartment);
  } catch (error) {
    throw new Error(error);
  }
});
const createDepartment = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Department = await Departments.create(req.body);
    res.json(Department);
  } catch (error) {
    throw new Error(error);
  }
});
const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedDepartment = await Departments.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedDepartment);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedDepartment = await Departments.findByIdAndDelete(id);
    res.json(deletedDepartment);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchDepartment = asyncHandler(async (req, res) => {
  try {
    const getSearchDepartment = await Departments.find({
      "$or":[
        {Department:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchDepartment);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getDepartmentList,
  getDepartmentById,
  getSearchDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
