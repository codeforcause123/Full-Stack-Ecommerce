import Category from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res
        .status(200)
        .send({ success: true, message: "Category already exists" });
    }
    const newcategory = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newcategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error, message: "Error" });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const existingCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      existingCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error, message: "Error" });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({ success: true, message: "List category", category });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error,
      message: "Error getting Category",
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got Single Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error", error: error });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Category deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error", error: error });
  }
};
