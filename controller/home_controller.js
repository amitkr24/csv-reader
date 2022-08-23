const csv             = require('csv-parser')
const fs              = require('fs')
const fileModel       = require('../model/files');
const path            = require('path');
module.exports.index  = async function(req, res){
    const results     = [];
    let id = req.params.id;  
    try{
        let files=await fileModel.find({}).sort("createdAt");// find all files name for listing
        let active_file_name= await fileModel.findById(id); // find current file name 
        console.log(active_file_name);
        if(id && active_file_name != null){
            // if id is set then only show the csv data
            var activeFile = active_file_name.name;
            let newPath =  path.join(__dirname, "../", 'uploads/'+activeFile);
             console.log(activeFile);
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
            message:'Internal Server Error'
        })
    }
}
module.exports.upload = function ( req, res ) {
    // redirect back after uploading csv
    return res.redirect('back');
}

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