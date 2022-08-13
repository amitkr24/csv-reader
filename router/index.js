const express         = require('express');
const router          = express.Router();
const multer          = require('multer');

//controller
const homeController  = require('../controller/home_controller');
console.log('router loaded');

let storage = multer.diskStorage({
    destination: './uploads/',
    filename: function ( req, file, cb ) {
        //req.body is empty...
        //How could I get the new_file_name property sent from client here?
        let fileName = file.originalname+ '-' + Date.now()+".csv";
        cb( null, fileName);
    }
});
let upload = multer( { storage: storage });
router.route( '/upload_files' ).post( upload.single( 'file' ), homeController.upload);
router.all('/', homeController.index);
module.exports = router;