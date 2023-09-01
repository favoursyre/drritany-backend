///This handles the various routes for the admin pages

///Libraries -->
import { Router } from "express";
import {
    createProductPage,
    updateProductPage,
    deleteProductPage,
    createFAQPage,
    updateFAQPage,
    deleteFAQPage,
    createContactPage,
    updateContactPage,
    deleteContactPage,
    getNewsSubscriberPage,
    deleteNewsSubscriberPage,
    getOrderByIdPage,
    getAllOrderPage,
    createQuotePage,
    updateQuotePage,
    deleteQuotePage,
    deleteTestimonyPage
} from "../controllers/adminController";
//import { requireAuth } from "../middleware/requireAuth";

///Commencing the code
const router = Router();

///This requires auth for all routes below
//router.use(requireAuth);

///Create a new product
router.post("/admin/dashboard/product/add/", createProductPage);

///Update product route
router.patch("/admin/dashboard/product/update/:id", updateProductPage);

///Delete product route
router.delete("/admin/dashboard/product/delete/:id", deleteProductPage);

///Create faq route
router.post("/admin/dashboard/faq/add/", createFAQPage)

///Update faq route
router.patch("/admin/dashboard/faq/update/:id", updateFAQPage)

///Delete faq route
router.delete("/admin/dashboard/faq/delete/:id", deleteFAQPage);

///Create contact route
router.post("/admin/dashboard/contact/add/", createContactPage)

///Update contact route
router.patch("/admin/dashboard/contact/update/:id", updateContactPage)

///Delete contact route
router.delete("/admin/dashboard/contact/delete/:id", deleteContactPage);

///Get all newsletter subscribers route
router.get("/admin/dashboard/newsletter-subscribers/", getNewsSubscriberPage)

///Delete newsletter subscribers route
router.delete("/admin/dashboard/newsletter-subscribers/:id", deleteNewsSubscriberPage)

///Get order by id route
router.get("/admin/dashboard/orders/:id", getOrderByIdPage)

///Get all orders by route
router.get("/admin/dashboard/orders/", getAllOrderPage)

///Create quote route
router.post("/admin/dashboard/quote/", createQuotePage)

///Update quote route
router.patch("/admin/dashboard/quote/:id", updateQuotePage)

///Delete quote route
router.delete("/admin/dashboard/quote/:id", deleteQuotePage)

///Delete testimonial route
router.delete("/admin/dashboard/testimony/:id", deleteTestimonyPage)

export default router;
