//import express, express router as shown in lecture code
import {Router} from 'express';
const router = Router();
import { registerUser, loginUser } from '../data/users.js';
import * as helpers from '../helpers.js';

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  try {
    if (!req.session.user) return res.redirect('/login');
    else if (req.session.user.role === "admin") return res.redirect("/admin");
    else if (req.session.user.role === "user") return res.redirect('/protected');
    else return res.json({error: 'YOU SHOULD NOT BE HERE!'});
  } catch(e) {
    res.status(500).render("error", {error: "500: Cannot render a page."});
  }
});

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    try {
      if (!req.session.user) res.render("register");
      else if (req.session.user.role === "admin") res.redirect("/admin");
      else if (req.session.user.role === "user") res.redirect("/protected");
      else throw "Cannot render the register page.";
    } catch(e) {
      res.status(500).render("error", {error: "500: " + e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let newUserData = req.body;
    if (!newUserData || Object.keys(newUserData).length === 0) {
        res.status(400).render('error', {error: "400: There are no fields in the request body."});
    }
    try {
      newUserData.firstNameInput = helpers.checkName(newUserData.firstNameInput, "first name");
      newUserData.lastNameInput = helpers.checkName(newUserData.lastNameInput, "last name");
      newUserData.emailAddressInput = await helpers.checkNewEmail(newUserData.emailAddressInput);
      newUserData.passwordInput = helpers.checkPassword(newUserData.passwordInput);
      newUserData.roleInput = helpers.checkRole(newUserData.roleInput);
    } catch(e) {
      res.status(400).render('register', {error: "400: " + e});
    }
    try {
      const newUser = await registerUser(
        newUserData.firstNameInput,
        newUserData.lastNameInput,
        newUserData.emailAddressInput,
        newUserData.passwordInput,
        newUserData.roleInput
      );
      if (newUser.insertedUser) {
        res.status(200).redirect('/login');
      }
    } catch(e) {
      res.status(500).render('error', {error: "500: Internal Server Error"});
    };
  });

router
  .route('/login')
  .get(async (req, res) => {
    //code here for GET
    try {
      if (!req.session.user) res.render("login");
      else if (req.session.user.role === "admin") res.redirect("/admin");
      else if (req.session.user.role === "user") res.redirect("/protected");
      else throw "Cannot render the login page.";
    } catch(e) {
      res.status(500).json("error", {error: "500: " + e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let newUserData = req.body;
    if (!newUserData || Object.keys(newUserData).length === 0) {
      res.status(400).render("error", {error: "400: There are no fields in the request body."});
    }
    try {
      newUserData.emailAddressInput = helpers.checkEmail(newUserData.emailAddressInput);
      newUserData.passwordInput = helpers.checkPassword(newUserData.passwordInput);
    } catch(e) {
      res.status(400).render('login', {error: "400: " + e})
    }
    try {
      const loggedUser = await loginUser(
        newUserData.emailAddressInput,
        newUserData.passwordInput
      )
      if (loggedUser) req.session.user = loggedUser;
      if (req.session.user.role === "admin") {
        res.status(200).redirect('/admin');
      }
      else if (req.session.user.role === "user") {
        res.status(200).redirect('/protected');
      }
      else {
        res.status(400).render("error", {error: "400: The user role was incorrect."})
      }
    } catch(e) {
      res.status(400).render('login', {error: "400: " + e});
    }
  });

router.route('/protected').get(async (req, res) => {
  //code here for GET
  try {
    if (!req.session.user) res.redirect("/login");
    else if (req.session.user.role === "admin" || req.session.user.role === "user") {
      let time = new Date().toTimeString();
      let admin = false;
      if (req.session.user.role === "admin") admin = true;
      res.render("protected", {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        currentTime: time,
        role: req.session.user.role,
        valid: admin
      });
    }
    else throw "Cannot render the protected page.";
  } catch(e) {
    res.status(500).render("error", {error: "500: " + e});
  }
});

router.route('/admin').get(async (req, res) => {
  try {
    if (!req.session.user) res.redirect("/login");
    else if (req.session.user.role === "admin")  {
      let time = new Date().toTimeString();
      res.render("admin", {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        currentTime: time
      });
    }
    else res.redirect("/error");
  } catch(e) {
    return res.status(500).render("error", {error: "500: Cannot show the admin page."});
  }
});

router.route('/error').get(async (req, res) => {
  //code here for GET
  try {
    return res.status(403).render('error', {error: "403: Unauthorized access."})
  } catch(e) {
    return res.status(500).json({error: "500: Cannot show the error page."});
  }
});

router.route('/logout').get(async (req, res) => {
  //code here for GET
  try {
    if (req.session.user) {
      req.session.destroy();
      res.render("logout");
    }
    else {
      res.redirect("/login");
    }
  } catch(e) {
    return res.status(500).render("error", {error: "500: Cannot logout."});
  }
});

export default router;
