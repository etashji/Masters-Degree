// This data file should export all functions using the ES6 standard as shown in the lecture code
import {products} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import helpers from '../helpers.js';

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
  productName = helpers.checkString(productName, 'product name');
  productDescription = helpers.checkString(productDescription, 'product description');
  modelNumber = helpers.checkString(modelNumber, 'model number');
  price = helpers.checkPrice(price);
  manufacturer = helpers.checkString(manufacturer, 'manufacturer');
  manufacturerWebsite = helpers.checkWebsite(manufacturerWebsite); 
  keywords = helpers.checkStringArray(keywords, 'keywords');
  categories = helpers.checkStringArray(categories, 'categories');
  dateReleased = helpers.checkDate(dateReleased);
  discontinued = helpers.checkBoolean(discontinued);
  let reviews = [];
  let averageRating = 0;
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
    'discontinued': discontinued,
    'reviews': reviews,
    'averageRating': averageRating
  }
  const productCollection = await products();
  const newInsertInformation = await productCollection.insertOne(newProduct);
  if (!newInsertInformation.insertedId) throw 'Insert failed!';

  return await get(newInsertInformation.insertedId.toString());
};

const getAll = async () => {
  const productCollection = await products();
  const productList = await productCollection.find({}).project({_id: 1, productName: 1}).toArray();
  for (let i in productList) {
    productList[i]._id = productList[i]._id.toString();
  }
  return productList;
};

const get = async (productId) => {
  productId = helpers.checkId(productId);
  const productCollection = await products();
  const product = await productCollection.findOne({_id: new ObjectId(productId)});
  if (!product) throw 'Error: Product not found.';
  product._id = product._id.toString();
  for (let i in product.reviews) {
    product.reviews[i]._id = product.reviews[i]._id.toString();
  }
  return product;
};

const remove = async (productId) => {
  productId = helpers.checkId(productId);
  const productCollection = await products();
  const deletionInfo = await productCollection.findOneAndDelete({_id: new ObjectId(productId)});
  if (!deletionInfo) throw 'Error: Could not delete user with id of ' + productId + ".";
  deletionInfo._id = deletionInfo._id.toString();
  return {id: productId, deleted: true};
};

const update = async (
  productId,
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
  productId = helpers.checkId(productId);
  productName = helpers.checkString(productName, 'product name');
  productDescription = helpers.checkString(productDescription, 'product description');
  modelNumber = helpers.checkString(modelNumber, 'model number');
  price = helpers.checkPrice(price);
  manufacturer = helpers.checkString(manufacturer, 'manufacturer');
  manufacturerWebsite = helpers.checkWebsite(manufacturerWebsite); 
  keywords = helpers.checkStringArray(keywords, 'keywords');
  categories = helpers.checkStringArray(categories, 'categories');
  dateReleased = helpers.checkDate(dateReleased);
  discontinued = helpers.checkBoolean(discontinued);
  const productCollection = await products();
  const oldProduct = await productCollection.findOne({_id: new ObjectId(productId)});
  if (!oldProduct) throw "Error: Product not found.";
  let averageRating = oldProduct.averageRating;
  let reviews = oldProduct.reviews;
  if (productName === oldProduct.productName && productDescription === oldProduct.productDescription && 
    modelNumber === oldProduct.modelNumber && price === oldProduct.price && manufacturer === oldProduct.manufacturer &&
    manufacturerWebsite === oldProduct.manufacturerWebsite && keywords.toString() === oldProduct.keywords.toString() && 
    categories.toString() === oldProduct.categories.toString() && dateReleased === oldProduct.dateReleased && 
    discontinued === oldProduct.discontinued) return 'New and old products are the same. Nothing is being updated.';
  const productUpdateInfo = {
    'productName': productName,
    'productDescription': productDescription,
    'modelNumber': modelNumber,
    'price': price,
    'manufacturer': manufacturer,
    'manufacturerWebsite': manufacturerWebsite,
    'keywords': keywords,
    'categories': categories,
    'dateReleased': dateReleased,
    'discontinued': discontinued,
    'reviews': reviews,
    'averageRating': averageRating
  }
  const updateInfo = await productCollection.findOneAndReplace({_id: new ObjectId(productId)}, productUpdateInfo, {returnDocument: 'after'});
  if (!updateInfo) throw 'Error: Update failed, could not find a user with id of ' + id + ".";
  return await get(productId);
};

export { create, getAll, get, remove, update };