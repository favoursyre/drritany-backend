//This handles the various user pages for the ecommerce website

//Libraries -->
import { IRouter, Router } from "express";
import {
    createTestimonyPage,
    updateTestimonyPage,
    getOrderPage,
    createOrderPage
} from "../controllers/userController";

//Commencing the app
const router: IRouter = Router();

///This requires auth for all routes below
//router.use(requireAuth);

///Create testimony route
router.post("/user/dashboard/testimonial/add/", createTestimonyPage)

///Update testimony route
router.patch("/user/dashboard/testimonial/:id", updateTestimonyPage)

//Cart route
router.get("/user/dashboard/order/:id", getOrderPage);

//Order route
router.post("/user/dashboard/order", createOrderPage);

export default router;
