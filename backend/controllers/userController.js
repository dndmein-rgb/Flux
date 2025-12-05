import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/helpers/generateTokenAndSetCookie.js'
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const signUpUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ error: "User already exists" });

    if (!/^[\w.%+-]+@[\w.-]+\.\w{2,}$/.test(email))
      return res.status(400).json({ error: "Invalid email" });

    if (password.length < 6)
      return res.status(400).json({ error: "Password must be at least 6 characters" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword
    });

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      username: newUser.username,
      bio: newUser.bio,
			profilePic: newUser.profilePic,
    });

  } catch (error) {
    console.log("Error in signUp:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) return res.status(400).json({ error: "Invalid username or password" });

    if(user.isFrozen){
      user.isFrozen=false;
      await user.save();
    }
    generateTokenAndSetCookie(user._id, res);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio:user.bio,
      profilePic:user.profilePic
    });

  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id === req.user._id.toString())
      return res.status(400).json({ error: "Cannot follow yourself" });

    const user = await User.findById(id);
    const current = await User.findById(req.user._id);

    if (!user || !current) return res.status(404).json({ error: "User not found" });

    const following = current.following.includes(id);

    if (following) {
      current.following.pull(id);
      user.followers.pull(req.user._id);
      await current.save();
      await user.save();
      return res.json({ message: "User unfollowed" });
    } else {
      current.following.push(id);
      user.followers.push(req.user._id);
      await current.save();
      await user.save();
      return res.json({ message: "User followed" });
    }

  } catch (error) {
    console.log("followUnFollowUser:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


// Update USER
export const updateUser = async (req, res) => {
  try {
    const { name, email, username, password, bio } = req.body;
    let {profilePic}=req.body;

    if (req.params.id !== req.user._id.toString())
      return res.status(401).json({ error: "Not allowed" });

    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // password update only if provided
    if (password) {
      if (password.length < 6) return res.status(400).json({ error: "Password too short" });
      user.password = await bcrypt.hash(password, 10);
    }
    if(profilePic){
      if(user.profilePic && user.profilePic.includes("cloudinary")){
        await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
      }
      const uploadResponse=await cloudinary.uploader.upload(profilePic);
      profilePic=uploadResponse.secure_url;
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.username = username ?? user.username;
    user.bio = bio ?? user.bio;
    user.profilePic = profilePic ?? user.profilePic;

    user = await user.save();
    await Post.updateMany(
      { "replies.userId": user._id },
      {
        $set: {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.profilePic,
        }
      },
      { arrayFilters: [{ "reply.userId": user._id }] }
    );
    user.password = null;
    res.status(200).json(user);

  } catch (error) {
    console.log("updateUser error:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
 
    //query is either username or id
    const { query } = req.params;
    try {
      let user;
     if(mongoose.Types.ObjectId.isValid(query)){ 
        user=await User.findOne({_id:query}).select("-password -updatedAt");
      }else{
        user=await User.findOne({username:query}).select("-password -updatedAt");
      }
      if(!user) return res.status(404).json({error:"User not found"});
      res.json(user);
    } catch (error) {
      console.log("Error in getUserProfile: ", error.message);
      res.status(500).json({ error: error.message });
    }
   
   
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const usersFollowedByMe = await User.findById(userId).select("following");
    
    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId }
        }
      },
      { $sample: { size: 10 } }
    ]);
    
    const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id));
    const suggestedUsers = filteredUsers.slice(0, 5);
    
    suggestedUsers.forEach(user => user.password = null);
    
    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Error in getSuggestedUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const freezeAccount=async(req,res)=>{
  try{
    const user=await User.findById(req.user._id);
    if(!user) return res.status(404).json({error:"User not found"});
    user.isFrozen=true;
    await user.save();
    res.status(200).json({success:true})
  }catch(error){
    res.status(500).json({error:error.message})
  }
}
