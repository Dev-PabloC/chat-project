import app from "../../app/config";
import dotenv from "dotenv"

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`[SERVER] running on port ${process.env.PORT}`);
})