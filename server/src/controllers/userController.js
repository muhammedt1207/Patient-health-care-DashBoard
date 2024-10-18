const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/jwt/accessToken");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const newUser = new Users({
        name: "John Doe",
        email: "doctor@gmail.com",
        password: "Doctor@123",  // Password should ideally be hashed before saving
        phone: "123-456-7890",
        role: "doctor", // Can be 'user' or 'admin'
      });
  
      // Save the user to the database
      const savedUser = await newUser.save();
      const credentials = req.body;
      console.log("🚀 ~ loginUser: ~ credentials:", credentials);
      console.log(credentials);
      const existUser = await Users.findOne({ email: credentials?.email });
      console.log("🚀 ~ loginUser: ~ existUser:", existUser);
      if (!existUser) {
        res.status(404).json({
          success: false,
          data: null,
          message: "No user found!",
        });
        return;
      }

      const payload = {
        _id: existUser?._id,
        name: existUser?.name,
      };

      const AccessToken = generateAccessToken(payload);

      res.cookie("access_token", AccessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      console.log("🚀 ~ return ~ result:", AccessToken);

      res.status(200).json({
        success: true,
        data: existUser,
        message: "Log-in successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  signUpUser: async (req, res) => {
    try {
      const credentials = req.body;
      console.log("credentials", credentials);
      const existUser = await Users.findOne({ email: credentials?.email });
      if (existUser) {
        res.status(404).json({
          success: false,
          data: null,
          message: "User already exists!",
        });
        return;
      }
      const userData = await Users.create(credentials);
      console.log("🚀 ~ signUpUser: ~ userData:", userData);

      const payload = {
        _id: userData?._id,
        name: userData?.name,
      };

      const AccessToken = await generateAccessToken(payload);

      res.cookie("access_token", AccessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      console.log("🚀 ~ return ~ result:", AccessToken);

      res.status(200).json({
        success: true,
        data: userData,
        message: "user created successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json({
        success: true,
        data: users,
        message: "users listed successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
  editUser: async (req, res) => {
    try {
      const credentials = req.body;
      const updateUser = await Users.findOneAndUpdate(
        { email: credentials?.email },
        {
          name: credentials?.name,
          phone: credentials?.phone,
        }
      );

      console.log(updateUser);
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (req, res) => {
    res.clearCookie("access_token");
    console.log("cookie cleared");
    res.status(200).json({
      success: true,
      data: null,
      message: "Logout successful!",
    });
  },

  isExist: async (req, res) => {
    const token = req.cookies.access_token;
    console.log("🚀 ~ isExist:async ~ token:", token);
    if (token) {
      const exist = jwt.verify(
        token,
        String(process.env.JWT_SECRET),
        (error, decoded) => {
          if (error) {
            throw new Error(error?.message);
          } else {
            console.log(decoded, "----------------------------->");
            return decoded;
          }
        }
      );
      const existUser = await Users.findById(exist?._id);
      console.log("🚀 ~ isExist:async ~ existUser:", existUser);
      if (!existUser) {
        return;
      }
      res.status(200).json({
        success: true,
        data: existUser,
        message: "User found!",
      });
      return;
    }
    res.status(400).json({
      success: false,
      data: null,
      message: "No user found!",
    });
  },

  deleteUser: async (req, res) => {
    try {
      const credentials = req.body;
      const deletedUser = await Users.findOneAndDelete({
        email: credentials?.email,
      });

      if (!deletedUser) {
        res.status(404).json({
          success: false,
          data: null,
          message: "user deletion failed!",
        });
      }
      res.status(200).json({
        success: true,
        data: null,
        message: "user deleted successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
