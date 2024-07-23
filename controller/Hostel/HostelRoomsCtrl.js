const HostelRooms = require("../../models/Hostel/HostelRoomsModel");
const asyncHandler = require("express-async-handler");

const getHostelRoomList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalHostelRoom = await HostelRooms.countDocuments();
      const totalPages = Math.ceil(totalHostelRoom / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allHostelRoom = await HostelRooms.find().skip((page - 1) * limit).limit(limit)
      .populate("room_type")
      .populate("hostel")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Hostel Rooms List',
      data: allHostelRoom,
      page,
      nextPage,
      totalPages,
      totalHostelRoom
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getHostelRoomById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaHostelRoom = await HostelRooms.findById(id)
    res.json(getaHostelRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const createHostelRoom = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const HostelRoom = await HostelRooms.create(req.body);
    res.json(HostelRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const updateHostelRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedHostelRoom = await HostelRooms.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedHostelRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteHostelRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedHostelRoom = await HostelRooms.findByIdAndDelete(id);
    res.json(deletedHostelRoom);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchHostelRoom = asyncHandler(async (req, res) => {
  try {
    const getSearchHostelRoom = await HostelRooms.find({

      "$or":[
        {room_number:{$regex:req.params.key}},
        {name:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchHostelRoom);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getHostelRoomList,
  getHostelRoomById,
  getSearchHostelRoom,
  createHostelRoom,
  updateHostelRoom,
  deleteHostelRoom,
};
