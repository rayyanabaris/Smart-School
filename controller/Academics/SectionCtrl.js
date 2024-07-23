const Sections = require("../../models/Academics/SectionModel");
const asyncHandler = require("express-async-handler");

const getSectionList = asyncHandler(async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const totalSection = await Sections.countDocuments();
      const totalPages = Math.ceil(totalSection / limit);
      const nextPage = page < totalPages ? page + 1: null;
      const allSection = await Sections.find().skip((page - 1) * limit).limit(limit)
      .sort("createdAt : 1")
      .exec();
    
    return res.status(200).json({
      success: true,
      msg: 'Sections List',
      data: allSection,
      page,
      nextPage,
      totalPages,
      totalSection
    })
  } catch (error) {
    throw new Error(error);
  }
});
const getSectionById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getaSection = await Sections.findById(id)
    res.json(getaSection);
  } catch (error) {
    throw new Error(error);
  }
});
const createSection = asyncHandler(async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }
    const Section = await Sections.create(req.body);
    res.json(Section);
  } catch (error) {
    throw new Error(error);
  }
});
const updateSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const updatedSection = await Sections.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSection);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // validateMongoDbId(id);
  try {
    const deletedSection = await Sections.findByIdAndDelete(id);
    res.json(deletedSection);
  } catch (error) {
    throw new Error(error);
  }
});
const getSearchSection = asyncHandler(async (req, res) => {
  try {
    const getSearchSection = await Sections.find({

      "$or":[
        {section:{$regex:req.params.key}},
      ]
    });
    res.json(getSearchSection);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getSectionList,
  getSectionById,
  getSearchSection,
  createSection,
  updateSection,
  deleteSection,
};
