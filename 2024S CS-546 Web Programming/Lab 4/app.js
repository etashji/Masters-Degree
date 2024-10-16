import * as products from "./data/products.js";
import * as connection from "./config/mongoConnection.js";

//Create product 1
try {
   var product1 = await products.create("Product 1", "Product 1 Description", "Product 1 Model Number", 1.99, "Product 1 Manufacturer", 
    "http://www.product1ManufacturerWebsite.com", ["Product", "1", "Keywords"], ["Product", "1", "Categories"], "01/01/2001", false); 
} catch(e) {
    console.log(e);
}

//Log product 1
try {
    console.log(await products.get(product1['_id'].toString()));
} catch(e) {
    console.log(e);
}

//Create Product 2
try {
    var product2 = await products.create("Product 2", "Product 2 Description", "Product 2 Model Number", 2.99, "Product 2 Manufacturer", 
    "http://www.product2ManufacturerWebsite.com", ["Product", "2", "Keywords"], ["Product", "2", "Categories"], "02/02/2002", false);
} catch(e) {
    console.log(e);
}

//Get all products
try{
    console.log(await products.getAll());
} catch(e) {
    console.log(e);
}

//Create product 3
try {
    var product3 = await products.create("Product 3", "Product 3 Description", "Product 3 Model Number", 3.99, "Product 3 Manufacturer", 
    "http://www.product3ManufacturerWebsite.com", ["Product", "3", "Keywords"], ["Product", "3", "Categories"], "03/03/2003", false);
} catch(e) {
    console.log(e);
}

//Log product 3
try {
    console.log(await products.get(product3['_id'].toString()));
} catch(e) {
    console.log(e);
}

//Rename product 1
try {
    await products.rename(product1['_id'].toString(), 'New Product 1');
} catch(e) {
    console.log(e);
}

//Log new product 1
try {
    console.log(await products.get(product1['_id'].toString()));
} catch(e) {
    console.log(e);
}

//Remove product 2
try {
    console.log(await products.remove(product2['_id'].toString()));
} catch(e) {
    console.log(e);
}

//Get all products
try{
    console.log(await products.getAll());
} catch(e) {
    console.log(e);
}

//Create bad product
try {
    var product1 = await products.create("Bad Product", "Bad Product Description", "Bad Product Model Number", 1.99, "Bad Product Manufacturer", 
     "http://www..com", ["Bad", "Product", "Keywords"], ["Bad", "Product", "Categories"], "01/01/2001", false); 
 } catch(e) {
     console.log(e);
 }

//Remove nonexistant product (Incredibly slight chance this may turn out to be a real product: check product ids and adjust)
try {
    console.log(await products.remove('12a3bcd4567ef8ghijk9l10m'));
} catch(e) {
    console.log(e);
}

//Rename nonexistant product (Incredibly slight chance this may turn out to be a real product: check product ids and adjust)
try {
    console.log(await products.rename('12a3bcd4567ef8ghijk9l10m', 'New Product Name'));
} catch(e) {
    console.log(e);
}

//Rename product with bad product name
try {
    console.log(await products.rename(product1['_id'].toString(), ''));
} catch(e) {
    console.log(e);
}

//Get nonexistant product (Incredibly slight chance this may turn out to be a real product: check product ids and adjust)
try {
    console.log(await products.remove('12a3bcd4567ef8ghijk9l10m'));
} catch(e) {
    console.log(e);
}

await connection.closeConnection();