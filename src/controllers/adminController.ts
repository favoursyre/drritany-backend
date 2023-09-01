///This handles the various functions for the admin page links

///Libraries -->
//import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import {Order} from "../models/orderModel";
import {Product} from "../models/productModel";
import { Quote } from "../models/quoteModel";
import { Testimony } from "../models/testimonyModel";
import { News } from "../models/newsletterModel";
import { FAQ } from "../models/faqModel";
import { Contact } from "../models/contactModel";
import { IView } from "../utils/interfaces";
import "dotenv/config";

///Commencing the app
const SECRET: string = process.env.SECRET!;

/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };

/**
 * @notice Create product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createProductPage = async (req: Request, res: Response): Promise<void> => {
    try {
     const { category,
        subCategory,
        name,
        images,
        videos,
        price,
        orders,
        description,
        specification } = req.body
      const product = await Product.createProduct(category,
        subCategory,
        name,
        images,
        videos,
        price,
        orders,
        description,
        specification)
      res.status(200).json(product);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

/**
 * @notice Update product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const updateProductPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const product = await Product.updateProduct(id, req.body)
        res.status(200).json(product);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Delete product page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const deleteProductPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const product = await Product.deleteProduct(id);
        res.status(200).json(product);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Create FAQ page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createFAQPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { question, answer } = req.body
      
        const faq = await FAQ.createFAQ(question, answer)
        console.log("Body: ", faq)
        res.status(200).json(faq);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Update faq page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const updateFAQPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const faq = await FAQ.updateFAQ(id, req.body)
        res.status(200).json(faq);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Delete faq page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const deleteFAQPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const faq = await FAQ.deleteFAQ(id)
        res.status(200).json(faq);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Create contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const createContactPage = async (req: Request, res: Response): Promise<void> => {
  try {
      const faq = await Contact.createContact(req.body)
      console.log("Body: ", faq)
      res.status(200).json(faq);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Update contact page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const updateContactPage = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params
      const faq = await Contact.updateContact(id, req.body)
      res.status(200).json(faq);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
* @notice Delete contact page route
* @param req The params that were passed in during the client request
* @param res The response of the query by client request
*/
export const deleteContactPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const faq = await Contact.deleteContact(id)
      res.status(200).json(faq);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get newsletter subscribers page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getNewsSubscriberPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const subsribers = await News.getAllSubscriber()
        res.status(200).json(subsribers);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Delete newsletter subscribers page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const deleteNewsSubscriberPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const susbcriber = await News.deleteSubscriber(id)
        res.status(200).json(susbcriber);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Get order by id page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getOrderByIdPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
      const order = await Order.getOrderById(id)
      res.status(200).json(order);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Get all orders page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getAllOrderPage = async (req: Request, res: Response): Promise<void> => {
  try {
      const orders = await Order.getOrders()
      res.status(200).json(orders);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Create quote page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createQuotePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { quote: quote_ } = req.body
      const quote = await Quote.createQuote(quote_)
      res.status(200).json(quote);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
}

/**
 * @notice Update quote page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const updateQuotePage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const quote = await Quote.updateQuote(id, req.body)
    res.status(200).json(quote);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
}

/**
 * @notice Delete quote page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const deleteQuotePage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const quote = await Quote.deleteQuote(id)
      res.status(200).json(quote);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
  }

/**
 * @notice Delete testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const deleteTestimonyPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const testimony = await Testimony.deleteTestimony(id)
      res.status(200).json(testimony);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
  }



