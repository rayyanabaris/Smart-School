const PickupPoints = require("../../models/Transport/PickupPointModel");
const asyncHandler = require("express-async-handler");

const getPickupPointList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalPickupPoint = await PickupPoints.countDocuments();
      const totalPages = Math.ceil(totalPickupPoint / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allPickupPoint = await PickupPoints.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Pickup Points List',
      data: allPickupPoint,
      page,
      nextPage,
      totalPages,
      totalPickupPoint
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getPickupPointById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaPickupPoint = await PickupPoints.findById(id)
    res.json(getaPickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const createPickupPoint = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const PickupPoint = await PickupPoints.create(req.body);
    res.json(PickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePickupPoint = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {routes/Settings
    const updatedPickupPoint = await PickupPoints.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePickupPoint = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedPickupPoint = await PickupPoints.findByIdAndDelete(id);
    res.json(deletedPickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchPickupPoint = asyncHandler(async (req, res) => {
  try {
    const getSearchPickupPoint = await PickupPoints.find({

      "$or":[
        {pickup_point:{$regex:req.params.key}},
        {latitude:{$regex:req.params.key}},
        {longitude:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchPickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPickupPointList,
  getPickupPointById,
  getSearchPickupPoint,
  createPickupPoint,
  updatePickupPoint,
  deletePickupPoint,
};
