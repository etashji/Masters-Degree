// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {reviewData} from '../data/index.js';
import helpers from '../helpers.js';

router
  .route('/:productId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.productId = helpers.checkId(req.params.productId);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      let reviews = await reviewData.getAllReviews(req.params.productId);
      return res.status(200).json(reviews);
    } catch(e) {
      return res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const newReviewData = req.body;
    if (!newReviewData || Object.keys(newReviewData).length === 0) {
      return res
      .status(400)
      .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.productId = helpers.checkId(req.params.productId);
      newReviewData.title = helpers.checkString(newReviewData.title, 'title');
      newReviewData.reviewerName = helpers.checkString(newReviewData.reviewerName, 'reviewer name');
      newReviewData.review = helpers.checkString(newReviewData.review, 'review');
      newReviewData.rating = helpers.checkRating(newReviewData.rating);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      const newReview = await reviewData.createReview(
        req.params.productId,
        newReviewData.title,
        newReviewData.reviewerName,
        newReviewData.review,
        newReviewData.rating
      )
      return res.status(200).json(newReview);
    } catch(e) {
      return res.status(404).json({error: e});
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.reviewId = helpers.checkId(req.params.reviewId);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      const review = await reviewData.getReview(req.params.reviewId);
      return res.json(review);
    } catch(e) {
      return res.status(404).json({error: e});
    }
  })
  .patch(async (req, res) => {
    //code for PATCH
    const requestBody = req.body;
    if (!requestBody || Object.keys(requestBody).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      req.params.reviewId = helpers.checkId(req.params.reviewId);
      if (requestBody.title === '') throw 'Error: The update object title is empty.';
      if (requestBody.reviewerName === '') throw 'Error: The update object reviewer name is empty.';
      if (requestBody.review === '') throw 'Error: The update object review was empty.';
      if (requestBody.rating === '') throw 'Error: The update object rating was an empty string.';
      if (requestBody.title) {
        requestBody.title = helpers.checkString(requestBody.title, 'title');
      }
      if (requestBody.reviewerName) {
        requestBody.reviewerName = helpers.checkString(requestBody.reviewerName, 'reviewer name')
      }
      if (requestBody.review) {
        requestBody.review = helpers.checkString(requestBody.review, 'review');
      }
      if (requestBody.rating) {
        requestBody.rating = helpers.checkRating(requestBody.rating);
      }
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      const updatedReview = await reviewData.updateReview(
        req.params.reviewId,
        requestBody
      );
      if (updatedReview === 'The update object and object to be updated have no differences.') return res.status(400).json({error: updatedReview});
      else return res.status(200).json(updatedReview);
    } catch(e) {
      return res.status(404).send({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.reviewId = helpers.checkId(req.params.reviewId);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      let deletedReview = await reviewData.removeReview(req.params.reviewId);
      return res.status(200).json(deletedReview);
    } catch(e) {
      return res.status(404).json({error: e});
    }
  });

  export default router;