import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// Signup a new user
export const signup = async (req,res) => {
    const {fullName,email,password,bio} = req.body;

    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success:false,message:"Missing Details"})
        }

        const user = await User.findOne({email});

        if(user){
            return res.json({success:false,message:"User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            fullName,
            email,
            password:hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        res.json({success:true,userData:newUser,token,message:"Account created successfully"});

    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
};

// Login a user
export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        const userData= await User.findOne({email});

        const isPasswordMatched = await bcrypt.compare(password,userData.password);

        if(!isPasswordMatched){
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = generateToken(userData._id);

        res.json({success:true,userData,token,message:"Login successful"});
        
    }catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
};

// controller to check if user is authenticated
export const isAuthenticated = (req,res) => {
    res.json({success:true,user:req.user});
      
};

// controller to update profile details
export const updateProfile = async (req,res) => {
    try{
        const {profilePic,bio,fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId,{fullName,bio},{new:true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId,{fullName,bio,profilePic:upload.secure_url},{new:true});
        }

        res.json({success:true,user:updatedUser});

    } catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
};

