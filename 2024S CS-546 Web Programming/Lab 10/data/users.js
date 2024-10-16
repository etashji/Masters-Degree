//import mongo collections, bcrypt and implement the following data functions
import * as helpers from '../helpers.js';
import bcrypt from 'bcrypt';
import {users} from '../config/mongoCollections.js';

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  firstName = helpers.checkName(firstName, "first name");
  lastName = helpers.checkName(lastName, "last name");
  emailAddress = await helpers.checkNewEmail(emailAddress);
  password = helpers.checkPassword(password);
  role = helpers.checkRole(role);
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = {
    "firstName": firstName,
    "lastName": lastName,
    "emailAddress": emailAddress,
    "password": hash,
    "role": role
  }
  const userCollection = await users();
  const newInsertInformation = await userCollection.insertOne(newUser);
  if (!newInsertInformation) throw "Insert failed!";
  let insertedUser = { insertedUser: true };
  return insertedUser;
};

export const loginUser = async (emailAddress, password) => {
  emailAddress = await helpers.checkEmail(emailAddress);
  password = helpers.checkPassword(password);
  const userCollection = await users();
  const userObject = await userCollection.findOne({emailAddress: emailAddress});
  if (!userObject) throw "Either the email address or password is invalid.";
  const email = userObject.emailAddress;
  const valid = await bcrypt.compare(password, userObject.password);
  if (!valid) throw "Either the email address or password is invalid.";
  const returnUser = {
    "firstName": userObject.firstName,
    "lastName": userObject.lastName,
    "emailAddress": userObject.emailAddress,
    "role": userObject.role
  }
  return returnUser;
};
