const AssignVehicles = require("../../models/Transport/AssignVehicleModel");
const asyncHandler = require("express-async-handler");


const getAssignVehicleList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalAssignVehicle = await AssignVehicles.countDocuments();
      const totalPages = Math.ceil(totalAssignVehicle / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allAssignVehicle = await AssignVehicles.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Assign Vehicles List',
      data: allAssignVehicle,
      page,
      nextPage,
      totalPages,
      totalAssignVehicle
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getAssignVehicleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaAssignVehicle = await AssignVehicles.findById(id)
    res.json(getaAssignVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const createAssignVehicle = asyncHandler(async (req, res) => {
  try {
    const AssignVehicle = await AssignVehicles.create(req.body);
    res.json(AssignVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const updateAssignVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedAssignVehicle = await AssignVehicles.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAssignVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteAssignVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedAssignVehicle = await AssignVehicles.findByIdAndDelete(id);
    res.json(deletedAssignVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchAssignVehicle = asyncHandler(async (req, res) => {
  try {
    const getSearchAssignVehicle = await AssignVehicles.find({

      "$or":[
        {vehicle_number:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchAssignVehicle);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getAssignVehicleList,
  getAssignVehicleById,
  getSearchAssignVehicle,
  createAssignVehicle,
  updateAssignVehicle,
  deleteAssignVehicle,
};
