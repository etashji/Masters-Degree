// This data file should export all functions using the ES6 standard as shown in the lecture code
import * as productData from './products.js';
import {ObjectId} from 'mongodb';
import helpers from '../helpers.js';
import {products} from '../config/mongoCollections.js';

const createReview = async (
  productId,
  title,
  reviewerName,
  review,
  rating
) => {
  productId = helpers.checkId(productId);
  const productCollection = await products();
  const productReviewed = await productCollection.findOne({_id: new ObjectId(productId)});
  if (!productReviewed) throw 'Review product not found.';
  title = helpers.checkString(title, "title");
  reviewerName = helpers.checkString(reviewerName, 'reviewer name');
  review = helpers. checkString(review, 'review');
  rating = helpers.checkRating(rating);
  let date = new Date().toLocaleDateString('es-pa');
  let newId = new ObjectId();
  let newReview = new Object();

 newReview = {
    '_id': newId,
    'title': title,
    'reviewDate': date,
    'reviewerName': reviewerName,
    'review': review,
    'rating': rating
  }

  productReviewed.reviews.push(newReview);
  let counter = 0;
  let ratings = 0;
  for (let i in productReviewed.reviews) {
    ratings += productReviewed.reviews[i].rating;
    counter += 1;
  }
  productReviewed.averageRating = Math.round((ratings / counter) *10) / 10;
  
  productReviewed._id = new ObjectId(productId);
  const updateInfo = await productCollection.findOneAndUpdate(
    {_id: new ObjectId(productId)},
    {$set: productReviewed},
    {returnDocument: 'after'}
  );
  if (!updateInfo) throw 'Could not add review to the product with id ' + productId + ".";
  return await productData.get(productId.toString());
};

const getAllReviews = async (productId) => {
  productId = helpers.checkId(productId);
  const product = await productData.get(productId);
  if (product.reviews.length === 0) throw "This product has no reviews.";
  for (let i in product.reviews) {
    product.reviews[i]._id = product.reviews[i]._id.toString();
  }
  return product.reviews;
};

const getReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId);
  const productCollection = await products();
  let review = await productCollection.findOne({'reviews._id': new ObjectId(reviewId)}, {projection: {_id: 0, 'reviews.$': 1}});
  if (!review) throw 'A review with the id ' + reviewId + ' could not be found.';
  review.reviews[0]._id = review.reviews[0]._id.toString();
  return review.reviews[0];
};

const updateReview = async (reviewId, updateObject) => {
  reviewId = helpers.checkId(reviewId);
  const productCollection = await products();
  const product = await productCollection.findOne({'reviews._id': new ObjectId(reviewId)});
  if (!product) throw 'A review with the given id ' + reviewId + ' could not be found.';
  if (!updateObject) throw 'The updateObject was not provided.';
  if (typeof updateObject !== 'object') throw 'The updateObject is not an object.';
  if (Object.keys(updateObject).length === 0) throw 'The updateObject is empty.';
  let oldReview = await getReview(reviewId);
  var newReview = new Object();
  newReview._id = new ObjectId(reviewId);
  let different = false;
  if (updateObject.title === '') throw 'Error: The update object title is empty.';
  if (updateObject.reviewerName === '') throw 'Error: The update object reviewer name is empty.';
  if (updateObject.review === '') throw 'Error: The update object review was empty.';
  if (updateObject.rating === '') throw 'Error: The update object rating was an empty string.';
  if (updateObject.title) {
    updateObject.title = helpers.checkString(updateObject.title, 'title');
    newReview.title = updateObject.title;
    if (updateObject.title !== oldReview.title) {
      different = true;
    }
  }
  else newReview.title = oldReview.title;
  newReview.reviewDate = new Date().toLocaleDateString('es-pa');
  if (updateObject.reviewerName) {
    updateObject.reviewerName = helpers.checkString(updateObject.reviewerName, 'reviewer name');
    newReview.reviewerName = updateObject.reviewerName;
    if (updateObject.reviewerName !== oldReview.reviewerName) {
      different = true;
    }
  }
  else newReview.reviewerName = oldReview.reviewerName;
  if (updateObject.review) {
    updateObject.review = helpers.checkString(updateObject.review, 'review');
    newReview.review = updateObject.review;
    if (updateObject.review !== oldReview.review) {
      different = true;
    }
  }
  else newReview.review = oldReview.review;
  if (updateObject.rating) {
    updateObject.rating = helpers.checkRating(updateObject.rating);
    newReview.rating = updateObject.rating;
    if (updateObject.rating !== oldReview.rating) {
      different = true;
    }
  }
  else newReview.rating = oldReview.rating;
  if (different === false) return 'The update object and object to be updated have no differences.';
  for (let i in product.reviews){
    if (product.reviews[i]._id.toString() === newReview._id.toString()) {
      product.reviews[i] = newReview;
    }
  }
  let ratings = 0;
  let counter = 0;
  for (let i in product.reviews) {
    ratings += product.reviews[i].rating;
    counter += 1;
  }
  product.averageRating = Math.round((ratings / counter) * 10) / 10;
  product._id = new ObjectId(product._id);
  const updateInfo = await productCollection.updateOne(
    {_id: new ObjectId(product._id)},
    {$set: product},
    {returnDocument: 'after'}
  );
  if (!updateInfo) throw 'Could not update the review with ID: ' + reviewId + ".";
  return productData.get(product._id.toString());
};

const removeReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId);
  const productCollection = await products();
  const product = await productCollection.findOne({'reviews._id': new ObjectId(reviewId)});
  if (!product) throw 'A review with the ID ' + reviewId + ' cannot be found.';
  let ids = []; 
  for (let i in product.reviews) {
    ids.push(product.reviews[i]._id.toString());
  }
  for (let i in ids) {
    if (ids[i] === reviewId) {
      if (i === 0) {
        product.reviews = product.reviews.slice(1);
      }
      else if (i === product.reviews.length - 1){
        product.reviews = product.reviews.slice(0, i);
      }
      else {
        let array1 = product.reviews.slice(0, i);
        let array2 = product.reviews.slice(i);
        let array3 = array2.slice(1);
        product.reviews = array1.concat(array3);
      }
    }
  }
  let ratings = 0;
  let counter = 0;
  for (let i in product.reviews) {
    ratings += product.reviews[i].rating;
    counter += 1;
  }
  if (ratings !== 0) {
    product.averageRating = Math.round((ratings / counter) * 10) / 10;
  }
  else product.averageRating = 0;
  product._id = new ObjectId(product._id);
  const updateInfo = await productCollection.updateOne(
    {_id: new ObjectId(product._id)},
    {$set: product},
    {returnDocument: 'after'}
  );
  if (!updateInfo) throw 'Could not update the review with ID: ' + reviewId + ".";
  return productData.get(product._id.toString());
};

export {createReview, getAllReviews, getReview, updateReview, removeReview}