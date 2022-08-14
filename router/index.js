const express         = require('express');
const router          = express.Router();
const multer          = require('multer');
const path            = require('path');
const LocalStorage    = require('node-localstorage').LocalStorage,
localStorage          = new LocalStorage('./scratch');
//controller
const homeController  = require('../controller/home_controller');
console.log('router loaded');
localStorage.setItem('CsvFiles', '');
const myfiles = [];

let storage = multer.diskStorage({
    destination: './uploads/',
    filename: function ( req, file, cb ) {
        // remove extension from file name
        let file_name = path.parse(file.originalname).name;

        //create new name of file
        let fileName = file_name+ '-' + Date.now()+".csv";
        cb( null, fileName);
        myfiles.push(fileName);
        localStorage.setItem('CsvFiles', myfiles);
    }
});
let upload = multer( { storage: storage });
router.route( '/upload_files' ).post( upload.single( 'file' ), homeController.upload);
router.all('/:id?', homeController.index);



module.exports = router;