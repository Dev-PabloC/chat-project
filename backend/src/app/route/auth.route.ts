import { Router } from "express";
import { authTypeMiddleware } from "../middleware/authType.middleware";
import { loginController } from "../usecase/auth/login/login.controller";

const authRoute = Router()

authRoute.post("/login", authTypeMiddleware, loginController)

export default authRoute