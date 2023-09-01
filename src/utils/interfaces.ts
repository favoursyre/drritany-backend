///This would contain all interfaces that will be used

///Libraries -->
import { Model } from 'mongoose';

///Commencing the code
///Declaring the various interfaces
export interface IView {
    msg: String
}

///Declaring the interface for specification 
export interface ISpecification {
    brand?: String,
    itemForm?: String,
    itemCount?: number,
    userAgeRange?: String,
    gender?: String,
    benefits?: Array<String>,
    prescription?: Array<String>,
    ingredients?: Array<String>,
    productOrigin?: String,
    weight?: number
}

///Declaring the interface for customer order
export interface ICustomerSpec {
    readonly fullName: string,
    readonly email: string,
    readonly phoneNumbers: Array<string | undefined>,
    readonly country: string,
    readonly state: string,
    readonly deliveryAddress: string,
    readonly postalCode: string
}

///Declaring the interface for cart term
export interface ICartItem {
    readonly _id: string,
    readonly image: string,
    readonly name: string,
    readonly unitPrice: number,
    quantity: number,
    subTotalPrice: number
} 

///Declaring the interface for the cart
export interface ICart {
  totalPrice: number,
  cart: Array<ICartItem>
}

/**
 * @notice The interface for JWTPayload
 * @param _id The id of JWT
 */
 export interface IJwtPayload {
    _id: String
}

/**
 * @notice The interface for Admin mongoose schema
 * @param emailAddress The email address of the admin
 * @param password The password of the admin
 */
export interface IAdmin {
  emailAddress: String,
  password: string
}

/**
 * @notice The interface for Admin mongoose schema static
 */
export interface IAdminModel extends Model<IAdmin> {
  createAdmin(): Array<Object>,
  login(emailAddress: String, password: String): Object,
  updateAdmin(emailAddress: String, password: String): Object,
  deleteAdmin(id: String): Object
}

/**
 * @notice The interface for FAQ mongoose schema
 * @param question The question 
 * @param answer The answer to the question
 */
 export interface IFAQ {
    question: String,
    answer: String
  }

/**
 * @notice The interface for FAQ mongoose schema static
 */
 export interface IFAQModel extends Model<IFAQ> {
    createFAQ(question: String, answer: String): Object,
    getAllFAQ(): Object,
    updateFAQ(id: string, body: Object): Object,
    deleteFAQ(id: string): Object
  }  

/**
 * @notice The interface for order mongoose schema
 * @param question The question 
 * @param answer The answer to the question
 */
 export interface IOrder {
    _id?: string,
    customerSpec: ICustomerSpec,
    productSpec: ICart,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
}

/**
 * @notice The interface for Order mongoose schema static
 */
 export interface IOrderModel extends Model<IOrder> {
    processOrder(customerSpec: ICustomerSpec, productSpec: ICart): IOrder,
    getOrders(): Array<IOrder>,
    getOrderById(id: string): IOrder
  }  

/**
 * @notice The interface for product mongoose schema
 */
 export interface IProduct {
    category?: String,
    subCategory?: String,
    name?: String,
    images?: Array<String>,
    videos?: Array<String>,
    price?: number,
    slashedPrice?: number,
    orders?: number,
    description?: String,
    specification?: ISpecification
}

/**
 * @notice The interface for product mongoose schema static
 */
 export interface IProductModel extends Model<IProduct> {
    createProduct(
        category: String,
        subCategory: String,
        name: String,
        images: Array<String>,
        videos: Array<String>,
        price: number,
        orders: number,
        description: String,
        specification: ISpecification
      ): Object,
    updateProduct(id: String, body: IProduct): Object,
    deleteProduct(id: String): Object,
    getProductByLatest(): Array<Object>,
    getProductById(id: String): Object,
    getProductByCategory(category: String): Array<Object>,
    getProductByPrice(_order: any): Array<Object>,
    getProductByOrder(): Array<Object>,
    getProductBySearch(query: string): Array<Object>
  } 

/**
 * @notice The interface for quote mongoose schema
 * @param author The author of the quote
 * @param quote The quote made by the author
 */
 export interface IQuote {
    quote: String
  }

/**
 * @notice The interface for quote mongoose schema static
 */
 export interface IQuoteModel extends Model<IQuote> {
    createQuote(quote: String): Object,
    getAllQuote(): Object,
    updateQuote(id: String, req: Object): Object,
    deleteQuote(id: String): Object
  }  

/**
 * @notice The interface for contact mongoose schema
 * @param phoneNumber The phone number of the company
 * @param emailAddress The email address of the company
 */
 export interface IContact {
  phoneNumber?: string,
  emailAddress?: string
}

/**
* @notice The interface for contact mongoose schema static
*/
export interface IContactModel extends Model<IContact> {
  createContact(contact: IContact): Object,
  getAllContact(): Object,
  updateContact(id: String, req: IContact): Object,
  deleteContact(id: String): Object
}  

/**
 * @notice The interface for newsletter subscribers mongoose schema
 * @param subscriber The email address of the subscriber
 */
 export interface INews {
    _id?: string,
    subscriber: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: number
  }

/**
 * @notice The interface for newsletter subscribers mongoose schema static
 */
 export interface INewsModel extends Model<INews> {
    createSubscriber(subscriber: INews): INews,
    getAllSubscriber(): Array<INews>,
    deleteSubscriber(id: string): INews
  }  

/**
 * @notice The interface for testimonials mongoose schema
 * @param name Name of the testifier
 * @param image Image of the testifier
 * @param profession Profession of the testifier
 * @param testimony Testimony of the testifier
 */
 export interface ITestimony {
    name?: String,
    image?: String,
    profession?: String,
    testimony?: String
  }

/**
 * @notice The interface for testimonials mongoose schema static
 */
 export interface ITestimonyModel extends Model<ITestimony> {
    createTestimony(body: ITestimony): Object,
    getAllTestimony(): Object,
    updateTestimony(id: string, req: ITestimony): Object,
    deleteTestimony(id: string): Object
  } 
  
/**
 * @notice The interface for client info
 * @param country The country of the client
 */
export interface IClientInfo {
  country?: string,
  countryCode?: string,
  currency?: string,
  currencySymbol?: string,
  exchangeRate?: number,
  groupTest?: string
}

///Declaring the interface for inquiry
export interface IInquiry {
  _id?: string,
  firstName: string,
  lastName: string,
  emailAddress: string, 
  message: string
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

///Declaring the interface for inquiry mongoose schema static
export interface IInquiryModel extends Model<IInquiry> {
  sendInquiry(inquiry: IInquiry): Array<IInquiry>,
  getAllInquiry(): Array<IInquiry>
}

//Declaring interface for google sheet
export interface ICredentialBody {
  client_email?: string;
  private_key?: string;
}

