const RoomTypes = require("../../models/Hostel/RoomTypesModel");
const asyncHandler = require("express-async-handler");

const getRoomTypeList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalRoomType = await RoomTypes.countDocuments();
      const totalPages = Math.ceil(totalRoomType / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allRoomType = await RoomTypes.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Room Types List',
      data: allRoomType,
      page,
      nextPage,
      totalPages,
      totalRoomType
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getRoomTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaRoomType = await RoomTypes.findById(id)
    res.json(getaRoomType);
  } catch (error) {
    throw new Error(error);
  }
});
const createRoomType = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const RoomType = await RoomTypes.create(req.body);
    res.json(RoomType);
  } catch (error) {
    throw new Error(error);
  }
});
const updateRoomType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedRoomType = await RoomTypes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedRoomType);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteRoomType = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedRoomType = await RoomTypes.findByIdAndDelete(id);
    res.json(deletedRoomType);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchRoomType = asyncHandler(async (req, res) => {
  try {
    const getSearchRoomType = await RoomTypes.find({

      "$or":[
        {room_type:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchRoomType);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getRoomTypeList,
  getRoomTypeById,
  getSearchRoomType,
  createRoomType,
  updateRoomType,
  deleteRoomType,
};
