const csv             = require('csv-parser') // added csv parser package
const fs              = require('fs') // added fs package
const fileModel       = require('../model/files'); // added model
const path            = require('path'); //added path
module.exports.index  = async function(req, res){
    const results     = [];
    let id = req.params.id;  
    try{
        let files=await fileModel.find({}).sort("createdAt");// find all files name for listing
        let active_file_name= await fileModel.findById(id); // find current file name
        // 
        if(id && active_file_name != null){
            // if id is set then only show the csv data
            var activeFile = active_file_name.name;
            let newPath =  path.join(__dirname, "../", 'uploads/'+activeFile);
        }else{
            // if id is not presence simply return blank array
            let response =  {
                "page": {},
                "pageCount": {},
                "results": [{}]
            };
            res.render('../view/index',{result:response,fileData:files,current:''});
            return;
        }

        // read csv data
        fs.createReadStream('./uploads/'+activeFile).pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {

            // pass data as per pagination limit
            const pageCount = Math.ceil(results.length / 50);
            let page = parseInt(req.query.p);
            // console.log(page);
            if (!page) { page = 1;}
            if (page > pageCount) {
                page = pageCount
            }
            // created array as per requirement
            let response =  {
                "page": page,
                "pageCount": pageCount,
                "results": results.slice(page * 50 - 50, page * 50)
            };
            res.render('../view/index',{result:response,fileData:files,current:id})
        });
    }
    catch(err){
        // if any error occur return message
        return res.status(500).json({
            message:'Internal Server Error foundd'
        })
    }
}
module.exports.upload = function ( req, res ) {
    // redirect back after uploading csv
    return res.redirect('/');
}

// delete file
module.exports.deletecsv = function(req,res){
    // to delete csv
    let tid = req.params.id;
    fileModel.findByIdAndDelete(tid, function(err){
        if(err){
            console.log('error in deleting in object from database');
            return;
        }
    });
    return res.redirect('/');
 }