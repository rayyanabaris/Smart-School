const PhoneCalls = require("../../models/FrontOffice/PhoneCallModel");
const asyncHandler = require("express-async-handler");

const getPhoneCallList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalPhoneCall = await PhoneCalls.countDocuments();
      const totalPages = Math.ceil(totalPhoneCall / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allPhoneCall = await PhoneCalls.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Phone Calls List',
      data: allPhoneCall,
      page,
      nextPage,
      totalPages,
      totalPhoneCall
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getPhoneCallById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaPhoneCall = await PhoneCalls.findById(id)
    res.json(getaPhoneCall);
  } catch (error) {
    throw new Error(error);
  }
});
const createPhoneCall = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const PhoneCall = await PhoneCalls.create(req.body);
    res.json(PhoneCall);
  } catch (error) {
    throw new Error(error);
  }
});
const updatePhoneCall = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedPhoneCall = await PhoneCalls.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedPhoneCall);
  } catch (error) {
    throw new Error(error);
  }
});
const deletePhoneCall = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedPhoneCall = await PhoneCalls.findByIdAndDelete(id);
    res.json(deletedPhoneCall);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchPhoneCall = asyncHandler(async (req, res) => {
  try {
    const getSearchPhoneCall = await PhoneCalls.find({
      "$or":[
        {PhoneCall:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchPhoneCall);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getPhoneCallList,
  getPhoneCallById,
  getSearchPhoneCall,
  createPhoneCall,
  updatePhoneCall,
  deletePhoneCall,
};
