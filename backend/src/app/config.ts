import express from "express"
import morgan from "morgan"
import routes from "./route"

const app = express()

//configs
app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))

//routes import
app.get("/", (_, res) => {
    res.send({ message: "hello world" })
})
app.use("/api", routes)

export default app