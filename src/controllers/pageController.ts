///This handles the various functions for the page links

///Libraries -->
//import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import { Order} from "../models/orderModel";
import {Product} from "../models/productModel";
import { Quote } from "../models/quoteModel";
import { Testimony } from "../models/testimonyModel";
import { News } from "../models/newsletterModel";
import { FAQ } from "../models/faqModel";
import { Contact } from "../models/contactModel";
import { IView, IClientInfo } from "../utils/interfaces";
import { Inquiry } from "../models/inquiryModel";
import { lookup, Lookup } from "geoip-lite"
import { updateSheet, getUSDRate, countryList, sendSubnewsletterEmail } from "../utils/utils";
import "dotenv/config";

///Commencing the app
const SECRET: string = process.env.SECRET!;
const spreadsheetId: string = process.env.SHEET_ID!;
let group: string = "A"

/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };

/**
 * @notice Home page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const homePage = async (req: Request, res: Response) => {
    try {
      const view: IView = { msg: "Homepage" };
      
      console.log("Naira: \u20A6")
      res.status(200).json(view);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

/**
 * @notice Get product by order route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const getProductPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.getProductByOrder()
      res.status(200).json(products);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
* @notice Get all quotes route
* @param req The params that were passed in during the client request
* @param res The response of the query by client request
*/

export const getQuotePage = async (req: Request, res: Response): Promise<void> => {
   try {
    const quotes = await Quote.getAllQuote()
       res.status(200).json(quotes);
     } catch (error) {
       const error_: IView = {msg: `${error}`}
       res.status(400).json(error_);
     }
}

/**
 * @notice Contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const contactPage = (req: Request, res: Response) => {
    try {
        const view: IView = { msg: "Contactpage" };
        res.status(200).json(view);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice About page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const aboutPage = (req: Request, res: Response) => {
    try {
        const view: IView = { msg: "Aboutpage" };
        res.status(200).json(view);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Search page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const searchProductPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.query as string
      //console.log("Query search: ", query)
        const products = await Product.getProductBySearch(query)
        res.status(200).json(products);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Cart page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const cartPage = (req: Request, res: Response) => {
    try {
        const view: IView = { msg: "Cartpage" };
        res.status(200).json(view);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const orderPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customerSpec, productSpec } = req.body;
      const order = await Order.processOrder(customerSpec, productSpec)
        res.status(200).json(order);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 * @privateRemarks The sort values ranges from;
 * 0 = Newest arrivals, 1 = Price: High to Low, 2 = Price: Low to High
 */
export const productSortPage = async (req: Request, res: Response): Promise<void> => {
    try {
        let products: Array<Object>
        const { sort: sort_ } = req.params
        const sort = Number(sort_)

        ///Checking to see what sort values were passed in
        switch (sort) {
          case 1:
            products = await Product.getProductByLatest()
            break
          case 2:
            products = await Product.getProductByPrice("desc")
            break
          case 3:
            products = await Product.getProductByPrice("asc")
            break
          default:
            throw Error("A wrong sort argument was passed in, Note: 0 = Newest arrivals, 1 = Price: High to Low, 2 = Price: Low to High")
        }

        res.status(200).json(products);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Product details page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const productInfoPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.getProductById(id);
        //const products = await Product.getProductByOrder("desc")
        res.status(200).json(product);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice FAQ page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const faqPage = async (req: Request, res: Response): Promise<void> => {
  try {
      const faqs = await FAQ.getAllFAQ();
      res.status(200).json(faqs);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Terms of service page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const termsPage = (req: Request, res: Response): void => {
  try {
      const view: IView = { msg: "Termspage" };
      res.status(200).json(view);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Privacy policy page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const privacyPage = (req: Request, res: Response) => {
  try {
      const view: IView = { msg: "privacyPage" };
      res.status(200).json(view);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getTestimonyPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonials = await Testimony.getAllTestimony()
    res.status(200).json(testimonials);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
}

/**
 * @notice Get contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const getContactPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.getAllContact()
    res.status(200).json(contacts);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
}

/**
 * @notice Subscribe to news letter page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createNewsSubscriberPage = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Body: ", req.body)
    //const { subscriber } = req.body
    //Add the subscriber to the database
    const sub = await News.createSubscriber(req.body)
    console.log("sub: ", req.body)

    ///Send email to subscriber
    const status = await sendSubnewsletterEmail(sub.subscriber)
    console.log("Email Status: ", status)

    console.log("New Subscriber: ", sub)
    res.status(200).json(sub);
  } catch (error) {
    console.log("error")
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
}

/**
 * @notice Client details page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getClientInfoPage = async (req: Request, res: Response): Promise<void> => {
  try {
    let countryCode: string
    const { ip } = req.params
    const location: Lookup | null = lookup(ip)
    if (location) {
      countryCode = location.country
    } else {
      countryCode = "US"
    }
    const clientCountry: Array<IClientInfo> = countryList.filter(c => c["countryCode"] === countryCode)
    const client: IClientInfo = clientCountry[0]
    const usdRate = await getUSDRate(clientCountry[0].currency || "USD")

    ///Getting the client info
    const clientInfo: IClientInfo = {
      country: client.country,
      countryCode: client.countryCode,
      currency: client.currency,
      currencySymbol: client.currencySymbol,
      exchangeRate: usdRate,
      groupTest: group
    }

    ///Updating the group value
    if (group === "A") {
      group = "B"
    } else if (group === "B") {
      group = "A"
    }
    console.log("group updated")

    res.status(200).json(clientInfo);
  } catch (error) {
    console.log("error")
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
}

//Make inquiry Page
export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    //console.log('Inquiry: ', req.body)
    //Save inquiry to database
    const inquiry = await Inquiry.sendInquiry(req.body)

    //Send email to user who made the inquiry

    console.log('Inquiry: ', inquiry)
      res.status(200).json(inquiry);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

