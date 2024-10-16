// Set-Up Routes
import {Router} from 'express';
const router = Router();
import path from 'path';

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET to show static HTML flie
    try {
      res.sendFile(path.resolve('static/webpage.html'));
    } catch(e) {
      res.status(500).json({error: e});
    }
  });

  export default router;