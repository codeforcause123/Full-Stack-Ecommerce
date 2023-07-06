import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address , answer} = req.body;
    //validate
    if (!name || !email || !password || !phone || !address || !answer) {
      return res.send({ message: "Invalid" });
    }
    //checking existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: "True", message: "User already registered" });
    }
    //create new user
    const hashedpassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
      answer
    }).save();
    res
      .status(201)
      .send({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Couldn't register",
      error: error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "invalid email and password",
      });
    }
    // check username
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "email not found" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid password" });
    }
    // creating tokens
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "LOGIN successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body;
    if (!email) {
      res
        .status(400)
        .send({ success: false, message: "Please enter your email" });
    }
    if (!answer) {
      res
        .status(400)
        .send({ success: false, message: "Please enter your answer" });
    }
    if (!newpassword) {
      res
        .status(400)
        .send({ success: false, message: "Please enter your newpassword" });
    }
    // Check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong email or answer" });
    }
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};
//test controller
export const testController = (req, res) => {
  res.send({ message: "Protected Route" });
};
