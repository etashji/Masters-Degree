// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {productData} from '../data/index.js';
import helpers from '../helpers.js'; 


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const productList = await productData.getAll();
      return res.json(productList);
    } catch(e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let newProductData = req.body;
    if (!newProductData || Object.keys(newProductData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try {
      newProductData.productName = helpers.checkString(newProductData.productName, 'product name');
      newProductData.productDescription = helpers.checkString(newProductData.productDescription, 'product description');
      newProductData.modelNumber = helpers.checkString(newProductData.modelNumber, 'model number');
      newProductData.price = helpers.checkPrice(newProductData.price);
      newProductData.manufacturer = helpers.checkString(newProductData.manufacturer, 'manufacturer');
      newProductData.manufacturerWebsite = helpers.checkWebsite(newProductData.manufacturerWebsite);
      newProductData.keywords = helpers.checkStringArray(newProductData.keywords, 'keywords');
      newProductData.categories = helpers.checkStringArray(newProductData.categories, 'categories');
      newProductData.dateReleased = helpers.checkDate(newProductData.dateReleased);
      newProductData.discontinued = helpers.checkBoolean(newProductData.discontinued);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      const newProduct = await productData.create(
        newProductData.productName,
        newProductData.productDescription,
        newProductData.modelNumber,
        newProductData.price,
        newProductData.manufacturer,
        newProductData.manufacturerWebsite,
        newProductData.keywords,
        newProductData.categories,
        newProductData.dateReleased,
        newProductData.discontinued
      );
      return res.status(200).json(newProduct);
    } catch(e) {
      return res.status(400).json({error: e});
    }
  });

  

router
  .route('/:productId')
  .get(async (req, res) => {
    try {
      req.params.productId = helpers.checkId(req.params.productId);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      let product = await productData.get(req.params.productId);
      return res.status(200).json(product);
    } catch(e) {
      return res.status(404).json({error: 'Product not found.'});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.productId = helpers.checkId(req.params.productId);
    } catch(e) {
      return res.status(400).json({error: e});
    }
    try {
      let deletedProduct = await productData.remove(req.params.productId);
      return res.status(200).json(deletedProduct);
    } catch(e) {
      return res.status(404).send({error: e});
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let productInfo = req.body;
    if (!productInfo || Object.keys(productInfo).length === 0) {
      return res.status(400)
      .json({error: 'There are no fields in the request body.'});
    }
    try {
      req.params.productId = helpers.checkId(req.params.productId);
      productInfo.productName = helpers.checkString(productInfo.productName, 'product name');
      productInfo.productDescription = helpers.checkString(productInfo.productDescription, 'product description');
      productInfo.modelNumber = helpers.checkString(productInfo.modelNumber, 'model number');
      productInfo.price = helpers.checkPrice(productInfo.price);
      productInfo.manufacturer = helpers.checkString(productInfo.manufacturer, 'manufacturer');
      productInfo.manufacturerWebsite = helpers.checkWebsite(productInfo.manufacturerWebsite);
      productInfo.keywords = helpers.checkStringArray(productInfo.keywords, 'keywords');
      productInfo.categories = helpers.checkStringArray(productInfo.categories, 'categories');
      productInfo.dateReleased = helpers.checkDate(productInfo.dateReleased);
      productInfo.discontinued = helpers.checkBoolean(productInfo.discontinued);
    } catch(e) {
      return res.status(400).json({error: e});
    }

    try {
      const updatedProduct = await productData.update(
        req.params.productId, 
        productInfo.productName,
        productInfo.productDescription,
        productInfo.modelNumber,
        productInfo.price,
        productInfo.manufacturer,
        productInfo.manufacturerWebsite,
        productInfo.keywords,
        productInfo.categories,
        productInfo.dateReleased,
        productInfo.discontinued
      );
      if (updatedProduct === 'New and old products are the same. Nothing is being updated.') {
        return res.status(400).json({error: 'New and old products are the same. Nothing is being updated.'});
      }
      else return res.status(200).json(updatedProduct)
    } catch(e) {
      return res.status(404).send({error: e});
    }
  });

  export default router;