const Routes = require("../../models/Transport/RouteModel");
const asyncHandler = require("express-async-handler");

const getRouteList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalRoute = await Routes.countDocuments();
      const totalPages = Math.ceil(totalRoute / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allRoute = await Routes.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Routes List',
      data: allRoute,
      page,
      nextPage,
      totalPages,
      totalRoute
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getRouteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaRoute = await Routes.findById(id)
    res.json(getaRoute);
  } catch (error) {
    throw new Error(error);
  }
});
const createRoute = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Route = await Routes.create(req.body);
    res.json(Route);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRoute = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedRoute = await Routes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedRoute);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteRoute = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedRoute = await Routes.findByIdAndDelete(id);
    res.json(deletedRoute);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchRoute = asyncHandler(async (req, res) => {
  try {
    const getSearchRoute = await Routes.find({

      "$or":[
        {route_title:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchRoute);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getRouteList,
  getRouteById,
  getSearchRoute,
  createRoute,
  updateRoute,
  deleteRoute,
};
