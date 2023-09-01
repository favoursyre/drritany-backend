///This acts as a middleware for only showing some specified routes to authenticated users

///Libraries -->
import jwt from "jsonwebtoken"
import "dotenv/config";
import {Request, Response, NextFunction} from "express"
import { Admin } from "../models/adminModel";
import { IJwtPayload } from "../utils/interfaces";

///Commencing the app
const SECRET = process.env.SECRET!;

///This funtion handles the requiring of authentication
export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
  //Verify authentication
  const { authorization } = req.headers;
  console.log("Authorization: ", authorization);

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, SECRET) as IJwtPayload;
    req.user = await Admin.find({ _id }).select("_id");
    console.log("Req User: ", req.user);
    next();
  } catch (error) {
    console.log("Require Auth error: ", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};