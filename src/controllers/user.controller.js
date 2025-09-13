import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
     res.status(200).json({
        message: "ok"
     })

     const {username, fullName, email, password} = req.body;
     console.log("email: ", email)

if(
   [fullName, email, username, password].some((field)=> field?.trim()==="")
) {
   throw new ApiError(400, "All fields are required")
}


// now checking ttha whether it is already exist or present or not like the user
const existedUser = User.findOne({
   $or: [ { email }, { username } ]
})
     if(existedUser){
      throw new ApiError(409, "User with email or username already exists")
     }
// since in the route we have used the middleware like the multer and that multer gives us the req.file path like the express gives the req.body so same the multer gives too. And this ? sign is used for the optionality like the options 

const avatarLocalPath =  req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
   throw new ApiError(400, "Avatar is required")
}

const avatar =  await uploadOnCloudinary(avatarLocalPath)
const coverImage =  await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
      throw new ApiError(400, "Avatar is required")
}

const user = await User.create({
   fullName,
   avatar: avatar.rl,
   coverImage: coverImage?.url || "",
   email,
   password,
   username: username.toLowerCase()
})
 
const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
)

if(!createdUser){
   throw new ApiError(500, "Something went wrong while registering the user")
}

})

return res.status(201).json(
   new ApiResponse(200, createdUser, "User registered Successfully")
)

export {registerUser}

// STEPS BEFORE SOLVING THE PROBLEM OF REGISTERING THE USER:

// 1: get user details from teh frontend 
// 2: validation- not empthy
// 3: check if user already exists: username, email
// 4: check for images, check for avators
// 5: upload them to cloudinary, check for avaotr that whether it is uploaded
// 6: create user object - create entry in db
// 7: remove password and refresh token field from the response
// 8: check for user creation
// 9: return response