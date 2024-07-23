const Hostels = require("../../models/Hostel/HostelsModel");
const asyncHandler = require("express-async-handler");

const getHostelList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalHostel = await Hostels.countDocuments();
      const totalPages = Math.ceil(totalHostel / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allHostel = await Hostels.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Hostels List',
      data: allHostel,
      page,
      nextPage,
      totalPages,
      totalHostel
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getHostelById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaHostel = await Hostels.findById(id)
    res.json(getaHostel);
  } catch (error) {
    throw new Error(error);
  }
});
const createHostel = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Hostel = await Hostels.create(req.body);
    res.json(Hostel);
  } catch (error) {
    throw new Error(error);
  }
});
const updateHostel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedHostel = await Hostels.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedHostel);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteHostel = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedHostel = await Hostels.findByIdAndDelete(id);
    res.json(deletedHostel);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchHostel = asyncHandler(async (req, res) => {
  try {
    const getSearchHostel = await Hostels.find({

      "$or":[
        {hostel_name:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchHostel);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getHostelList,
  getHostelById,
  getSearchHostel,
  createHostel,
  updateHostel,
  deleteHostel,
};
