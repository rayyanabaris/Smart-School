const Complains = require("../../models/FrontOffice/ComplainModel");
const asyncHandler = require("express-async-handler");

const getComplainList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalComplain = await Complains.countDocuments();
      const totalPages = Math.ceil(totalComplain / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allComplain = await Complains.find().skip((page - 1) * limit).limit(limit)
      .populate("complain_type")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Complains List',
      data: allComplain,
      page,
      nextPage,
      totalPages,
      totalComplain
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getComplainById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaComplain = await Complains.findById(id)
    res.json(getaComplain);
  } catch (error) {
    throw new Error(error);
  }
});
const createComplain = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Complain = await Complains.create(req.body);
    res.json(Complain);
  } catch (error) {
    throw new Error(error);
  }
});
const updateComplain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedComplain = await Complains.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedComplain);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteComplain = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedComplain = await Complains.findByIdAndDelete(id);
    res.json(deletedComplain);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchComplain = asyncHandler(async (req, res) => {
  try {
    const getSearchComplain = await Complains.find({
      "$or":[
        {complain_by:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchComplain);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getComplainList,
  getComplainById,
  getSearchComplain,
  createComplain,
  updateComplain,
  deleteComplain,
};
