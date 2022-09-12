const express         = require('express');
const router          = express.Router();
const multer          = require('multer');              // including multer files
const path            = require('path');                // adding path
const db              = require('../config/mongoose');  //including mongoose
const fileModel       = require('../model/files');      //including models

//controller
const homeController  = require('../controller/home_controller');
console.log('router loaded');

//set upoad files destination
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // rename file name
    
        let file_name = path.parse(file.originalname).name;
        let fileName = file_name+ '-' + Date.now()+".csv"
        cb(null, fileName)
            fileModel.create({ 
                name    : fileName,
            }, function(err, issue_data){
                if(err){
                    console.log('error in creating a contact');
                    return;
                }
                console.log('*******', issue_data);  
            });
    }
    
})

//upload file
var upload = multer({
    storage: storage,
})

//router 
router.route( '/upload_files' ).post( upload.single( 'avatar' ), homeController.upload); //router for upload 
router.all('/:id?', homeController.index);  //router for listing 
router.get('/destroy/:id?',homeController.deletecsv); // router  for delete

module.exports = router;