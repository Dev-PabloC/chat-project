import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";

const routes = Router()

routes.use("/users", userRoute)
routes.use("/auth", authRoute)

export default routes