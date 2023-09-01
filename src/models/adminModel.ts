///This handles the schema for the admin

///Libraries -->
import bcrypt from "bcryptjs";
import validator from "validator";
import {Schema, model} from "mongoose";
import { IAdmin, IAdminModel } from "../utils/interfaces";
import "dotenv/config";

//Commencing the app
const ADMIN_EMAIL: Array<string> = [process.env.ADMIN_EMAIL1!, process.env.EMAIL2!];
const ADMIN_PASSWORD: Array<string> = [process.env.ADMIN_PASSWORD1!, process.env.ADMIN_PASSWORD2!];
const create: boolean = false;

///This is the schema for the admin database
const adminSchema = new Schema<IAdmin, IAdminModel>(
  {
    emailAddress: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

/**
 * @notice Static create admin method
 * @returns The created admins
 */
adminSchema.statics.createAdmin = async function () {
  ///This acts as a modifier check for the function
  if (create === false) {
    throw Error("This function can only be ran once")
  }

  let admins: Array<Object | void> = []
  for (let i: number = 0; i < 2; i++) {
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD[i], salt);
    if (!validator.isEmail(ADMIN_EMAIL[i])) {
      throw Error("Email not valid");
    }
    const emailAddress = ADMIN_EMAIL[i];
    const password = passwordHash;
    const admin = await this.create({
      emailAddress,
      password,
  });
    admins.push(admin)
  }
  
  return admins;
};

/**
 * @notice Static login method
 * @param emailAddress The email address of the admin
 * @param password The password for login in
 * @returns The logged in admin
 */
adminSchema.statics.login = async function (emailAddress: string, password: string) {
  //Validation of args
  if (!validator.isEmail(emailAddress)) {
    throw Error("Email not valid");
  }

  //Processing the login process
  const admin = await this.findOne({ emailAddress });
  if (!admin) {
    throw Error("Incorrect email");
  }

  const passwordStatus = await bcrypt.compare(password, admin.password);
  if (!passwordStatus) {
    throw Error("Incorrect password");
  }

  return admin;
};

/**
 * @notice Static update method
 * @param emailAddress The email address of the admin
 * @param password The password for login in
 * @returns The updated admin
 */
adminSchema.statics.updateAdmin = async function (emailAddress: string, password: string) {
  //Validation of args
  if (!validator.isEmail(emailAddress)) {
    throw Error("Email not valid");
  }

  //Processing the login process
  const admin = await this.findOne({ emailAddress });
  if (!admin) {
    throw Error("Email doesn't exist");
  }

  //Updating the admin
  const newAdmin = await this.findOneAndUpdate(
    { emailAddress: emailAddress },
    { emailAddress, password }
  );

  return newAdmin;
};

/**
 * @notice Static delete method
 * @param id The id of the admin data
 * @returns The deleted admin
 */
adminSchema.statics.deleteAdmin = async function (id: string) {};

export const Admin = model<IAdmin, IAdminModel>("Admin", adminSchema);
