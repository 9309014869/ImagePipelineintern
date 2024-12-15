
import { ApiError } from '../Utils/ApiError.js';
import { asyncHandler } from '../Utils/asyncHandler.js';
import { ApiResponse } from '../Utils/ApiResponse.js';

import User from '../Models/user.model.js';


import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { json } from 'express';

const registerUser = asyncHandler( async (req,res) => {
    console.log("i am inside registe file");
  

    const { email, fullname, username, password} = req.body;

    console.log("Received registration data:");
    console.log("Email:", email);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log(password , fullname);

   
    if([email, fullname, username, password].some((field) => field.trim() === "")) {
        throw new ApiError(400,"One of the field is empty All field is required");
    }

    const existeduser = await User.findOne({
        $or: [ 
            { email },{ username } 
        ]
    });

    if(existeduser) {
        throw new ApiError(409,"Username with email or Password is already exists");
    }

    const saltRounds = 12;

    const hashpassword = bcrypt.hashSync(password, saltRounds);
           
    const user = await User.create({
        username : username.toLowerCase(),
        email : email,
        fullname : fullname,
        password : hashpassword ,
    })

    const token = jwt.sign(
        { 
            _id: user._id, 
            username: user.username, 
            email: user.email 
        }, 
        'akashtayade', 
        { 
            expiresIn: '10d'
        }
    );
    
    const createdUser = await User.findById(user._id)
    .select("-password");

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong While creating the User");
    }
    
    return res
        .status(200)
        .json(
            new ApiResponse(200, 
                { user: createdUser , token },
                "User logged in successfully"
            )
        );

})

const loginUser = asyncHandler( async (req,res) => {
    
   

    const { username, password } = req.body;

    if(!username || !password){
        throw new ApiError(400,"username of password field is empty");
    }

    const user = await User.findOne( {username} );

    if(!user) {
        throw new ApiError(400,"User not found in database");
    }

    const isPasswordvalidate = await bcrypt.compare(password, user.password);

    if(!isPasswordvalidate) {
        throw new ApiError(400,"Incorrect password");
    }

    const token = jwt.sign(
        { 
            _id: user._id, 
            username: user.username, 
            email: user.email 
        }, 
        'akashtayade', 
        { 
            expiresIn: '10d'
        }
    );

    const loggedinUser = await User.findById(user._id)
    .select("-password");
    
    return res
        .status(200)
        .json(
            new ApiResponse(200, 
                { user: loggedinUser,token },
                "User logged in successfully"
            )
        );

})

const validateToken = asyncHandler( async (req,res) => {
    return res.status(200).json(new ApiResponse(200, null, 'Token is valid'));
})

const   getUserLogin =asyncHandler(async(req,res)=>{
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "User is not authenticated");
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    console.log(user.username);
    return res.status(200).json(
        new ApiResponse(200, { user }, "User details fetched successfully")
    );
}) 


export {
    registerUser,
    loginUser,
    getUserLogin,
    validateToken,///http://localhost:3000/api/v1/user/getUser
}
