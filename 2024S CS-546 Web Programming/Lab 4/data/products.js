import {products} from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';

const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased, 
  discontinued
) => {
  //Error checking

  //All entries
  if (productName === undefined || productDescription === undefined || modelNumber === undefined || price === undefined || 
    manufacturer === undefined || manufacturerWebsite === undefined || keywords === undefined || categories === undefined || 
    dateReleased === undefined || discontinued === undefined) throw 'All fields need to be supplied.';

  //productName
  if (typeof productName !== 'string') throw 'Product name must be a string.';
  productName = productName.trim()
  if (productName.length === 0) throw 'Product name must not be empty and cannot contain only spaces.';

  //productDescription
  if (typeof productDescription !== 'string') throw 'Product description must be a string.';
  productDescription = productDescription.trim()
  if (productDescription.length === 0) throw 'Product description must not be empty and cannot contain only spaces.';

  //modelNumber
  if (typeof modelNumber !== 'string') throw 'Model number must be a string.';
  modelNumber = modelNumber.trim()
  if (modelNumber.length === 0) throw 'Model number must not be empty and cannot contain only spaces.';

  //manufacturer
  if (typeof manufacturer !== 'string') throw 'Manufacturer must be a string.';
  manufacturer = manufacturer.trim()
  if (manufacturer.length === 0) throw 'Manufacturer must not be empty and cannot contain only spaces.';

  //manufacturerWebsite
  if (typeof manufacturerWebsite !== 'string') throw 'Manufacturer website must be a string.';
  manufacturerWebsite = manufacturerWebsite.trim()
  if (manufacturerWebsite.length === 0) throw 'Manufacturer website must not be empty and cannot contain only spaces.';
  if (manufacturerWebsite.substr(0, 11) != 'http://www.') throw 'Manufacturer website must begin with \'http://www.\' (exclude quotations).';
  if (manufacturerWebsite.substr(11, manufacturerWebsite.length - 15).length < 5) 
  throw 'Manufacturer website must have at least 5 characters between \'http://www.\' and \'.com\' (exclude quotations).';
  if (manufacturerWebsite.substr(manufacturerWebsite.length - 4, 4) != '.com') throw 'Manufacturer website must end in \'.com\' (exclude quotations).';

  //dateReleased
  if (typeof dateReleased !== 'string') throw 'Date released name must be a string.';
  dateReleased = dateReleased.trim()
  if (dateReleased.length === 0) throw 'Date released must not be empty and cannot contain only spaces.';
  if (dateReleased.length != 10) throw 'Date released must be in the format of mm/dd/yyyy.';
  if (dateReleased[2] != '/' || dateReleased[5] != '/') throw 'Date released must be in the format of mm/dd/yyyy.';
  let monthString = dateReleased.substr(0, 2);
  let month = Number(monthString);
  if (month.toString() === 'NaN' || month > 12 || month < 1) throw 'The month is not a valid month.';
  let dayString = dateReleased.substr(3, 2);
  let day = Number(dayString);
  if (day.toString() === 'NaN') throw 'The day is not a valid day.';
  let largeMonths = [1, 3, 5, 7, 8, 10, 12];
  let smallMonths = [4, 6, 9, 11];
  if (largeMonths.includes(month)) {
    if (day > 31 || day < 1) throw 'The day is not a valid day.';
  }
  if (smallMonths.includes(month)) {
    if (day > 30 || day < 1) throw 'The day is not a valid day.';
  }
  let yearString = dateReleased.substr(6, 4);
  let year = Number(yearString);
  if (year.toString() == 'NaN') throw "Year is not a valid year.";
  if (month == 2) {
    if (year % 4 == 0) {
      if (day < 0 || day > 29) throw "The day is not a valid day.";
    }
    else {
      if (day < 0 || day > 28) throw "The day is not a valid day.";
    }
  }

  //price
  if (typeof price !== 'number') throw 'Price must be a number.';
  if (price <= 0) throw 'Price must be greater than 0.';
  if (!Number.isInteger(price)) {
    if (price.toString().split(".")[1].length > 2) throw 'Price cannot have more than 2 digits after the decimal.';
  }

  //keywords
  if (!Array.isArray(keywords)) throw 'Keywords must be an array.';
  if (keywords.length == 0) throw 'Keywords cannot be empty.';
  for (let i = 0; i < keywords.length; ++i) {
    if (typeof keywords[i] !== 'string') throw "Keywords must contain only strings.";
    keywords[i] = keywords[i].trim();
    if (keywords[i].length == 0) throw "Each string in keywords cannot be empty or contain only spaces.";
  }

  //categories
  if (!Array.isArray(categories)) throw 'Categories must be an array.';
  if (categories.length == 0) throw 'Categories cannot be empty.';
  for (let i = 0; i < categories.length; ++i) {
    if (typeof categories[i] !== 'string') throw "Categories must contain only strings.";
    categories[i] = categories[i].trim();
    if (categories[i].length == 0) throw "Each string in categories cannot be empty or contain only spaces.";
  }

  //discontinued
  if (typeof discontinued !== 'boolean') throw 'Discontinued must be a boolean.';

  //Enter into database
  const productCollection = await products();
  let newProduct = {
    'productName': productName,
    'productDescription': productDescription,
    'modelNumber': modelNumber,
    'price': price,
    'manufacturer': manufacturer,
    'manufacturerWebsite': manufacturerWebsite,
    'keywords': keywords,
    'categories': categories,
    'dateReleased': dateReleased,
    'discontinued': discontinued
  }

  const insertInfo = await productCollection.insertOne(newProduct);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add product.';

  //Return product
  const id = insertInfo.insertedId.toString();
  const product = await get(id);
  return product;
  

};

