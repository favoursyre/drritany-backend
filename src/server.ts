///This handles the server for Dr Lindsey

///Libraries -->
import express, {Application, Request, Response, NextFunction} from "express"
import mongoose from "mongoose"
import "dotenv/config";
import cors from "cors"
import pageRoutes from "./routes/pageRoute"
import adminRoutes from "./routes/adminRoute"
import userRoutes from "./routes/userRoute"

///Commencing with the app
const app: Application = express()
const PORT: number = Number(process.env.PORT);
//console.log("mongo: ", process.env.MONGO_URL)
const MONGO_URL: string = process.env.MAIN_MONGO_URL!;
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

///The middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  //console.log("Middleware: ", req.path, req.method, res);
  next();
});
app.use(cors(corsOptions));

///The routes
app.use("/", pageRoutes);
app.use("/", adminRoutes);
app.use("/", userRoutes);

///Connecting the app to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    //Listen for requests
    app.listen(PORT, () => {
      console.log("Server connected to DB and listening on port", PORT);
    });
  })
  .catch((error: string) => {
    console.log("DB Error: ", error);
  });