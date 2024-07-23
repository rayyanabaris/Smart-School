const SchoolHouses = require("../../models/StudentInformation/SchoolHouseModel");
const asyncHandler = require("express-async-handler");

const getSchoolHouseList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSchoolHouse = await SchoolHouses.countDocuments();
      const totalPages = Math.ceil(totalSchoolHouse / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allSchoolHouse = await SchoolHouses.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'School House List',
      data: allSchoolHouse,
      page,
      nextPage,
      totalPages,
      totalSchoolHouse
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getSchoolHouseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSchoolHouse = await SchoolHouses.findById(id)
    res.json(getaSchoolHouse);
  } catch (error) {
    throw new Error(error);
  }
});
const createSchoolHouse = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const SchoolHouse = await SchoolHouses.create(req.body);
    res.json(SchoolHouse);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSchoolHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSchoolHouse = await SchoolHouses.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSchoolHouse);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSchoolHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSchoolHouse = await SchoolHouses.findByIdAndDelete(id);
    res.json(deletedSchoolHouse);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchSchoolHouse = asyncHandler(async (req, res) => {
  try {
    const getSearchSchoolHouse = await SchoolHouses.find({

      "$or":[
        {name:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchSchoolHouse);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSchoolHouseList,
  getSchoolHouseById,
  getSearchSchoolHouse,
  createSchoolHouse,
  updateSchoolHouse,
  deleteSchoolHouse,
};
