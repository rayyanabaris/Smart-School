const Vehicles = require("../../models/Transport/VehicleModel");
const asyncHandler = require("express-async-handler");
const {cloudinaryUpload, cloudinaryDelete} = require("../../utils/cloudinary");
const path = require('path');
__dirname = path.resolve(path.dirname(__filename), "../../");


const getVehicleList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalVehicle = await Vehicles.countDocuments();
      const totalPages = Math.ceil(totalVehicle / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allVehicle = await Vehicles.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Vehicles List',
      data: allVehicle,
      page,
      nextPage,
      totalPages,
      totalVehicle
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getVehicleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaVehicle = await Vehicles.findById(id)
    res.json(getaVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const createVehicle = asyncHandler(async (req, res) => {
  try {
    console.log("1 step ahead");
    req.body.url = await cloudinaryUpload(
      __dirname + "/uploads/" + req.file.filename,
    )
    console.log(req.body.url);
    const Vehicle = await Vehicles.create(req.body);
    res.json(Vehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const updateVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedVehicle = await Vehicles.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteVehicle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedVehicle = await Vehicles.findByIdAndDelete(id);
    res.json(deletedVehicle);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchVehicle = asyncHandler(async (req, res) => {
  try {
    const getSearchVehicle = await Vehicles.find({

      "$or":[
        {Vehicle:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchVehicle);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getVehicleList,
  getVehicleById,
  getSearchVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
