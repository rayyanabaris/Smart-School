const Roles = require("../../models/Settings/RolesModel");
const asyncHandler = require("express-async-handler");

const getRoleList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalRole = await Roles.countDocuments();
      const totalPages = Math.ceil(totalRole / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allRole = await Roles.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Roles List',
      data: allRole,
      page,
      nextPage,
      totalPages,
      totalRole
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getRoleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaRole = await Roles.findById(id)
    res.json(getaRole);
  } catch (error) {
    throw new Error(error);
  }
});
const createRole = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Role = await Roles.create(req.body);
    res.json(Role);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedRole = await Roles.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedRole);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedRole = await Roles.findByIdAndDelete(id);
    res.json(deletedRole);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchRole = asyncHandler(async (req, res) => {
  try {
    const getSearchRole = await Roles.find({

      "$or":[
        {Role:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchRole);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getRoleList,
  getRoleById,
  getSearchRole,
  createRole,
  updateRole,
  deleteRole,
};
