///This handles the schema for the company's contact

///Libraries -->
import {Schema, model, Types} from "mongoose";
import { IContact, IContactModel } from "../utils/interfaces";

///Commencing the app

///This is the schema for the contact database
const contactSchema = new Schema<IContact, IContactModel>(
  {
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    emailAddress: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
);

/**
 * @notice Static create contact
 * @param contact The contacts of the comnpany as required by IContact
 * @returns The created contact
 */
contactSchema.statics.createContact = async function (
  contact: IContact
) {
  //Create a new contact
  const contact_ = await this.create(contact);

  return contact_;
};

/**
 * @notice Static get all contact
 * @returns All contacts
 */
contactSchema.statics.getAllContact = async function () {
  const contact = await this.find({}).sort({ createdAt: -1 });
  return contact;
};

/**
 * @notice Static update contact
 * @param id The id of the contact to be updated
 * @param req The items to be updated
 * @returns The updated contact
 */
contactSchema.statics.updateContact = async function (id: string, req: IContact) {
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
 * @notice Static delete contact
 * @param id The id of the contact to be deleted
 * @returns The deleted contact
 */
contactSchema.statics.deleteContact = async function (id: string) {
    //Validation of args
  if (!Types.ObjectId.isValid(id)) {
    throw Error("Id is invalid");
  }

  //This deletes the contact from the database
  const delete_ = await this.findOneAndDelete({ _id: id });
  return delete_;
}

export const Contact = model<IContact, IContactModel>("Contact", contactSchema);
