///This handles the various functions for the user page links

///Libraries -->
//import jwt from "jsonwebtoken";
import { Request, Response } from "express"
import {Order} from "../models/orderModel";
import { Testimony } from "../models/testimonyModel";
import { IView } from "../utils/interfaces";
import { updateSheet, getCurrentDate, getCurrentTime } from "../utils/utils";
import "dotenv/config";

///Commencing the app
const SECRET: string = process.env.SECRET!;
const spreadsheetId: string = process.env.SHEET_ID!;

/**
 * @notice This function creates a jwt
 * @param _id The id of the user
 */
// const createToken = (_id: string) => {
//   return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
// };

/**
 * @notice Create testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createTestimonyPage = async (req: Request, res: Response): Promise<void> => {
    try {
      const testimony = await Testimony.createTestimony(req.body)
      res.status(200).json(testimony);
    } catch (error) {
      const error_: IView = {msg: `${error}`}
      res.status(400).json(error_);
    }
};

/**
 * @notice Update testimony page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
 export const updateTestimonyPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const testimony = await Testimony.updateTestimony(id, req.body)
    res.status(200).json(testimony);
  } catch (error) {
    const error_: IView = {msg: `${error}`}
    res.status(400).json(error_);
  }
};

/**
 * @notice View cart page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const getOrderPage = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const cart = await Order.getOrderById(id)
        res.status(200).json(cart);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}

/**
 * @notice Create order page route
 * @param req The params that were passed in during the client request
 * @param res The response of the query by client request
 */
export const createOrderPage = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Body: ', req.body)
        const { customerSpec, productSpec, clientInfo } = req.body

        //Processing order
        const order = await Order.processOrder(customerSpec, productSpec)
        console.log("Order: ", order)
        
        //Adding the order to the spreadsheet
        const { customerSpec: customer, productSpec: product } = order
        const c = customer
        const p = product.cart
        console.log('Number: ', c.phoneNumbers[0])

        for (let i = 0; i < p.length; i++) {
          const data = [
            order._id,
            c.fullName,
            c.email,
            c.phoneNumbers[0],
            c.phoneNumbers[1],
            c.country,
            c.state,
            c.deliveryAddress,
            c.postalCode,
            p[i].name,
            p[i].quantity,
            Math.round(p[i].unitPrice * clientInfo.exchangeRate),
            Math.round(p[i].subTotalPrice * clientInfo.exchangeRate),
            getCurrentDate(),
            getCurrentTime(),
            clientInfo.groupTest
          ]
          console.log("Metadata: ", await updateSheet(data))
        }
        

        //Sending the emails

        
        
        res.status(200).json(order);
      } catch (error) {
        const error_: IView = {msg: `${error}`}
        res.status(400).json(error_);
      }
}
