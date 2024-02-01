import { Router } from "express";
import { createUserController } from "../usecase/user/createUser/createUser.controller";
import { createUserTypeMiddleware } from "../middleware/createUser.middleware";
import { tokenMiddleware } from "../middleware/token.middleware";
import { updateUserController } from "../usecase/user/updateUser/updateUser.controller";
import { deleteUserController } from "../usecase/user/deleteUser/deleteUser.controller";
import { getUserController } from "../usecase/user/getUser/getUser.Controller";

const userRoute = Router()

userRoute.get("/",tokenMiddleware,getUserController)
userRoute.post("/", createUserTypeMiddleware,createUserController)
userRoute.patch("/", tokenMiddleware, updateUserController)
userRoute.delete("/", tokenMiddleware, deleteUserController)

export default userRoute