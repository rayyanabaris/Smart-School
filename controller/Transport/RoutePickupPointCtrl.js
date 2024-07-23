const RoutePickupPoints = require("../../models/Transport/RoutePickupPointModel");
const asyncHandler = require("express-async-handler");

const getRoutePickupPointList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalRoutePickupPoint = await RoutePickupPoints.countDocuments();
      const totalPages = Math.ceil(totalRoutePickupPoint / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allRoutePickupPoint = await RoutePickupPoints.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Pickup Points List',
      data: allRoutePickupPoint,
      page,
      nextPage,
      totalPages,
      totalRoutePickupPoint
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getRoutePickupPointById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaRoutePickupPoint = await RoutePickupPoints.findById(id)
    res.json(getaRoutePickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const createRoutePickupPoint = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const RoutePickupPoint = await RoutePickupPoints.create(req.body);
    res.json(RoutePickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRoutePickupPoint = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {routes/Settings
    const updatedRoutePickupPoint = await RoutePickupPoints.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedRoutePickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteRoutePickupPoint = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedRoutePickupPoint = await RoutePickupPoints.findByIdAndDelete(id);
    res.json(deletedRoutePickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchRoutePickupPoint = asyncHandler(async (req, res) => {
  try {
    const getSearchRoutePickupPoint = await RoutePickupPoints.find({

      "$or":[
        {pickup_point:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchRoutePickupPoint);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getRoutePickupPointList,
  getRoutePickupPointById,
  getSearchRoutePickupPoint,
  createRoutePickupPoint,
  updateRoutePickupPoint,
  deleteRoutePickupPoint,
};
