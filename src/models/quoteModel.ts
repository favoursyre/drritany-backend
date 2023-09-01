///This handles the schema for Quotes

///Libraries -->
import {Schema, model, Types} from "mongoose";
import { IQuote, IQuoteModel } from "../utils/interfaces";

///Commencing the app

///This is the schema for the quote database
const quoteSchema = new Schema<IQuote, IQuoteModel>(
  {
    quote: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
);

/**
 * @notice Static create quote
 * @param author The author of the quote
 * @param quote The quote made by the author
 * @returns The created quote
 */
quoteSchema.statics.createQuote = async function (
  quote: string
) {
  //Create a new quote
  const quote_ = await this.create({ quote });

  return quote_;
};

/**
 * @notice Static get all quote
 * @returns All quotes
 */
quoteSchema.statics.getAllQuote = async function () {
  const quote = await this.find({}).sort({ createdAt: -1 });
  return quote;
};

/**
 * @notice Static update quote
 * @param id The id of the quote to be updated
 * @param req The items to be updated
 * @returns The updated quote
 */
quoteSchema.statics.updateQuote = async function (id: string, req: Object) {
    //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

   //This updates the value in the database
  const update = await this.findOneAndUpdate(
    { _id: id },
    { ...req }
  );
  return update;
  };

/**
 * @notice Static delete quote
 * @param id The id of the quote to be deleted
 * @returns The deleted quote
 */
quoteSchema.statics.deleteQuote = async function (id: string) {
    //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

  //This deletes the quote from the database
  const delete_ = await this.findOneAndDelete({ _id: id });
  return delete_;
}

export const Quote = model<IQuote, IQuoteModel>("Quote", quoteSchema);
