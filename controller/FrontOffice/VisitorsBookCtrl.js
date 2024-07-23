const VisitorsBook = require("../../models/FrontOffice/VisitorsBookModel");
const asyncHandler = require("express-async-handler");

const getVisitorBookList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalVisitorBook = await VisitorsBook.countDocuments();
      const totalPages = Math.ceil(totalVisitorBook / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allVisitorBook = await VisitorsBook.find().skip((page - 1) * limit).limit(limit)
      .populate("purpose")
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Visitors List',
      data: allVisitorBook,
      page,
      nextPage,
      totalPages,
      totalVisitorBook
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getVisitorBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaVisitorBook = await VisitorsBook.findById(id)
    res.json(getaVisitorBook);
  } catch (error) {
    throw new Error(error);
  }
});
const createVisitorBook = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const VisitorBook = await VisitorsBook.create(req.body);
    res.json(VisitorBook);
  } catch (error) {
    throw new Error(error);
  }
});
const updateVisitorBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedVisitorBook = await VisitorsBook.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedVisitorBook);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteVisitorBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedVisitorBook = await VisitorsBook.findByIdAndDelete(id);
    res.json(deletedVisitorBook);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchVisitorBook = asyncHandler(async (req, res) => {
  try {
    const getSearchVisitorBook = await VisitorsBook.find({
      "$or":[
        {name:{$regex:req.params.key}},
        {phone:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchVisitorBook);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getVisitorBookList,
  getVisitorBookById,
  getSearchVisitorBook,
  createVisitorBook,
  updateVisitorBook,
  deleteVisitorBook,
};
