import {
  GettingMenteeById,
  IsExist,
  RegisterUserService,
  UpdateProfile,
  Users,
} from "../Services/User.service.js";
import bcrypt from "bcrypt";
import { GenerateToken } from "../Utils/TokenGenerate.js";
import cloudinary from "../config/CloudinaryConfig.js";
import { SearchMentorService } from "../Services/Mentor.js";
export const Signup = async (req, res) => {
  try {
    const {
      name,
      password,
      bio,
      skills,
      role,
      email,
      linked,
      github,
      price,
      experience,
    } = req.body;
    console.log("name", name);
    if (!name || !password || !bio || !skills || !role || !linked || !github) {
      return res.status(401).json({
        message: "Something is missing, please fill all the field",
        success: false,
      });
    }

    const user = await RegisterUserService({
      name,
      password,
      email,
      bio,
      skills,
      role,
      linked,
      experience,
      price,
      github,
    });

    console.log("user", user);
    if (!user) {
      return res.status(401).json({
        message: "User is not created",
        success: false,
      });
    }
    return res.status(201).json({
      message: "User is register successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email is ", email);

    const user = await IsExist(email);
    if (!user) {
      return res.status(404).json({
        message: "Can not get the user with specific email",
        success: false,
      });
    }
    // compare password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }
    const token = await GenerateToken(user);
    if (!token) {
      return res.status(401).json({
        message: "Can not generate token",
        success: false,
      });
    }
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 50000,
    });
    return res.status(201).json({
      message: "User is logged in successfully",
      user,
      success: true,
      token: token,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Getting Mentee

export const GetSpecificMentee = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await GettingMenteeById(id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }
    return res.status(201).json(user);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      messasge: "Internal server error",
      success: false,
    });
  }
};

// Update Profile

export const UpdateUserProfile = async (req, res) => {
  try {
    const { bio, skills, linked, github, name, email } = req.body;
    const profilepicture = req?.file?.path;
    const findExistingUser = await IsExist(email);
    if (!findExistingUser) {
      return res.status(404).json({
        message: "Can not get any profile with this email",
        success: false,
      });
    }
    const result = await cloudinary.uploader.upload(profilepicture);
    const picture = result.secure_url;
    if (!picture) {
      return res.status(404).json({
        message: "profile picture is not uploaded to cloudinary",
        success: false,
      });
    }
    const data = { picture, bio, skills, linked, github, name, email };
    const profileUpdated = await UpdateProfile(data, findExistingUser._id);
    if (!profileUpdated) {
      return res.status(401).json({
        message: "profile could't update",
        success: false,
      });
    }

    return res.status(201).json({
      message: "profile updated successfully",
      success: true,
      profileUpdated,
    });
  } catch (error) {
    console.log("error", error);
    res.status(501).json({
      message: "Internal server error",
      success: true,
    });
  }
};

export const GetUsers = async (req, res) => {
  try {
    const users = await Users();
    if (!users) {
      return res.status(404).json({
        message: "can not found ",
        success: false,
      });
    }
    return res.status(201).json({
      users,
    });
  } catch (error) {
    throw error;
  }
};

export const SearchMentor = async (req, res) => {
  try {
    console.log("metnor", req.body);
    const { query } = req.body;
    const searchedUser = await SearchMentorService(query);
    if (!searchedUser) {
      return res.status(201).json({
        message: "Not found",
        success: false,
      });
    }
    return res.status(201).json(searchedUser);
  } catch (error) {
    console.log("error", error);
    return res.status(501).json({
      message: "Internal server error",
      success: false,
    });
  }
};
