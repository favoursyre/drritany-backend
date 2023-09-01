///This handles the schema for subscribers of newsletter

///Libraries -->
import {Schema, model, Types} from "mongoose";
import { INews, INewsModel } from "../utils/interfaces";

///Commencing the app

///This is the schema for the newsletter subscribers database
const newsSchema = new Schema<INews, INewsModel>(
  {
    subscriber: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
);

/**
 * @notice Static create newsletter subscriber
 * @param subscriber The email address of the subscriber
 * @returns The created subscriber
 */
newsSchema.statics.createSubscriber = async function (
  subscriber: INews
) {
  //Validatiing the args
  // if (!validator.isEmail(subscriber)) {
  //   throw Error("Email not valid");
  // }

  //Create a new quote
  const subscriber_ = await this.create(subscriber);

  return subscriber_;
};

/**
 * @notice Static get all subscribers
 * @returns All subscribers
 */
newsSchema.statics.getAllSubscriber = async function () {
  const subscriber = await this.find({}).sort({ createdAt: -1 });
  return subscriber;
};

/**
 * @notice Static update subscriber
 * @param id The id of the quote to be updated
 * @param req The items to be updated
 * @returns The updated quote
 */
// quoteSchema.statics.updateQuote = async function (id: string, req: Object) {
//     //Validation of args
//   if (!Types.ObjectId.isValid(id)) {
//     throw Error("Id is invalid");
//   }

//    //This updates the value in the database
//   const update = await this.findOneAndUpdate(
//     { _id: id },
//     { ...req }
//   );
//   return update;
//   };

/**
 * @notice Static delete subscriber
 * @param id The id of the subscriber to be deleted
 * @returns The deleted subscriber
 */
newsSchema.statics.deleteSubscriber = async function (id: string) {
    //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

  //This deletes the quote from the database
  const delete_ = await this.findOneAndDelete({ _id: id });
  return delete_;
}

export const News = model<INews, INewsModel>("News", newsSchema);
