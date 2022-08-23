const express         = require('express');
const router          = express.Router();
const multer          = require('multer');
const path            = require('path');
const db              = require('../config/mongoose');
const LocalStorage    = require('node-localstorage').LocalStorage,
localStorage          = new LocalStorage('./scratch');
const fileModel       = require('../model/files');
//controller
const homeController  = require('../controller/home_controller');
console.log('router loaded');


// Do Something like this

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
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
var upload = multer({
    storage: storage,
})

router.route( '/upload_files' ).post( upload.single( 'avatar' ), homeController.upload);

router.all('/:id?', homeController.index);
router.get('/destroy/:id?',homeController.deletecsv);

module.exports = router;