//Get all products
const getAll = async () => {
  const productCollection = await products();
  let productList = await productCollection.find({}).toArray();
  return productList;
};

//Get an object by its ID
const get = async (id) => {

  //Error check ID
  if (id === undefined) throw "ID parameter must be supplied.";
  if (typeof id !== 'string') throw "ID must be a string.";
  id = id.trim();
  if (id.length == 0) throw 'ID must not be empty or consist only of spaces.';
  if (!ObjectId.isValid(id)) throw "ID is not a valid object ID.";

  //Get product
  const productCollection = await products();
  const product = await productCollection.findOne({_id: new ObjectId(id)})
  if (product === null) throw 'No product with that id.';
  return product;
};

const remove = async (id) => {
  
  //Error check ID
  if (id === undefined) throw "ID parameter must be supplied.";
  if (typeof id !== 'string') throw "ID must be a string.";
  id = id.trim();
  if (id.length == 0) throw 'ID must not be empty or consist only of spaces.';
  if (!ObjectId.isValid(id)) throw "ID is not a valid object ID.";

  //Delete product
  const productCollection = await products();
  const deletedProduct = await productCollection.findOneAndDelete({'_id': new ObjectId(id)});
  if (!deletedProduct) throw 'No product with that ID.';
  return deletedProduct.productName + ' has been deleted.';

};

const rename = async (id, newProductName) => {

  //Error check ID
  if (id === undefined) throw "ID parameter must be supplied.";
  if (typeof id !== 'string') throw "ID must be a string.";
  id = id.trim();
  if (id.length == 0) throw 'ID must not be empty or consist only of spaces.';
  if (!ObjectId.isValid(id)) throw "ID is not a valid object ID.";

  //Error check newProductName
  if (newProductName == undefined) throw 'New product name must be given.';
  if (typeof newProductName !== 'string') throw 'New product name must be a string.';
  newProductName = newProductName.trim()
  if (newProductName.length === 0) throw 'New product name must not be empty and cannot contain only spaces.';

  //Change product name
  const productCollection = await products();
  const updatedProduct = await productCollection.findOne({'_id': new ObjectId(id)});
  if (!updatedProduct) throw "No product with that ID.";
  if (updatedProduct['productName'] === newProductName) throw 'The new product name must be different from the old product name.';
  updatedProduct['productName'] = newProductName;
  const updatedInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: updatedProduct},
    {returnDocument: 'after'}
  )
  if (!updatedInfo) throw 'Could not update product successfully.'
  return updatedProduct;
};

export { create, getAll, get, remove, rename }