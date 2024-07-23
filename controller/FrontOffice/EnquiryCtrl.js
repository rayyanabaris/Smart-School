const Enquiries = require("../../models/FrontOffice/EnquiryModel");
const asyncHandler = require("express-async-handler");

const getEnquiryList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalEnquiry = await Enquiries.countDocuments();
      const totalPages = Math.ceil(totalEnquiry / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allEnquiry = await Enquiries.find().skip((page - 1) * limit).limit(limit)
      .populate("reference")
      .populate("source")
      .populate("purpose")
      .populate("class")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Admission Enquiry List',
      data: allEnquiry,
      page,
      nextPage,
      totalPages,
      totalEnquiry
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaEnquiry = await Enquiries.findById(id)
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getEnquiryByFilter = asyncHandler(async (req, res) => {
  const {} = req.params;
  try {
    const getaEnquiry = await Enquiries.find(req.body)
    res.json(getaEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Enquiry = await Enquiries.create(req.body);
    res.json(Enquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedEnquiry = await Enquiries.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedEnquiry = await Enquiries.findByIdAndDelete(id);
    res.json(deletedEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchEnquiry = asyncHandler(async (req, res) => {
  try {
    const getSearchEnquiry = await Enquiries.find({
      "$or":[
        {name:{$regex:req.params.key}},
        {phone:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchEnquiry);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getEnquiryList,
  getEnquiryById,
  getEnquiryByFilter,
  getSearchEnquiry,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
