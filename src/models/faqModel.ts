///This handles the schema for FAQs

///Libraries -->
import { Types } from "mongoose";
import {Schema, model} from "mongoose";
import { IFAQ, IFAQModel } from "../utils/interfaces";
import "dotenv/config";

///Commencing the app

///This is the schema for the FAQ database
const faqSchema = new Schema<IFAQ, IFAQModel>(
  {
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
);

/**
 * @notice Static create FAQ
 * @param question The question
 * @param answer The answer to the question
 * @returns The created FAQ
 */
faqSchema.statics.createFAQ = async function (
  question: string,
  answer: string
) {
  //Create a new FAQ
  const faq = await this.create({
    question, answer
  });

  return faq;
};

/**
 * @notice Static get all FAQ
 * @returns All FAQs
 */
faqSchema.statics.getAllFAQ = async function () {
  const faq = await this.find({}).sort({ createdAt: -1 });
  return faq;
};

/**
 * @notice Static update FAQ
 * @param id The id of the FAQ to be updated
 * @param question The new question 
 * @param answer The new answer
 * @returns All FAQs
 */
faqSchema.statics.updateFAQ = async function (id: string, body: Object) {
    //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

   //This updates the value in the database
  const update = await this.findOneAndUpdate(
    { _id: id },
    { ...body }
  );
  return update;
  };

/**
 * @notice Static delete FAQ
 * @param id The id of the FAQ to be deleted
 * @returns The deleted FAQ
 */
faqSchema.statics.deleteFAQ = async function (id: string) {
    //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

  //This deletes the ingredient from the database
  const delete_ = await this.findOneAndDelete({ _id: id });
  return delete_;
}

export const FAQ = model<IFAQ, IFAQModel>("FAQ", faqSchema);
