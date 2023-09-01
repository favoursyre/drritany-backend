//This handles the various pages for the ecommerce website

//Libraries -->
import { IRouter, Router } from "express";
import {
  homePage,
  aboutPage,
  contactPage,
  searchProductPage,
  faqPage,
  termsPage,
  privacyPage,
  getProductPage,
  getQuotePage,
  getContactPage,
  productInfoPage,
  productSortPage,
  getTestimonyPage,
  createNewsSubscriberPage,
  getClientInfoPage,
  createInquiry
} from "../controllers/pageController";

//Commencing the app
const router: IRouter = Router();

//Homepage
router.get("/", homePage);

//About route
router.get("/about", aboutPage); 

//Contact-Us route
router.get("/contact", contactPage);

//Search route
router.get("/products/search", searchProductPage)

///Get all products route
router.get("/products/", getProductPage)

///Product info route
router.get("/product/info/:id", productInfoPage)

///Sort product route
router.get("/products/sort/:sort", productSortPage)

///Get all quotes route
router.get("/quotes/", getQuotePage)

///Get all testimony route
router.get("/testimony", getTestimonyPage)

///Get all contact route
router.get("/contacts", getContactPage)

///Get all faq route
router.get("/faqs", faqPage)

//Login route
//router.get("/login", loginPage);

//Signup route
//router.post("/signup", signupPage);

//Terms of services route
router.get("/terms-of-service", termsPage)

//Privacy Policy route
router.get("/privacy-policy", privacyPage)

//Create admin
// router.post("/admin-create", createAdminPage)

// //Admin Login
// router.post("/admin/login", loginAdminPage)

// //Admin change password
// router.post("/admin/change-password", updateAdminPage)

///Subscribe to newsletter route
router.post("/newsletter-subsriber/add/", createNewsSubscriberPage)

///Get client info route
router.get("/client-info/:ip", getClientInfoPage)

///Send inquiry route
router.post("/inquiry/add/", createInquiry)

export default router;
