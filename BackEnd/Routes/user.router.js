
import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.middleware.js";
import { upload } from '../Middleware/muilter.middleware.js';
const router = Router();

import { 
    registerUser,
    loginUser,
    validateToken,
    getUserLogin
 } from '../Controller/user.controller.js';
import {
    ImagePush
} from '../Controller/image.controller.js';
 router.route('/login').post(loginUser);
 console.log("i am in userrouter.js file");
 router.route('/register').post(registerUser);
 router.route("/getUser").get(verifyJWT, getUserLogin);


 router.route('/validate-token', verifyJWT).get(validateToken);
 router.route("/create").post(verifyJWT, upload.single("posts"), ImagePush)


export default router;