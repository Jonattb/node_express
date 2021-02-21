import { Router } from "express";

// Controllers
import UserController from "@/app/controllers/UserController"
import AuthController from "@/app/controllers/AuthController"

// Middleware
import validator from "@/app/middleware/validator"
import isAuth from "@/app/middleware/isAuth"

const router = Router();


router.post( "/createaccount", validator( "createaccount" ), UserController.createAccount )
router.post( "/login", validator( "login" ), AuthController.login )
router.get( "/user/authenticated", isAuth, UserController.getAuthenticatedUser );


router.get( "/users", UserController.get )
router.get( "/users/find", UserController.findUserByEmail )

export default router;